import { Router } from "express";
import {useGraph} from "../controllers/graph.controllers.js";

const router = Router();

router.post("/", useGraph);

export default router;