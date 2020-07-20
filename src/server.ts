import express from "express";
import cors from "cors";
import PGConnection from "./model/PGConnection";
import peepsRoute from "./routes/peeps";

PGConnection.open();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: 5 });
});

app.use("/peeps", peepsRoute);

export default app;
