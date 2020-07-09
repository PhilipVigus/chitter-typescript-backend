import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    peeps: [
      { text: "First peep", timeCreated: 1594030856065 },
      { text: "Second peep", timeCreated: 1494030856065 }
    ]
  });
});

router.post("/", (req, res) => {
  res.status(200);
  res.end();
});

export default router;
