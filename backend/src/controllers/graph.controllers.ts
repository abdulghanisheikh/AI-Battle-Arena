import graph from "../services/langgraph.service.js";

export const useGraph = async(req: any, res: any) => {
    const userMessage = req.body.userMessage;

    const result = await graph.invoke({
        problem: userMessage
    });

    res.send(result);
}