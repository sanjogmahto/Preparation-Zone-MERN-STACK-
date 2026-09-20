import { Router } from "express";
import { db } from "../db.js";
const router = Router();
router.get("/", (req, res) => {
  const subjects = db.getSubjects();
  return res.json({ subjects });
});
router.get("/:id", (req, res) => {
  const subject = db.getSubjectById(req.params.id);
  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  }
  return res.json({ subject });
});
router.post("/", (req, res) => {
  try {
    const { name, code, category, description, icon, color } = req.body;
    if (!name || !code) {
      return res
        .status(400)
        .json({ error: "Name and Subject Code are required" });
    }
    const newSubject = db.createSubject({
      name,
      code,
      category: category || "Core CS",
      description: description || "",
      icon: icon || "BookOpen",
      color: color || "indigo",
      isActive: true,
    });
    return res
      .status(201)
      .json({ message: "Subject created successfully", subject: newSubject });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.put("/:id", (req, res) => {
  try {
    const updated = db.updateSubject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Subject not found" });
    }
    return res.json({
      message: "Subject updated successfully",
      subject: updated,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", (req, res) => {
  try {
    const success = db.deleteSubject(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Subject not found" });
    }
    return res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
export default router;
