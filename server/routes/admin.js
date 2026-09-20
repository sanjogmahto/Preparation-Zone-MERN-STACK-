import { Router } from "express";
import { db } from "../db.js";
const router = Router();
router.get("/stats", (req, res) => {
  const stats = db.getAdminStats();
  return res.json({ stats });
});
router.get("/users", (req, res) => {
  const safeUsers = db.users.map(({ passwordHash, ...safe }) => safe);
  return res.json({ users: safeUsers });
});
router.patch("/users/:id/role", (req, res) => {
  try {
    const { role } = req.body;
    if (role !== "student" && role !== "admin") {
      return res
        .status(400)
        .json({ error: 'Valid role is "student" or "admin"' });
    }
    const updated = db.updateUser(req.params.id, { role });
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }
    const { passwordHash, ...safeUser } = updated;
    return res.json({ message: "User role updated", user: safeUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.delete("/users/:id", (req, res) => {
  try {
    const idx = db.users.findIndex((u) => u.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    db.users.splice(idx, 1);
    return res.json({ message: "User removed successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
export default router;
