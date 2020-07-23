import express, { Request, Response } from "express";
import Peep from "../model/Peep";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  console.log("in peeps");
  if (req.session) {
    console.log("session");
    console.log(req.session.test);
  }

  if (req.cookies) {
    console.log("cookies");
    console.log(req.cookies);
  }

  res.send(await Peep.all());
});

router.post("/", async (req: Request, res: Response) => {
  await Peep.create(req.body.text);
  res.status(200);
  res.end();
});

export default router;
