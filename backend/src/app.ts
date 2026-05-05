import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());

app.use("/", userRouter);

// health check
app.get("/health", (req, res) => {
    res.status(200).json({success: true});
});

export default app;