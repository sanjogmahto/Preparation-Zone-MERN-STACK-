import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  ShieldCheck,
  BookOpen,
  FileText,
  HelpCircle,
  Users,
  Award,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
export const AdminDashboard = ({
  subjects,
  tests,
  onRefreshData,
  onInspectResult,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjectForm, setSubjectForm] = useState({
    name: "",
    code: "",
    category: "Core CS",
    description: "",
  });
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [testForm, setTestForm] = useState({
    title: "",
    subjectId: subjects[0]?.id || "",
    durationMinutes: 30,
    difficulty: "Medium",
    totalMarks: 40,
    passingMarks: 16,
    description: "",
  });
  const [selectedTestForQuestions, setSelectedTestForQuestions] = useState(
    tests[0]?.id || "",
  );
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionForm, setQuestionForm] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOptionId: "A",
    explanation: "",
    marks: 4,
    negativeMarks: 1,
    difficulty: "Medium",
  });
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsData, resultsData, usersData] = await Promise.all([
        api.getAdminStats(),
        api.getAllResults(),
        api.getUsers(),
      ]);
      setStats(statsData);
      setAllResults(resultsData);
      setUsers(usersData);
    } catch (err) {
      console.error("Failed to load admin dashboard info:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAdminData();
  }, []);
  const handleOpenSubjectModal = (subj) => {
    if (subj) {
      setEditingSubject(subj);
      setSubjectForm({
        name: subj.name,
        code: subj.code,
        category: subj.category,
        description: subj.description,
      });
    } else {
      setEditingSubject(null);
      setSubjectForm({
        name: "",
        code: "",
        category: "Core CS",
        description: "",
      });
    }
    setIsSubjectModalOpen(true);
  };
  const handleSaveSubject = async (e) => {
    e.preventDefault();
    try {
      if (editingSubject) {
        await api.updateSubject(editingSubject.id, subjectForm);
      } else {
        await api.createSubject(subjectForm);
      }
      setIsSubjectModalOpen(false);
      await onRefreshData();
      await loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteSubject = async (id) => {
    if (!window.confirm("Delete this subject and its associated mock tests?"))
      return;
    try {
      await api.deleteSubject(id);
      await onRefreshData();
      await loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleOpenTestModal = (test) => {
    if (test) {
      setEditingTest(test);
      setTestForm({
        title: test.title,
        subjectId: test.subjectId,
        durationMinutes: test.durationMinutes,
        difficulty: test.difficulty,
        totalMarks: test.totalMarks,
        passingMarks: test.passingMarks,
        description: test.description,
      });
    } else {
      setEditingTest(null);
      setTestForm({
        title: "",
        subjectId: subjects[0]?.id || "",
        durationMinutes: 30,
        difficulty: "Medium",
        totalMarks: 40,
        passingMarks: 16,
        description: "",
      });
    }
    setIsTestModalOpen(true);
  };
  const handleSaveTest = async (e) => {
    e.preventDefault();
    try {
      if (editingTest) {
        await api.updateTest(editingTest.id, testForm);
      } else {
        await api.createTest(testForm);
      }
      setIsTestModalOpen(false);
      await onRefreshData();
      await loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleTogglePublish = async (testId) => {
    try {
      await api.togglePublishTest(testId);
      await onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteTest = async (id) => {
    if (!window.confirm("Delete this mock test paper?")) return;
    try {
      await api.deleteTest(id);
      await onRefreshData();
      await loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleOpenQuestionModal = (q) => {
    if (q) {
      setEditingQuestion(q);
      const optA = q.options.find((o) => o.id === "A")?.text || "";
      const optB = q.options.find((o) => o.id === "B")?.text || "";
      const optC = q.options.find((o) => o.id === "C")?.text || "";
      const optD = q.options.find((o) => o.id === "D")?.text || "";
      setQuestionForm({
        questionText: q.questionText,
        optionA: optA,
        optionB: optB,
        optionC: optC,
        optionD: optD,
        correctOptionId: q.correctOptionId,
        explanation: q.explanation,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        difficulty: q.difficulty,
      });
    } else {
      setEditingQuestion(null);
      setQuestionForm({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOptionId: "A",
        explanation: "",
        marks: 4,
        negativeMarks: 1,
        difficulty: "Medium",
      });
    }
    setIsQuestionModalOpen(true);
  };
  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    if (!selectedTestForQuestions) return;
    const payload = {
      subjectId: currentSelectedTest?.subjectId || "",
      questionText: questionForm.questionText,
      options: [
        { id: "A", text: questionForm.optionA },
        { id: "B", text: questionForm.optionB },
        { id: "C", text: questionForm.optionC },
        { id: "D", text: questionForm.optionD },
      ],
      correctOptionId: questionForm.correctOptionId,
      explanation: questionForm.explanation,
      marks: questionForm.marks,
      negativeMarks: questionForm.negativeMarks,
      difficulty: questionForm.difficulty,
    };
    try {
      if (editingQuestion) {
        await api.updateQuestion(editingQuestion.id, payload);
      } else {
        await api.addQuestion(selectedTestForQuestions, payload);
      }
      setIsQuestionModalOpen(false);
      await onRefreshData();
      await loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteQuestion = async (qId) => {
    if (!window.confirm("Delete this question from the test?")) return;
    try {
      await api.deleteQuestion(qId);
      await onRefreshData();
      await loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleToggleUserRole = async (user) => {
    const newRole = user.role === "admin" ? "student" : "admin";
    try {
      await api.updateUserRole(user.id, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)),
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Remove this registered user?")) return;
    try {
      await api.deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
    }
  };
  const currentSelectedTest = tests.find(
    (t) => t.id === selectedTestForQuestions,
  );
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-violet-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-200 text-xs font-bold border border-violet-400/20">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-300" />
            <span>PrepZone Administration Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Curriculum &amp; Exam Control Center
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Create, edit, and publish subject syllabi, timed mock tests,
            multiple-choice questions with answer keys, inspect student
            scorecards, and manage candidate accounts.
          </p>
        </div>

        <button
          onClick={() => {
            onRefreshData();
            loadAdminData();
          }}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition flex items-center gap-2 cursor-pointer shrink-0"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
          />
          <span>Sync Real-Time Data</span>
        </button>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
        {[
          { id: "overview", label: "Platform Stats", icon: Award },
          { id: "subjects", label: "Subject Manager (14)", icon: BookOpen },
          { id: "tests", label: "Mock Test Papers (70+)", icon: FileText },
          { id: "questions", label: "Question Bank Builder", icon: HelpCircle },
          {
            id: "results",
            label: "Student Results Viewer",
            icon: CheckCircle2,
          },
          { id: "users", label: "Candidate Accounts", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`admin-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${isActive ? "bg-violet-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-700 uppercase">
                Registered Students
              </span>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">
                {stats?.totalStudents ?? 2}
              </p>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">
                Active candidates
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-700 uppercase">
                Subjects Configured
              </span>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">
                {stats?.totalSubjects ?? subjects.length}
              </p>
              <span className="text-xs text-indigo-600 font-semibold mt-1 block">
                B.Tech CSE &amp; Aptitude
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-700 uppercase">
                Mock Test Papers
              </span>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">
                {stats?.totalTests ?? tests.length}
              </p>
              <span className="text-xs text-amber-600 font-semibold mt-1 block">
                5-8 papers / subject
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-700 uppercase">
                Total Submissions
              </span>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">
                {stats?.totalAttempts ?? allResults.length}
              </p>
              <span className="text-xs text-violet-600 font-semibold mt-1 block">
                Pass rate: {stats?.passRate ?? 85}%
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-slate-900">
              Admin Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <button
                onClick={() => {
                  setActiveTab("subjects");
                  handleOpenSubjectModal();
                }}
                className="p-4 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-900 font-bold text-xs flex items-center justify-between transition cursor-pointer"
              >
                <span>+ Add New Subject</span>
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setActiveTab("tests");
                  handleOpenTestModal();
                }}
                className="p-4 rounded-xl border border-dashed border-violet-200 bg-violet-50/50 hover:bg-violet-50 text-violet-900 font-bold text-xs flex items-center justify-between transition cursor-pointer"
              >
                <span>+ Add Mock Test Paper</span>
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setActiveTab("questions");
                  handleOpenQuestionModal();
                }}
                className="p-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-900 font-bold text-xs flex items-center justify-between transition cursor-pointer"
              >
                <span>+ Create MCQ Question</span>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Subjects Manager */}
      {activeTab === "subjects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Manage Academic Subjects
              </h2>
              <p className="text-xs text-slate-700">
                Add, edit, or delete syllabus categories and subject codes
              </p>
            </div>
            <button
              id="admin-add-subject-btn"
              onClick={() => handleOpenSubjectModal()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Subject
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-3 px-4">Subject Name</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Mock Papers</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {s.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                      {s.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[10px]">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                      {s.testCount || 6}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenSubjectModal(s)}
                        className="p-1.5 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
                        title="Edit Subject"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(s.id)}
                        className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Subject"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Tests Manager */}
      {activeTab === "tests" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Manage Mock Test Papers
              </h2>
              <p className="text-xs text-slate-700">
                Set duration timer, difficulty levels, passing marks, and
                publish status
              </p>
            </div>
            <button
              id="admin-add-test-btn"
              onClick={() => handleOpenTestModal()}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create Test Paper
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="max-h-[550px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[10px] sticky top-0">
                  <tr>
                    <th className="py-3 px-4">Test Title</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4 text-center">Timer</th>
                    <th className="py-3 px-4 text-center">Difficulty</th>
                    <th className="py-3 px-4 text-center">Questions</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tests.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                        {t.title}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {t.subjectName}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                        {t.durationMinutes}m
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700" : t.difficulty === "Medium" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}
                        >
                          {t.difficulty}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                        {t.questionCount}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleTogglePublish(t.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold cursor-pointer transition ${t.isPublished ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500"}`}
                        >
                          {t.isPublished ? "PUBLISHED" : "DRAFT"}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedTestForQuestions(t.id);
                            setActiveTab("questions");
                          }}
                          className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[11px] font-bold"
                          title="Manage Questions"
                        >
                          Questions
                        </button>
                        <button
                          onClick={() => handleOpenTestModal(t)}
                          className="p-1.5 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
                          title="Edit Test"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTest(t.id)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Delete Test"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Questions Manager */}
      {activeTab === "questions" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Question Bank Builder
              </h2>
              <p className="text-xs text-slate-700">
                Add MCQs with 4 choices, answer key, and detailed pedagogical
                explanations
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedTestForQuestions}
                onChange={(e) => setSelectedTestForQuestions(e.target.value)}
                className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {tests.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.subjectName} — {t.title.slice(0, 30)}...
                  </option>
                ))}
              </select>

              <button
                id="admin-add-question-btn"
                onClick={() => handleOpenQuestionModal()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>
          </div>

          {currentSelectedTest?.questions &&
          currentSelectedTest.questions.length > 0 ? (
            <div className="space-y-3">
              {currentSelectedTest.questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-700 shrink-0">
                        Q{idx + 1}
                      </span>
                      <p className="text-sm font-bold text-slate-900">
                        {q.questionText}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenQuestionModal(q)}
                        className="p-1.5 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${opt.id === q.correctOptionId ? "bg-emerald-50 border-emerald-300 font-bold text-emerald-950" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                      >
                        <span>
                          {opt.id}. {opt.text}
                        </span>
                        {opt.id === q.correctOptionId && (
                          <span className="text-[10px] font-extrabold text-emerald-700 uppercase">
                            Correct Key
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-indigo-50/60 rounded-xl text-xs text-indigo-950 border border-indigo-100">
                    <strong className="text-indigo-900">Explanation:</strong>{" "}
                    {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-700">
                No questions found in this mock test. Click "+ Add Question" to
                seed MCQs.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Student Results Viewer */}
      {activeTab === "results" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Student Exam Submissions
            </h2>
            <p className="text-xs text-slate-700">
              Review all candidate attempts, scores, percentiles, and test logs
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Mock Test Paper</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4 text-center">Accuracy</th>
                  <th className="py-3 px-4 text-center">Time</th>
                  <th className="py-3 px-4">Submitted At</th>
                  <th className="py-3 px-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allResults.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{r.userName}</div>
                      <span className="text-[10px] text-slate-700 font-normal">
                        {r.userEmail}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 max-w-xs truncate">
                      {r.testTitle}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {r.score} / {r.totalMarks} ({r.percentage}%)
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-600">
                      {r.accuracy}%
                    </td>
                    <td className="py-3.5 px-4 text-center text-slate-700">
                      {Math.round(r.timeTakenSeconds / 60)}m
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {new Date(r.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onInspectResult(r.id)}
                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded text-[11px] cursor-pointer"
                      >
                        Scorecard
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: User Management */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              User Account Management
            </h2>
            <p className="text-xs text-slate-700">
              Manage student and administrator permissions
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Institution</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{u.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === "admin" ? "bg-violet-100 text-violet-800" : "bg-indigo-50 text-indigo-700"}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {u.college || "\u2014"}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleUserRole(u)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer"
                      >
                        Make {u.role === "admin" ? "Student" : "Admin"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Subject Form */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 text-xs">
            <h3 className="text-base font-extrabold text-slate-900">
              {editingSubject ? "Edit Subject" : "Add New Subject"}
            </h3>
            <form onSubmit={handleSaveSubject} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  value={subjectForm.name}
                  onChange={(e) =>
                    setSubjectForm({ ...subjectForm, name: e.target.value })
                  }
                  placeholder="e.g. Cloud Computing & DevOps"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    required
                    value={subjectForm.code}
                    onChange={(e) =>
                      setSubjectForm({ ...subjectForm, code: e.target.value })
                    }
                    placeholder="e.g. CC-301"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={subjectForm.category}
                    onChange={(e) =>
                      setSubjectForm({
                        ...subjectForm,
                        category: e.target.value,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  >
                    <option value="Core CS">Core CS</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="General Studies">General Studies</option>
                    <option value="Emerging Tech">Emerging Tech</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Description / Syllabus
                </label>
                <textarea
                  rows={3}
                  value={subjectForm.description}
                  onChange={(e) =>
                    setSubjectForm({
                      ...subjectForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Key topics, concepts, and interview practice focus..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubjectModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Test Form */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 text-xs">
            <h3 className="text-base font-extrabold text-slate-900">
              {editingTest ? "Edit Mock Test" : "Create New Mock Test"}
            </h3>
            <form onSubmit={handleSaveTest} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Test Title
                </label>
                <input
                  type="text"
                  required
                  value={testForm.title}
                  onChange={(e) =>
                    setTestForm({ ...testForm, title: e.target.value })
                  }
                  placeholder="e.g. Operating Systems - Advanced Concurrency Assessment"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Subject
                  </label>
                  <select
                    value={testForm.subjectId}
                    onChange={(e) =>
                      setTestForm({ ...testForm, subjectId: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Difficulty
                  </label>
                  <select
                    value={testForm.difficulty}
                    onChange={(e) =>
                      setTestForm({ ...testForm, difficulty: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Duration (Mins)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    value={testForm.durationMinutes}
                    onChange={(e) =>
                      setTestForm({
                        ...testForm,
                        durationMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={testForm.totalMarks}
                    onChange={(e) =>
                      setTestForm({
                        ...testForm,
                        totalMarks: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Passing Marks
                  </label>
                  <input
                    type="number"
                    value={testForm.passingMarks}
                    onChange={(e) =>
                      setTestForm({
                        ...testForm,
                        passingMarks: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Instructions / Description
                </label>
                <textarea
                  rows={2}
                  value={testForm.description}
                  onChange={(e) =>
                    setTestForm({ ...testForm, description: e.target.value })
                  }
                  placeholder="Exam guidelines, negative marking notes..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700"
                >
                  Save Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Question Form */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 text-xs max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-extrabold text-slate-900">
              {editingQuestion
                ? "Edit MCQ Question"
                : "Add MCQ Question to Test"}
            </h3>
            <form onSubmit={handleSaveQuestion} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Question Statement
                </label>
                <textarea
                  rows={3}
                  required
                  value={questionForm.questionText}
                  onChange={(e) =>
                    setQuestionForm({
                      ...questionForm,
                      questionText: e.target.value,
                    })
                  }
                  placeholder="Type the full question statement..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">
                  Multiple Choice Options
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-4">A.</span>
                    <input
                      type="text"
                      required
                      value={questionForm.optionA}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          optionA: e.target.value,
                        })
                      }
                      placeholder="Option A text"
                      className="w-full p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-4">B.</span>
                    <input
                      type="text"
                      required
                      value={questionForm.optionB}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          optionB: e.target.value,
                        })
                      }
                      placeholder="Option B text"
                      className="w-full p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-4">C.</span>
                    <input
                      type="text"
                      required
                      value={questionForm.optionC}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          optionC: e.target.value,
                        })
                      }
                      placeholder="Option C text"
                      className="w-full p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 w-4">D.</span>
                    <input
                      type="text"
                      required
                      value={questionForm.optionD}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          optionD: e.target.value,
                        })
                      }
                      placeholder="Option D text"
                      className="w-full p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Correct Key
                  </label>
                  <select
                    value={questionForm.correctOptionId}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        correctOptionId: e.target.value,
                      })
                    }
                    className="w-full p-2 rounded-lg border border-slate-200 font-bold text-indigo-700"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Marks (+)
                  </label>
                  <input
                    type="number"
                    value={questionForm.marks}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        marks: Number(e.target.value),
                      })
                    }
                    className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Negative (-)
                  </label>
                  <input
                    type="number"
                    value={questionForm.negativeMarks}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        negativeMarks: Number(e.target.value),
                      })
                    }
                    className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Detailed Pedagogical Explanation
                </label>
                <textarea
                  rows={3}
                  required
                  value={questionForm.explanation}
                  onChange={(e) =>
                    setQuestionForm({
                      ...questionForm,
                      explanation: e.target.value,
                    })
                  }
                  placeholder="Explain why this option is correct, derivation steps, or core principles..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
