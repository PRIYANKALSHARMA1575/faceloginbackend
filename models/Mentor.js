import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  officialName: { type: String, required: true },
  age: { type: Number, required: true },
  subjects: [{ type: String }],
  loginMethod: { type: String, enum: ["face", "text"], required: true },
  password: { type: String },
  descriptor: { type: [Number] }, 
});

const Mentor = mongoose.model("Mentor", mentorSchema);
export default Mentor;
