import {
  INITIAL_SUBJECTS,
  generateAllMockTests,
  INITIAL_LEADERBOARD,
} from "./seedData.js";
class DatabaseStore {
  users = [];
  subjects = [];
  tests = [];
  questions = [];
  results = [];
  leaderboard = [];
  initialized = false;
  constructor() {
    this.init();
  }
  init() {
    if (this.initialized) return;
    this.users = [
      {
        id: "user-admin",
        name: "PrepZone Admin",
        email: "admin@prepzone.com",
        role: "admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
        college: "PrepZone Headquarters",
        branch: "Platform Administration",
        targetExam: "GATE & Campus Placements",
        createdAt: /* @__PURE__ */ new Date("2026-01-01").toISOString(),
        passwordHash: "admin123",
      },
      {
        id: "user-student",
        name: "Alex Johnson",
        email: "student@prepzone.com",
        role: "student",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        college: "National Institute of Technology",
        branch: "Computer Science & Engineering",
        targetExam: "Campus Placements & GATE CSE",
        createdAt: /* @__PURE__ */ new Date("2026-02-15").toISOString(),
        passwordHash: "student123",
      },
    ];
    this.subjects = [...INITIAL_SUBJECTS];
    const { tests, allQuestions } = generateAllMockTests();
    this.tests = tests;
    this.questions = allQuestions;
    this.leaderboard = [...INITIAL_LEADERBOARD];
    const initialTest1 = this.tests[0];
    const initialTest2 = this.tests[6];
    const initialTest3 = this.tests[36];
    if (initialTest1 && initialTest2 && initialTest3) {
      this.results = [
        {
          id: "res-seed-1",
          userId: "user-student",
          userName: "Alex Johnson",
          userEmail: "student@prepzone.com",
          testId: initialTest1.id,
          testTitle: initialTest1.title,
          subjectId: initialTest1.subjectId,
          subjectName: initialTest1.subjectName,
          score: 32,
          totalMarks: 40,
          percentage: 80,
          accuracy: 88.8,
          timeTakenSeconds: 780,
          totalQuestions: 10,
          correctCount: 8,
          wrongCount: 1,
          skippedCount: 1,
          markedCount: 2,
          answers: (initialTest1.questions || []).map((q, idx) => ({
            questionId: q.id,
            questionText: q.questionText,
            options: q.options,
            selectedOptionId:
              idx === 9
                ? null
                : idx === 8
                  ? q.correctOptionId === "A"
                    ? "B"
                    : "A"
                  : q.correctOptionId,
            correctOptionId: q.correctOptionId,
            isCorrect: idx < 8,
            explanation: q.explanation,
            marksAwarded: idx < 8 ? 4 : idx === 8 ? -1 : 0,
            timeSpentSeconds: 70,
          })),
          submittedAt: new Date(Date.now() - 3 * 864e5).toISOString(),
        },
        {
          id: "res-seed-2",
          userId: "user-student",
          userName: "Alex Johnson",
          userEmail: "student@prepzone.com",
          testId: initialTest2.id,
          testTitle: initialTest2.title,
          subjectId: initialTest2.subjectId,
          subjectName: initialTest2.subjectName,
          score: 36,
          totalMarks: 40,
          percentage: 90,
          accuracy: 90,
          timeTakenSeconds: 640,
          totalQuestions: 10,
          correctCount: 9,
          wrongCount: 1,
          skippedCount: 0,
          markedCount: 1,
          answers: (initialTest2.questions || []).map((q, idx) => ({
            questionId: q.id,
            questionText: q.questionText,
            options: q.options,
            selectedOptionId:
              idx === 9
                ? q.correctOptionId === "A"
                  ? "C"
                  : "A"
                : q.correctOptionId,
            correctOptionId: q.correctOptionId,
            isCorrect: idx !== 9,
            explanation: q.explanation,
            marksAwarded: idx !== 9 ? 4 : -1,
            timeSpentSeconds: 64,
          })),
          submittedAt: new Date(Date.now() - 1 * 864e5).toISOString(),
        },
        {
          id: "res-seed-3",
          userId: "user-student",
          userName: "Alex Johnson",
          userEmail: "student@prepzone.com",
          testId: initialTest3.id,
          testTitle: initialTest3.title,
          subjectId: initialTest3.subjectId,
          subjectName: initialTest3.subjectName,
          score: 28,
          totalMarks: 40,
          percentage: 70,
          accuracy: 77.7,
          timeTakenSeconds: 920,
          totalQuestions: 10,
          correctCount: 7,
          wrongCount: 2,
          skippedCount: 1,
          markedCount: 3,
          answers: (initialTest3.questions || []).map((q, idx) => ({
            questionId: q.id,
            questionText: q.questionText,
            options: q.options,
            selectedOptionId:
              idx === 8
                ? q.correctOptionId === "B"
                  ? "C"
                  : "B"
                : idx === 9
                  ? null
                  : q.correctOptionId,
            correctOptionId: q.correctOptionId,
            isCorrect: idx < 7,
            explanation: q.explanation,
            marksAwarded: idx < 7 ? 4 : idx === 7 || idx === 8 ? -1 : 0,
            timeSpentSeconds: 90,
          })),
          submittedAt: new Date(Date.now() - 6 * 36e5).toISOString(),
        },
      ];
    }
    this.initialized = true;
    console.log(
      `[PrepZone DB] Seeded ${this.subjects.length} subjects, ${this.tests.length} mock tests, and ${this.questions.length} questions successfully.`,
    );
  }
  // Auth Operations
  findUserByEmail(email) {
    return this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
  }
  findUserById(id) {
    return this.users.find((u) => u.id === id);
  }
  createUser(userData) {
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || "student",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.name)}`,
      college: userData.college || "Engineering Institute",
      branch: userData.branch || "Computer Science",
      targetExam: userData.targetExam || "Campus Placements",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
      passwordHash: userData.password,
    };
    this.users.push(newUser);
    return newUser;
  }
  updateUser(id, updates) {
    const user = this.findUserById(id);
    if (!user) return void 0;
    Object.assign(user, updates);
    const leader = this.leaderboard.find((l) => l.userId === id);
    if (leader) {
      if (updates.name) leader.name = updates.name;
      if (updates.avatar) leader.avatar = updates.avatar;
    }
    return user;
  }
  // Subject Operations
  getSubjects() {
    return this.subjects;
  }
  getSubjectById(id) {
    return this.subjects.find((s) => s.id === id);
  }
  createSubject(subject) {
    const newSubject = {
      ...subject,
      id: `subj-${Date.now()}`,
      testCount: 0,
      questionCount: 0,
    };
    this.subjects.push(newSubject);
    return newSubject;
  }
  updateSubject(id, updates) {
    const subject = this.getSubjectById(id);
    if (!subject) return void 0;
    Object.assign(subject, updates);
    return subject;
  }
  deleteSubject(id) {
    const initialLen = this.subjects.length;
    this.subjects = this.subjects.filter((s) => s.id !== id);
    this.tests = this.tests.filter((t) => t.subjectId !== id);
    return this.subjects.length < initialLen;
  }
  // Test Operations
  getTests(subjectId, difficulty, search) {
    let filtered = this.tests;
    if (subjectId) {
      filtered = filtered.filter((t) => t.subjectId === subjectId);
    }
    if (difficulty && difficulty !== "All") {
      filtered = filtered.filter(
        (t) => t.difficulty.toLowerCase() === difficulty.toLowerCase(),
      );
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }
    return filtered;
  }
  getTestById(id, includeQuestions = true) {
    const test = this.tests.find((t) => t.id === id);
    if (!test) return void 0;
    if (includeQuestions) {
      if (!test.questions || test.questions.length === 0) {
        test.questions = this.questions.filter((q) => q.testId === id);
      }
      if (!test.questions || test.questions.length === 0) {
        test.questions = this.generateFallbackQuestionsForTest(test);
      }
      return test;
    }
    const { questions, ...rest } = test;
    return rest;
  }
  getQuestionsByTestId(testId) {
    const test = this.tests.find((t) => t.id === testId);
    if (test && test.questions && test.questions.length > 0) {
      return test.questions;
    }
    const fromStore = this.questions.filter((q) => q.testId === testId);
    if (fromStore.length > 0) {
      return fromStore;
    }
    if (test) {
      return this.generateFallbackQuestionsForTest(test);
    }
    return [];
  }
  generateFallbackQuestionsForTest(test) {
    const subjectQuestions = this.questions.filter(
      (q) => q.subjectId === test.subjectId,
    );
    const pool =
      subjectQuestions.length > 0
        ? subjectQuestions
        : this.questions.slice(0, 15);
    const count = test.questionCount || 10;
    const generated = [];
    for (let i = 0; i < count; i++) {
      const template = pool[i % pool.length];
      const q = {
        id: `${test.id}-gen-q${i + 1}`,
        testId: test.id,
        subjectId: test.subjectId,
        questionText: template.questionText,
        options: template.options,
        correctOptionId: template.correctOptionId || "A",
        explanation:
          template.explanation ||
          `Core fundamental concept in ${test.subjectName}.`,
        marks: template.marks || 4,
        negativeMarks: template.negativeMarks || 1,
        difficulty: template.difficulty || "Medium",
      };
      generated.push(q);
      this.questions.push(q);
    }
    test.questions = generated;
    return generated;
  }
  createTest(testData) {
    const subject = this.getSubjectById(testData.subjectId || "");
    const newTest = {
      id: `test-${Date.now()}`,
      title: testData.title || "Untitled Mock Test",
      subjectId: testData.subjectId || "",
      subjectName: subject?.name || testData.subjectName || "General",
      description: testData.description || "Mock test assessment",
      durationMinutes: testData.durationMinutes || 30,
      totalMarks: testData.totalMarks || 40,
      passingMarks: testData.passingMarks || 16,
      difficulty: testData.difficulty || "Medium",
      isPublished:
        testData.isPublished !== void 0 ? testData.isPublished : true,
      questionCount: testData.questions?.length || testData.questionCount || 10,
      questions: testData.questions || [],
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    };
    this.tests.unshift(newTest);
    if (subject) {
      subject.testCount += 1;
    }
    return newTest;
  }
  updateTest(id, updates) {
    const test = this.tests.find((t) => t.id === id);
    if (!test) return void 0;
    Object.assign(test, updates);
    return test;
  }
  deleteTest(id) {
    const initialLen = this.tests.length;
    const test = this.tests.find((t) => t.id === id);
    if (test) {
      const subject = this.getSubjectById(test.subjectId);
      if (subject && subject.testCount > 0) {
        subject.testCount -= 1;
      }
    }
    this.tests = this.tests.filter((t) => t.id !== id);
    return this.tests.length < initialLen;
  }
  // Question Operations
  addQuestionToTest(testId, question) {
    const test = this.tests.find((t) => t.id === testId);
    if (!test) return void 0;
    const newQuestion = {
      ...question,
      id: `q-${Date.now()}`,
      testId,
    };
    if (!test.questions) {
      test.questions = [];
    }
    test.questions.push(newQuestion);
    test.questionCount = test.questions.length;
    test.totalMarks = test.questions.reduce(
      (sum, q) => sum + (q.marks || 4),
      0,
    );
    test.passingMarks = Math.round(test.totalMarks * 0.4);
    this.questions.push(newQuestion);
    const subject = this.getSubjectById(test.subjectId);
    if (subject) {
      subject.questionCount += 1;
    }
    return newQuestion;
  }
  updateQuestion(questionId, updates) {
    let found;
    for (const test of this.tests) {
      if (test.questions) {
        const q = test.questions.find((item) => item.id === questionId);
        if (q) {
          Object.assign(q, updates);
          found = q;
        }
      }
    }
    return found;
  }
  deleteQuestion(questionId) {
    let deleted = false;
    for (const test of this.tests) {
      if (test.questions) {
        const initialCount = test.questions.length;
        test.questions = test.questions.filter((q) => q.id !== questionId);
        if (test.questions.length < initialCount) {
          test.questionCount = test.questions.length;
          test.totalMarks = test.questions.reduce(
            (sum, q) => sum + (q.marks || 4),
            0,
          );
          deleted = true;
        }
      }
    }
    return deleted;
  }
  // Results & Analytics Operations
  saveResult(resultData) {
    const newResult = {
      ...resultData,
      id: `res-${Date.now()}`,
      submittedAt: /* @__PURE__ */ new Date().toISOString(),
    };
    this.results.unshift(newResult);
    const existingLeader = this.leaderboard.find(
      (l) => l.userId === newResult.userId,
    );
    if (existingLeader) {
      existingLeader.testsCompleted += 1;
      existingLeader.totalPoints += newResult.score;
      existingLeader.averageScore = Math.round(
        (existingLeader.totalPoints / (existingLeader.testsCompleted * 40)) *
          100,
      );
      existingLeader.accuracy = Math.round(
        (existingLeader.accuracy + newResult.accuracy) / 2,
      );
    } else {
      this.leaderboard.push({
        rank: this.leaderboard.length + 1,
        userId: newResult.userId,
        name: newResult.userName,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newResult.userName)}`,
        college: "Student Institute",
        testsCompleted: 1,
        averageScore: newResult.percentage,
        totalPoints: newResult.score,
        accuracy: newResult.accuracy,
        streakDays: 1,
      });
    }
    this.leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    this.leaderboard.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });
    return newResult;
  }
  getUserResults(userId) {
    return this.results.filter((r) => r.userId === userId);
  }
  getResultById(id) {
    return this.results.find((r) => r.id === id);
  }
  getAllResults() {
    return this.results;
  }
  // Leaderboard
  getLeaderboard() {
    return this.leaderboard;
  }
  // Admin Stats
  getAdminStats() {
    const totalStudents = this.users.filter((u) => u.role === "student").length;
    const totalSubjects = this.subjects.length;
    const totalTests = this.tests.length;
    const totalQuestions = this.tests.reduce(
      (acc, t) => acc + (t.questions?.length || t.questionCount || 0),
      0,
    );
    const totalAttempts = this.results.length;
    const avgScore =
      totalAttempts > 0
        ? Math.round(
            this.results.reduce((acc, r) => acc + r.percentage, 0) /
              totalAttempts,
          )
        : 78;
    const passed = this.results.filter(
      (r) => r.score >= r.totalMarks * 0.4,
    ).length;
    const passRate =
      totalAttempts > 0 ? Math.round((passed / totalAttempts) * 100) : 85;
    return {
      totalStudents,
      totalSubjects,
      totalTests,
      totalQuestions,
      totalAttempts,
      averagePlatformScore: avgScore,
      passRate,
    };
  }
}
export const db = new DatabaseStore();
