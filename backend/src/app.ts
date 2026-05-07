import express from "express";
import graphRouter from "./routes/graph.routes.js";

const app = express();

app.use(express.json());
app.use("/useGraph", graphRouter);

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" });
});

export default app;