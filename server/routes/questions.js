import { Router } from "express";
import { db } from "../db.js";
const router = Router();
router.post("/tests/:testId", (req, res) => {
  try {
    const { testId } = req.params;
    const {
      questionText,
      options,
      correctOptionId,
      explanation,
      marks,
      negativeMarks,
      difficulty,
      subjectId,
    } = req.body;
    if (!questionText || !options || options.length < 2 || !correctOptionId) {
      return res
        .status(400)
        .json({
          error:
            "Question text, at least 2 options, and correct option are required",
        });
    }
    const test = db.getTestById(testId, true);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }
    const newQuestion = db.addQuestionToTest(testId, {
      subjectId: subjectId || test.subjectId,
      questionText,
      options,
      correctOptionId,
      explanation: explanation || "Refer to subject reference materials.",
      marks: Number(marks) || 4,
      negativeMarks: Number(negativeMarks) || 1,
      difficulty: difficulty || "Medium",
    });
    return res
      .status(201)
      .json({ message: "Question added successfully", question: newQuestion });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.put("/:id", (req, res) => {
  try {
    const updated = db.updateQuestion(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Question not found" });
    }
    return res.json({
      message: "Question updated successfully",
      question: updated,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", (req, res) => {
  try {
    const deleted = db.deleteQuestion(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Question not found" });
    }
    return res.json({ message: "Question deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
export default router;
