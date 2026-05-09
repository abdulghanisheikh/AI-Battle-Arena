import express from "express";
import graphRouter from "./routes/graph.routes.js";
import cors from "cors";
import appConfig from "./configs/config.js";

const app = express();

app.use(cors({
    origin: appConfig.FRONTEND,
    credentials: true
}));
app.use(express.json());
app.use("/useGraph", graphRouter);

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" });
});

export default app;