import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
  res.json({ test: 5 }).send();
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
