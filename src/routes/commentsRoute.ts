import express, { Request, Response } from "express";

const router = express.Router();

router.get("/:peepId/comments/", async (req: Request, res: Response) => {
  res.status(200).send();
});

export default router;
