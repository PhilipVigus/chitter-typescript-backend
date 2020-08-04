import express from "express";
import CommentsController from "../controllers/CommentsController";

const router = express.Router();
router.post("/:peepId/comments/", CommentsController.createComment);

export default router;
