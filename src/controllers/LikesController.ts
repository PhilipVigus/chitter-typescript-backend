import { Request, Response } from "express";
import Like from "../model/Like";

class LikesController {
  public static async createLike(req: Request, res: Response): Promise<void> {
    await Like.create(req.body.userId, parseInt(req.params.peepId, 10));
    res.status(200).send();
  }

  public static async deleteLike(req: Request, res: Response): Promise<void> {
    await Like.delete(
      parseInt(req.params.userId, 10),
      parseInt(req.params.peepId, 10)
    );
    res.status(200).send();
  }
}

export default LikesController;
