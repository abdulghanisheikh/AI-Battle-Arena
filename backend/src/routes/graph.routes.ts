import { Router } from "express";
import {invokeGraph} from "../controllers/graph.controllers.js";

const router = Router();

router.post("/", invokeGraph);

export default router;