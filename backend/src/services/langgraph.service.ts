import { StateGraph, StateSchema, type GraphNode, START, END  } from "@langchain/langgraph";
import { mistralModel, cohereModel, geminiModel } from "./ai_models.service.js";
import {z} from "zod";
import { createAgent, HumanMessage, providerStrategy } from "langchain";

const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judgement: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default("")
    })
});

const solutionNode: GraphNode<typeof state> = async(state) => {
    const [mistralSolution, cohereSolution] = await Promise.all([
        mistralModel.invoke([new HumanMessage(state.problem)]),
        cohereModel.invoke([new HumanMessage(state.problem)])
    ]);

    return {
        solution_1: mistralSolution.content,
        solution_2: cohereSolution.content
    }
}

const judgeNode: GraphNode<typeof state> = async(state) => {
    const {problem, solution_1, solution_2} = state;

    const JUDGE_SYSTEM_PROMPT = `You are a strict and unbiased AI response evaluator with deep expertise in assessing the quality of AI-generated responses.

    Your job is to evaluate two different AI-generated solutions to a given problem and score them across three dimensions.

    SCORING CRITERIA (each scored 0 to 10):

    1. CLARITY (0-10)
    - Is the response easy to read and understand?
    - Is it well structured and logically organized?
    - Does it avoid unnecessary jargon or confusion?

    2. ACCURACY (0-10)
    - Is the information factually correct?
    - Does the solution actually solve the problem correctly?
    - Are there any errors, bugs, or misleading statements?

    3. COMPLETENESS (0-10)
    - Does the response fully address the problem?
    - Are edge cases or important details covered?
    - Does it leave any part of the question unanswered?

    SCORING RULES:
    - 0  to 3  → Poor      — major issues, incorrect or very incomplete
    - 4  to 6  → Average   — partially correct but missing key parts
    - 7  to 8  → Good      — solid response with minor gaps
    - 9  to 10 → Excellent — complete, accurate and very clear

    IMPORTANT RULES:
    - Be completely unbiased — do not favour any solution based on length or style
    - Base scoring purely on quality, correctness and completeness
    - Keep reasoning concise — 2 to 3 sentences per criterion per solution`;

    const agent = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_reasoning: z.string(),
            solution_2_reasoning: z.string()
        })),
        systemPrompt: JUDGE_SYSTEM_PROMPT
    });

    const judgeResponse = await agent.invoke({
        messages: [new HumanMessage(
            `Problem: ${problem},
            solution 1: ${solution_1},
            solution 2: ${solution_2}
            Please evaluate the solutions and provide scores and reasoning.`
        )]
    });

    return {
        judgement: judgeResponse.structuredResponse
    }
}

const graph = new StateGraph(state)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile();

export default graph;