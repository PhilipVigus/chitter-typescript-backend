import express from "express";
import cors from "cors";
import helmet from "helmet";
import PGConnection from "./model/PGConnection";
import peepsRoute from "./routes/peepsRoute";
import usersRoute from "./routes/usersRoute";
import sessionsRoute from "./routes/sessionsRoute";

PGConnection.open();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: 5 });
});

app.use("/peeps", peepsRoute);
app.use("/users", usersRoute);
app.use("/sessions", sessionsRoute);

export default app;
