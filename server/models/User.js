import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["student", "teacher"], required: true },
  name: { type: String, required: true },
  surname: String,
  std: String,    // student only
  div: String,    // student only
  rollno: String, // student only
  address: { type: String, required: true },
  designation: String, // teacher only
  phone: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
