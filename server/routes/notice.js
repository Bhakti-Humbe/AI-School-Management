import express from "express";
import Notice from "../models/Notice.js";

const router = express.Router();

// ✅ Teacher: Create a notice
router.post("/create", async (req, res) => {
  const { title, description, standard, division } = req.body;

  if (!title || !description || !standard || !division) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const notice = new Notice({ title, description, standard, division });
    await notice.save();
    res.status(201).json({ message: "Notice created successfully", notice });
  } catch (error) {
    console.error("Create Notice Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Student: Get notices by class/div
router.get("/student/:standard/:division", async (req, res) => {
  const { standard, division } = req.params;

  try {
    const notices = await Notice.find({ standard, division }).sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    console.error("Fetch Notices Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ (Optional) Teacher: Get all notices
router.get("/all", async (_req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    console.error("Fetch All Notices Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
