import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: 5 });
});

app.get("/peeps", (req, res) => {
  res.json({
    peeps: [
      { text: "First peep", timeCreated: 1594030856065 },
      { text: "Second peep", timeCreated: 1494030856065 }
    ]
  });
});

app.post("/peeps", (req, res) => {
  res.status(200);
  res.end();
});

export default app;
