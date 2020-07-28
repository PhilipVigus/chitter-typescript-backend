import express, { Request, Response, request } from "express";
import Peep from "../model/Peep";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send(await Peep.all());
});

router.post("/", async (req: Request, res: Response) => {
  await Peep.create(req.body.userId, req.body.text);
  res.status(200);
  res.end();
});

export default router;
