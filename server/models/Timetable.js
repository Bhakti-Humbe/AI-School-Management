import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  standard: { type: String, required: true },
  division: { type: String, required: true },
  timetable: [
    {
      day: String,
      slots: [
        {
          time: String,
          subject: String,
        }
      ]
    }
  ],
}, { timestamps: true });

export default mongoose.model("Timetable", timetableSchema);
