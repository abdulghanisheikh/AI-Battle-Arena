import appConfig from "../configs/config.js";
import {ChatGoogle} from "@langchain/google";
import {ChatMistralAI} from "@langchain/mistralai";
import {ChatCohere} from "@langchain/cohere";

export const geminiModel = new ChatGoogle({
    model: 'gemini-flash-2.5-lite',
    apiKey: appConfig.GEMINI_API_KEY
});

export const mistralModel = new ChatMistralAI({
    model: 'mistral-medium-latest',
    apiKey: appConfig.MISTRAL_API_KEY
});

export const cohereModel = new ChatCohere({
    model: ''
})