import express from "express";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// Teacher creates assignment
router.post("/create", async (req, res) => {
  const { standard, division, title, description, dueDate } = req.body;
  if (!standard || !division || !title || !description || !dueDate)
    return res.status(400).json({ message: "All fields required" });

  try {
    const assignment = new Assignment({
      standard,
      division,
      title,
      description,
      dueDate
    });
    await assignment.save();
    res.status(201).json({ message: "Assignment created", assignment });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Students fetch assignments of their class/div
router.get("/student/:standard/:division", async (req, res) => {
  const { standard, division } = req.params;
  try {
    const assignments = await Assignment.find({ standard, division })
      .sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Student marks assignment complete
router.post("/complete/:id", async (req, res) => {
  const { studentId, studentName } = req.body;
  if (!studentId || !studentName)
    return res.status(400).json({ message: "Student details required" });

  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Not found" });

    // Prevent duplicates
    if (!assignment.completedBy.some(c => c.studentId.toString() === studentId)) {
      assignment.completedBy.push({ studentId, studentName });
      await assignment.save();
    }
    res.json({ message: "Marked complete", assignment });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Teacher gets list of students who completed
router.get("/completed/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Not found" });
    res.json(assignment.completedBy);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
