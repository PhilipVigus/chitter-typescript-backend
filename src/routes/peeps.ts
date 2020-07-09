import express from "express";
import Peep from "../model/Peep";

const router = express.Router();
router.get("/", async (req, res) => {
  res.json(await Peep.all());
});

router.post("/", async (req, res) => {
  await Peep.create(req.body.text);
  res.status(200);
  res.end();
});

export default router;
