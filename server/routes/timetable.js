import express from "express";
import Timetable from "../models/Timetable.js";

const router = express.Router();

// Get timetable by standard & division
router.get("/:standard/:division", async (req, res) => {
  const { standard, division } = req.params;
  try {
    const timetable = await Timetable.findOne({ standard, division });
    if (!timetable)
      return res.status(404).json({ message: "Timetable not found" });
    res.json(timetable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Save timetable (POST route) – Only allow once
router.post("/", async (req, res) => {
  const { standard, division, timetable } = req.body;

  if (!standard || !division || !timetable)
    return res.status(400).json({ message: "All fields required" });

  try {
    const existing = await Timetable.findOne({ standard, division });
    if (existing) {
      // Do not update, just return an error
      return res
        .status(400)
        .json({ message: "Timetable already exists for this class/division" });
    }

    const newTimetable = new Timetable({ standard, division, timetable });
    await newTimetable.save();
    res
      .status(201)
      .json({ message: "Timetable created successfully", timetable: newTimetable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
