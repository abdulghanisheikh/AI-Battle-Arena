import { MistralAI } from "@langchain/mistralai";
import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import appConfig from "../configs/config.js";

export const mistralModel = new MistralAI({
    model: "mistral-medium-latest",
    apiKey: appConfig.MISTRAL_API_KEY
});

export const geminiModel = new ChatGoogle({
    model: "gemini-flash-latest",
    apiKey: appConfig.GEMINI_API_KEY
});

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: appConfig.COHERE_API_KEY
});