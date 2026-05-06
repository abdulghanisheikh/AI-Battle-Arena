import { HumanMessage } from "@langchain/core/messages";
import { MessagesValue, StateGraph, START, StateSchema, END, ReducedValue } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import {z} from "zod";
import { geminiModel, mistralModel, cohereModel } from "./ai_models.service.js";
import { createAgent, providerStrategy } from "langchain";

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        } 
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        }
    }),
    judge_recommendation: new ReducedValue(z.object({
        solution_1_score: z.number(),
        solution_2_score: z.number()
    }).default({
        solution_1_score: 0,
        solution_2_score: 0
    }), {
        reducer: (current, next) => {
            return next;
        }
    })
});

const solutionNode: GraphNode<typeof State> = async(state: typeof State) => {
    const userMessage = state.messages[ state.messages.length - 1 ];

    const [mistralSolution, cohereSolution] = await Promise.all([
        mistralModel.invoke([new HumanMessage(userMessage.content)]),
        cohereModel.invoke([new HumanMessage(userMessage.content)])
    ]);
    
    return {
        solution_1: mistralSolution,
        solution_2: cohereSolution.content
    };
}

const judgeNode: GraphNode<typeof State> = async(state: typeof State) => {
    const {solution_1, solution_2} = state;
    
    const userMessage = state.messages[ state.messages.length - 1 ].content;

    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10)
        }))
    });

    const judgeResponse = await judge.invoke({
        messages: [new HumanMessage(
            `You are an expert AI response evaluator. Your task is to evaluate two different AI-generated solutions to a given problem.

            You will be given:
            Problem statement: ${userMessage}
            solution from model 1: ${solution_1}
            solution from model 2: ${solution_2}

            Give score on the scale of 0 to 10 to each solution based on:
            - Accuracy
            - Clarity

            Important rules:
            - Be completely unbiased
            - Base scoring purely on quality and correctness`
        )]
    });

    return { judge_recommendation: judgeResponse.structuredResponse };
}

const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addEdge(START, "solution")
    .addNode("judgement", judgeNode)
    .addEdge("solution", "judgement")
    .addEdge("judgement", END)
    .compile();

export default graph;