import express, { Request, Response } from "express";
import PGConnection from "../model/PGConnection";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const userData = await PGConnection.query(
    `SELECT * FROM Users WHERE username='${req.body.username}';`
  );

  if (
    userData.rowCount === 0 ||
    userData.rows[0].password !== req.body.password
  ) {
    res.status(422).send({ error: "Incorrect login details" });
  } else {
    res
      .status(200)
      .send({ id: userData.rows[0].id, username: userData.rows[0].username });
  }
});

export default router;
