import { Router } from "express";
import { useGraph } from "../controllers/user.controllers.js";

const router = Router();

router.post("/useGraph", useGraph);

export default router;