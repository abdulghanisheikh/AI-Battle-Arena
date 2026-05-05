import { HumanMessage } from "@langchain/core/messages";
import { MessagesValue, StateGraph, START, StateSchema, END, ReducedValue } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import {z} from "zod";
import { geminiModel, mistralModel, cohereModel } from "./ai_models.service.js";

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
    const userMessage = state.messages[ state.messages.length-1 ];

    const [mistralSolution, cohereSolution] = await Promise.all([
        mistralModel.invoke(userMessage),
        cohereModel.invoke(userMessage)
    ]);

    return {
        solution_1: mistralSolution,
        solution_2: cohereSolution
    };
}

const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addEdge(START, "solution")
    .addEdge("solution", END)
    .compile();

export default graph;