import express from "express";
import PeepsController from "../controllers/PeepsController";

const router = express.Router();
router.get("/", PeepsController.getPeeps);
router.post("/", PeepsController.createPeep);

export default router;
