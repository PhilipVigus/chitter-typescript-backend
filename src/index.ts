import express from "express";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.json({ test: 5 }).send();
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
