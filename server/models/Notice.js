import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  standard: { type: String, required: true },
  division: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notice", noticeSchema);
