import { Router } from "express";
import { db } from "../db.js";
const router = Router();
router.post("/register", (req, res) => {
  try {
    const { name, email, password, role, college, branch, targetExam } =
      req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required." });
    }
    const existing = db.findUserByEmail(email);
    if (existing) {
      return res
        .status(400)
        .json({ error: "An account with this email already exists." });
    }
    const user = db.createUser({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "student",
      college,
      branch,
      targetExam,
    });
    const token = `token_${user.id}_${Date.now()}`;
    const { passwordHash, ...safeUser } = user;
    return res.status(201).json({
      message: "Registration successful",
      user: safeUser,
      token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Registration failed." });
  }
});
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }
    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    if (user.passwordHash !== password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = `token_${user.id}_${Date.now()}`;
    const { passwordHash, ...safeUser } = user;
    return res.json({
      message: "Login successful",
      user: safeUser,
      token,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Login failed." });
  }
});
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const token = authHeader.replace("Bearer ", "");
  const parts = token.split("_");
  const userId = parts[1];
  const user = userId ? db.findUserById(userId) : db.users[1];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { passwordHash, ...safeUser } = user;
  return res.json({ user: safeUser });
});
router.put("/profile", (req, res) => {
  try {
    const { userId, name, college, branch, targetExam, avatar } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (college !== undefined) updateData.college = college;
    if (branch !== undefined) updateData.branch = branch;
    if (targetExam !== undefined) updateData.targetExam = targetExam;
    if (avatar !== undefined) updateData.avatar = avatar;

    const updated = db.updateUser(userId, updateData);
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }
    const { passwordHash, ...safeUser } = updated;
    return res.json({
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
export default router;
