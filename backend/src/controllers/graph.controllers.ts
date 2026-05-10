import graph from "../services/langgraph.service.js";
import {type Request, type Response} from "express";

export const useGraph = async(req: Request, res: Response) => {
    const userMessage = req.body.userMessage;

    try {
        const result = await graph.invoke({ problem: userMessage });
        
        res.status(200).json({ 
            success: true,
            message: "responses generated",
            result
        });
    } catch(err: any) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            error: err.message
        });
    }
}