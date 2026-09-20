import { useState, useEffect } from "react";
import { api, authStorage } from "./services/api";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { StudentDashboard } from "./components/StudentDashboard";
import { SubjectCatalog } from "./components/SubjectCatalog";
import { TestList } from "./components/TestList";
import { ExamInterface } from "./components/ExamInterface";
import { ResultView } from "./components/ResultView";
import { HistoryView } from "./components/HistoryView";
import { AnalyticsView } from "./components/AnalyticsView";
import { LeaderboardView } from "./components/LeaderboardView";
import { ProfileView } from "./components/ProfileView";
import { AdminDashboard } from "./components/AdminDashboard";
import { AuthModal } from "./components/AuthModal";
export const App = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [resultsHistory, setResultsHistory] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [activeTest, setActiveTest] = useState(null);
  const [activeResult, setActiveResult] = useState(null);
  const [startingTestId, setStartingTestId] = useState(null);
  const [examStartError, setExamStartError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const fetchAppData = async () => {
    try {
      const user = authStorage.getUser();
      setCurrentUser(user);
      const [subjectsData, testsData, lbData] = await Promise.all([
        api.getSubjects(),
        api.getTests(),
        api.getLeaderboard(),
      ]);
      setSubjects(subjectsData);
      setTests(testsData);
      setLeaderboard(lbData);
      if (user) {
        const historyData = await api.getUserResults(user.id);
        setResultsHistory(historyData);
      }
    } catch (err) {
      console.error("Failed to load application data:", err);
    }
  };
  useEffect(() => {
    fetchAppData();
  }, []);
  const handleOpenAuth = (mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };
  const handleAuthSuccess = async (user) => {
    setCurrentUser(user);
    try {
      const historyData = await api.getUserResults(user.id);
      setResultsHistory(historyData);
    } catch (e) {
      console.error(e);
    }
  };
  const handleLogout = async () => {
    await api.logout();
    setCurrentUser(null);
    setActiveView("dashboard");
  };
  const handleSwitchRole = (newRole) => {
    if (currentUser) {
      const updated = { ...currentUser, role: newRole };
      authStorage.setCurrentUser(updated);
      setCurrentUser(updated);
    }
  };
  const handleSelectSubjectFromCatalog = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setActiveView("tests");
  };
  const handleStartExam = async (testId) => {
    setStartingTestId(testId);
    setExamStartError(null);
    try {
      const localTest = tests.find((t) => t.id === testId);
      let testToLaunch = null;
      try {
        const fullTest = await api.getTestById(testId);
        if (
          fullTest &&
          Array.isArray(fullTest.questions) &&
          fullTest.questions.length > 0
        ) {
          testToLaunch = fullTest;
        }
      } catch (networkErr) {
        console.warn(
          "Network fetch for exam failed, attempting local fallback:",
          networkErr,
        );
      }
      if (
        !testToLaunch &&
        localTest &&
        Array.isArray(localTest.questions) &&
        localTest.questions.length > 0
      ) {
        testToLaunch = localTest;
      }
      if (!testToLaunch && localTest) {
        testToLaunch = {
          ...localTest,
          questions:
            localTest.questions && localTest.questions.length > 0
              ? localTest.questions
              : [],
        };
      }
      if (
        testToLaunch &&
        testToLaunch.questions &&
        testToLaunch.questions.length > 0
      ) {
        setActiveTest(testToLaunch);
        setActiveView("exam");
      } else {
        const fallbackTest = await api.getTests(localTest?.subjectId);
        const matched =
          fallbackTest.find((t) => t.id === testId) || fallbackTest[0];
        if (matched && matched.questions && matched.questions.length > 0) {
          setActiveTest(matched);
          setActiveView("exam");
        } else {
          setExamStartError(
            "Unable to load questions for this mock paper. Please try another test.",
          );
        }
      }
    } catch (err) {
      console.error("Error starting mock test:", err);
      setExamStartError(
        err.message || "Failed to start exam. Please try again.",
      );
    } finally {
      setStartingTestId(null);
    }
  };
  const handleSubmitExam = async (answers, timeTakenSeconds) => {
    if (!activeTest) return;
    try {
      const result = await api.submitTest(
        activeTest.id,
        answers,
        timeTakenSeconds,
      );
      setActiveResult(result);
      setResultsHistory((prev) => [result, ...prev]);
      setActiveView("result");
      const [lb, ts] = await Promise.all([
        api.getLeaderboard(),
        api.getTests(),
      ]);
      setLeaderboard(lb);
      setTests(ts);
    } catch (err) {
      console.error("Failed to submit exam:", err);
    }
  };
  const handleExitExam = () => {
    setActiveTest(null);
    setActiveView("tests");
  };
  const handleInspectResult = async (resultId) => {
    try {
      const res = await api.getResultById(resultId);
      if (res) {
        setActiveResult(res);
        setActiveView("result");
      }
    } catch (err) {
      console.error("Failed to inspect scorecard:", err);
    }
  };
  const handleUpdateProfile = async (updates) => {
    if (!currentUser) return;
    try {
      const updated = await api.updateProfile(currentUser.id, updates);
      setCurrentUser(updated);
    } catch (err) {
      console.error("Failed to update profile:", err);
      throw err;
    }
  };
  if (activeView === "exam" && activeTest) {
    return (
      <ExamInterface
        test={activeTest}
        currentUser={currentUser}
        onSubmitExam={handleSubmitExam}
        onExitExam={handleExitExam}
      />
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Top Main Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={() => handleOpenAuth("login")}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        examInProgress={false}
      />

      {/* Primary Layout Container: Sidebar + Content Area */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Left Navigational Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          userRole={currentUser?.role || "student"}
          completedTestsCount={resultsHistory.length}
        />

        {/* Dynamic Center View Panel */}
        <main className="flex-1 min-w-0">
          {examStartError && (
            <div className="mb-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between">
              <span>{examStartError}</span>
              <button
                onClick={() => setExamStartError(null)}
                className="px-2 py-1 rounded bg-rose-200 hover:bg-rose-300 text-rose-900 font-bold text-[11px]"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <StudentDashboard
              currentUser={currentUser}
              tests={tests}
              results={resultsHistory}
              onStartTest={handleStartExam}
              onViewResult={handleInspectResult}
              onExploreSubjects={() => setActiveView("subjects")}
              onExploreTests={() => setActiveView("tests")}
              onViewLeaderboard={() => setActiveView("leaderboard")}
            />
          )}

          {/* 14 Subject Catalog View */}
          {activeView === "subjects" && (
            <SubjectCatalog
              subjects={subjects}
              onSelectSubject={handleSelectSubjectFromCatalog}
              onStartTest={handleStartExam}
              startingTestId={startingTestId}
            />
          )}

          {/* Test Papers List View (70+ tests with search/filter) */}
          {activeView === "tests" && (
            <TestList
              tests={tests}
              subjects={subjects}
              selectedSubjectId={selectedSubjectId}
              onSelectSubject={setSelectedSubjectId}
              onStartTest={handleStartExam}
              startingTestId={startingTestId}
            />
          )}

          {/* Test Results & Detailed Solutions View */}
          {activeView === "result" && activeResult && (
            <ResultView
              result={activeResult}
              onRetake={handleStartExam}
              onExploreTests={() => setActiveView("tests")}
              onViewAnalytics={() => setActiveView("analytics")}
            />
          )}

          {/* Test History Log View */}
          {activeView === "history" && (
            <HistoryView
              results={resultsHistory}
              onViewResult={handleInspectResult}
              onRetake={handleStartExam}
              onExploreTests={() => setActiveView("tests")}
            />
          )}

          {/* Progress Analytics View */}
          {activeView === "analytics" && (
            <AnalyticsView
              results={resultsHistory}
              onTakeTest={() => setActiveView("tests")}
            />
          )}

          {/* Global Leaderboard View */}
          {activeView === "leaderboard" && (
            <LeaderboardView
              leaderboard={leaderboard}
              currentUserId={currentUser?.id}
            />
          )}

          {/* Candidate Profile View */}
          {activeView === "profile" && (
            <ProfileView
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {/* Admin Control Center View */}
          {activeView === "admin" && (
            <AdminDashboard
              subjects={subjects}
              tests={tests}
              onRefreshData={fetchAppData}
              onInspectResult={handleInspectResult}
            />
          )}
        </main>
      </div>

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />
    </div>
  );
};
export default App;
