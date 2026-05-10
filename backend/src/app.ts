import express, {type Application, type Request, type Response} from "express";
import graphRouter from "./routes/graph.routes.js";
import cors from "cors";
import path from "path";
import appConfig from "./configs/config.js";
import { fileURLToPath } from "url";

const app: Application = express();

app.use(cors({
    origin: appConfig.NODE_ENV === 'development' ? true: appConfig.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// all routes
app.get("/health", (req: Request, res: Response) => { // health check
    res.status(200).json({ status: "ok" });
});
app.use("/useGraph", graphRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get("*splat", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

export default app;