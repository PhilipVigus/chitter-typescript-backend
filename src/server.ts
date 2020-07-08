import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: 5 });
  res.end();
});

export default app;
