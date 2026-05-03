import dotenv from "dotenv";
dotenv.config();

type CONFIG = {
    readonly GEMINI_API_KEY: string,
    readonly MISTRAL_API_KEY: string,
    readonly COHERE_API_KEY: string,
    readonly PORT: string
}

const config: CONFIG = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    PORT: process.env.PORT || "3000"
}

export default config;