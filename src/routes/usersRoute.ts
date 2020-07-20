import express, { Request, Response } from "express";
import User from "../model/User";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const user = await User.create(req.body.username, req.body.password);
  if (user) {
    res.status(200).send({ id: user?.id, username: user?.username });
  } else {
    res.status(422).send({ error: "Username already taken" });
  }
});

export default router;
