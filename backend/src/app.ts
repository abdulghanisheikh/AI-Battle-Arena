import express from "express";
import graphRouter from "./routes/graph.routes.js";
import cors from "cors";
import path, { dirname } from "path";
import appConfig from "./configs/config.js";
import { fileURLToPath } from "url";

const app = express();

app.use(cors({
    origin: appConfig.FRONTEND,
    credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use("/useGraph", graphRouter);

// health check
app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.get("*splat", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

export default app;