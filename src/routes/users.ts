import express, { Request, Response } from "express";
import User from "../model/User";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const user = await User.create(req.body.username, req.body.password);
  res.status(200).send({ id: user.id, username: user.username });
});

export default router;
