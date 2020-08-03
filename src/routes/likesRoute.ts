import express from "express";
import LikesController from "../controllers/LikesController";

const router = express.Router();
router.post("/:peepId/likes/", LikesController.createLike);
router.delete("/:peepId/likes/:userId", LikesController.deleteLike);

export default router;
