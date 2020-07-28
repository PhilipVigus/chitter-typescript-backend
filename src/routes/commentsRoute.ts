import express, { Request, Response } from "express";
import Comment from "../model/Comment";

const router = express.Router();

router.post("/:peepId/comments/", async (req: Request, res: Response) => {
  await Comment.create(req.body.userId, req.body.peepId, req.body.text);
  res.status(200).send();
});

export default router;
