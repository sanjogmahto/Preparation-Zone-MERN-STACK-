import { Router } from "express";
import { db } from "../db.js";
const router = Router();
router.post("/submit", (req, res) => {
  try {
    const { testId, userId, userName, userEmail, answers, timeTakenSeconds } =
      req.body;
    if (!testId || !answers) {
      return res
        .status(400)
        .json({ error: "testId and answers are required." });
    }
    const test = db.getTestById(testId, true);
    if (!test) {
      return res.status(404).json({ error: "Test not found." });
    }
    const testQuestions = test.questions || [];
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    let markedCount = 0;
    const answerMap = /* @__PURE__ */ new Map();
    answers.forEach((a) => {
      answerMap.set(a.questionId, a);
    });
    const evaluatedAnswers = testQuestions.map((q) => {
      const userAns = answerMap.get(q.id);
      const selectedOptionId = userAns?.selectedOptionId || null;
      const timeSpent = userAns?.timeSpentSeconds || 0;
      if (
        userAns?.status === "marked-for-review" ||
        userAns?.status === "answered-and-marked"
      ) {
        markedCount++;
      }
      let isCorrect = false;
      let marksAwarded = 0;
      if (!selectedOptionId) {
        skippedCount++;
      } else if (selectedOptionId === q.correctOptionId) {
        isCorrect = true;
        correctCount++;
        marksAwarded = q.marks || 4;
        score += marksAwarded;
      } else {
        wrongCount++;
        marksAwarded = -(q.negativeMarks || 1);
        score += marksAwarded;
      }
      return {
        questionId: q.id,
        questionText: q.questionText,
        options: q.options,
        selectedOptionId,
        correctOptionId: q.correctOptionId,
        isCorrect,
        explanation: q.explanation,
        marksAwarded,
        timeSpentSeconds: timeSpent,
      };
    });
    const totalPossibleMarks = test.totalMarks || testQuestions.length * 4;
    const percentage = Math.max(
      0,
      Math.round((score / totalPossibleMarks) * 100),
    );
    const attempted = correctCount + wrongCount;
    const accuracy =
      attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
    const user = userId ? db.findUserById(userId) : null;
    const result = db.saveResult({
      userId: userId || "user-guest",
      userName: userName || user?.name || "Student Candidate",
      userEmail: userEmail || user?.email || "candidate@prepzone.com",
      testId: test.id,
      testTitle: test.title,
      subjectId: test.subjectId,
      subjectName: test.subjectName,
      score,
      totalMarks: totalPossibleMarks,
      percentage,
      accuracy,
      timeTakenSeconds: Number(timeTakenSeconds) || 0,
      totalQuestions: testQuestions.length,
      correctCount,
      wrongCount,
      skippedCount,
      markedCount,
      answers: evaluatedAnswers,
    });
    return res.status(201).json({
      message: "Test evaluated successfully",
      result,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.get("/history", (req, res) => {
  const userId = req.query.userId || "user-student";
  const history = db.getUserResults(userId);
  return res.json({ history });
});
router.get("/:id", (req, res) => {
  const result = db.getResultById(req.params.id);
  if (!result) {
    return res.status(404).json({ error: "Result not found" });
  }
  return res.json({ result });
});
router.get("/admin/all", (req, res) => {
  const allResults = db.getAllResults();
  return res.json({ results: allResults });
});
export default router;
