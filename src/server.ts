import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import peepsRoute from "./routes/peeps";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: 5 });
});

app.use("/peeps", peepsRoute);

export default app;
