import express from "express";
import Mentor from "../models/Mentor.js";
import { euclideanDistance } from "../utils/faceUtils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, officialName, age, subjects, loginMethod, password, descriptor } = req.body;

    const existingMentor = await Mentor.findOne({ username });
    if (existingMentor) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newMentor = new Mentor({
      username,
      officialName,
      age,
      subjects,
      loginMethod,
      password,
      descriptor,
    });

    await newMentor.save();
    res.json({ message: "Mentor registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering mentor" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, loginMethod, password, descriptor } = req.body;

    const mentor = await Mentor.findOne({ username });

    if (!mentor) {
      return res.status(404).json({ message: "User not found" });
    }

    if (loginMethod === "text") {
      if (mentor.password === password) {
        return res.json({ message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    }

    if (loginMethod === "face") {
      if (!mentor.descriptor) {
        return res.status(400).json({ message: "No face data found, please register with face" });
      }

      const distance = euclideanDistance(descriptor, mentor.descriptor);

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
