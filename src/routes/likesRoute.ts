import express, { Request, Response } from "express";
import Like from "../model/Like";

const router = express.Router();

router.post("/:peepId/likes/", async (req: Request, res: Response) => {
  await Like.create(req.body.userId, parseInt(req.params.peepId, 10));
  res.status(200).send();
});

router.delete("/:peepId/likes/:userId", async (req: Request, res: Response) => {
  await Like.delete(
    parseInt(req.params.userId, 10),
    parseInt(req.params.peepId, 10)
  );
  res.status(200).send();
});

export default router;
