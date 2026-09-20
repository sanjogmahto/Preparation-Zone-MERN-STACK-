import { Router } from "express";
import { db } from "../db.js";
const router = Router();
router.get("/", (req, res) => {
  const { subjectId, difficulty, search } = req.query;
  const tests = db.getTests(subjectId, difficulty, search);
  return res.json({ tests });
});
router.get("/:id", (req, res) => {
  const test = db.getTestById(req.params.id, true);
  if (!test) {
    return res.status(404).json({ error: "Mock test not found" });
  }
  return res.json({ test });
});
router.get("/:id/take", (req, res) => {
  const test = db.getTestById(req.params.id, true);
  if (!test) {
    return res.status(404).json({ error: "Mock test not found" });
  }
  const rawQuestions =
    test.questions && test.questions.length > 0
      ? test.questions
      : db.getQuestionsByTestId(req.params.id);
  const studentQuestions = rawQuestions.map((q) => {
    let safeOptions = [];
    if (Array.isArray(q.options) && q.options.length > 0) {
      safeOptions = q.options.map((opt, optIdx) => {
        if (typeof opt === "string") {
          return { id: String.fromCharCode(65 + optIdx), text: opt };
        }
        return {
          id: opt.id || String.fromCharCode(65 + optIdx),
          text: opt.text || String(opt),
        };
      });
    } else {
      safeOptions = [
        { id: "A", text: "Option A" },
        { id: "B", text: "Option B" },
        { id: "C", text: "Option C" },
        { id: "D", text: "Option D" },
      ];
    }
    return {
      id: q.id,
      subjectId: q.subjectId,
      questionText: q.questionText,
      codeSnippet: q.codeSnippet,
      options: safeOptions,
      marks: q.marks || 4,
      negativeMarks: q.negativeMarks || 1,
      difficulty: q.difficulty || "Medium",
    };
  });
  return res.json({
    test: {
      ...test,
      questions: studentQuestions,
      questionCount: studentQuestions.length,
    },
  });
});
router.post("/", (req, res) => {
  try {
    const {
      title,
      subjectId,
      description,
      durationMinutes,
      difficulty,
      passingMarks,
      totalMarks,
      questions,
    } = req.body;
    if (!title || !subjectId) {
      return res.status(400).json({ error: "Title and Subject are required" });
    }
    const newTest = db.createTest({
      title,
      subjectId,
      description,
      durationMinutes: Number(durationMinutes) || 30,
      difficulty: difficulty || "Medium",
      passingMarks: Number(passingMarks) || 16,
      totalMarks: Number(totalMarks) || 40,
      questions: questions || [],
    });
    return res
      .status(201)
      .json({ message: "Test created successfully", test: newTest });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.put("/:id", (req, res) => {
  try {
    const updated = db.updateTest(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Mock test not found" });
    }
    return res.json({
      message: "Mock test updated successfully",
      test: updated,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.patch("/:id/publish", (req, res) => {
  try {
    const test = db.getTestById(req.params.id, false);
    if (!test) {
      return res.status(404).json({ error: "Mock test not found" });
    }
    const updated = db.updateTest(req.params.id, {
      isPublished: !test.isPublished,
    });
    return res.json({ message: "Publish status updated", test: updated });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", (req, res) => {
  try {
    const success = db.deleteTest(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Mock test not found" });
    }
    return res.json({ message: "Mock test deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
export default router;
