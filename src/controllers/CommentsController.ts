import { Request, Response } from "express";
import Comment from "../model/Comment";

class CommentsController {
  public static async createComment(
    req: Request,
    res: Response
  ): Promise<void> {
    await Comment.create(req.body.userId, req.body.peepId, req.body.text);
    res.status(200).send();
  }
}

export default CommentsController;
