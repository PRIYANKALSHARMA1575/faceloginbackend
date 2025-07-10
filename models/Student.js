import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  officialName: { type: String, required: true },
  age: { type: Number, required: true },
  loginMethod: { type: String, enum: ["face", "text"], required: true },
  password: { type: String }, // Only required if loginMethod === "text"
  descriptor: { type: [Number] }, 
  preferredLanguage: { type: String, default: "en" },
voiceNavigation: { type: Boolean, default: false },
profilePicture: { type: String }, // optional
interests: [String], // optional
learningGoals: { type: String }, // Face descriptor array
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
