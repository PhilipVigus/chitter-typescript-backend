import express, { Request, Response } from "express";
import PGConnection from "../model/PGConnection";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const userData = await PGConnection.query(
    `SELECT * FROM Users WHERE username='${req.body.username}';`
  );

  if (userData.rowCount === 0) {
    res.status(200).send({ error: "error" });
  } else {
    res.status(200).send({ id: 1, username: "bob" });
  }
});

export default router;
