import { Router } from "express";
import { db } from "../db.js";
const router = Router();
router.get("/", (req, res) => {
  const leaderboard = db.getLeaderboard();
  return res.json({ leaderboard });
});
export default router;
