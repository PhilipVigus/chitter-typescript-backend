import express, { Request, Response } from "express";

const router = express.Router();

router.post("/:peepId/comments/", async (req: Request, res: Response) => {
  res.status(200).send();
});

export default router;
