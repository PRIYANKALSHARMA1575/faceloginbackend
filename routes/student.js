import express from "express";
import Student from "../models/Student.js";
import { euclideanDistance } from "../utils/faceUtils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, officialName, age, loginMethod, password, descriptor } = req.body;

    const newStudent = new Student({
      username,
      officialName,
      age,
      loginMethod,
      password,
      descriptor,
    });

    await newStudent.save();
    res.json({ message: "Student registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering student" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, loginMethod, password, descriptor } = req.body;

    const student = await Student.findOne({ username });

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    if (loginMethod === "text") {
      if (student.password === password) {
        return res.json({ message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    }

    if (loginMethod === "face") {
      if (!student.descriptor) {
        return res.status(400).json({ message: "No face data found, please register with face" });
      }

      const distance = euclideanDistance(descriptor, student.descriptor);

      if (distance < 0.4) {
        return res.json({ message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Face does not match" });
      }
    }

    return res.status(400).json({ message: "Invalid login method" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
