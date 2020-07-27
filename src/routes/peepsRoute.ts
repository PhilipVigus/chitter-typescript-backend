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

router.get("/:id", async (req: Request, res: Response) => {
  const peep = await Peep.findById(parseInt(req.params.id, 10));
  if (peep) {
    res.status(200).send(peep);
  } else {
    res.status(422).send({ error: "Peep not found" });
  }
});

export default router;
