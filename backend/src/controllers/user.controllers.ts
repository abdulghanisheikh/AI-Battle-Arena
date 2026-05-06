import graph from "../services/graph.ai.service.js";
import { HumanMessage } from "@langchain/core/messages";

export const useGraph = async(req: any, res: any) => {
    const userMessage = req.body.userMessage;

    const result = await graph.invoke({
        messages: [new HumanMessage(userMessage)]
    });

    return res.send(result);
}