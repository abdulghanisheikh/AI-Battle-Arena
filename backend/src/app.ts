import express from "express";

const app = express();

// health check
app.get("/health", (req, res) => {
    res.status(200).json({success: true});
});

export default app;