import {config} from "dotenv";
config();

type CONFIG = {
    readonly GEMINI_API_KEY: string,
    readonly MISTRAL_API_KEY: string,
    readonly COHERE_API_KEY: string,
    readonly PORT: string,
    readonly FRONTEND_URL: string,
    readonly NODE_ENV: string
}

const appConfig: CONFIG = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    PORT: process.env.PORT || "",
    FRONTEND_URL: process.env.FRONTEND_URL || "",
    NODE_ENV: process.env.NODE_ENV || ""
}

export default appConfig;