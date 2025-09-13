import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  standard: { type: String, required: true },
  division: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completedBy: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      studentName: String,
      completedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Assignment", assignmentSchema);
