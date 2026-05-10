import express, {type Application, type Request, type Response} from "express";
import graphRouter from "./routes/graph.routes.js";
import cors from "cors";
import path from "path";
import appConfig from "./configs/config.js";
import { fileURLToPath } from "url";

const app: Application = express();

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
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

app.get("*splat", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

export default app;