import { useState, useEffect, useRef } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  RotateCcw,
  Send,
  Maximize2,
  Minimize2,
  AlertTriangle,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
export const ExamInterface = ({
  test,
  currentUser,
  onSubmitExam,
  onExitExam,
}) => {
  const questions = test.questions || [];
  const totalQuestions = questions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(
    test.durationMinutes * 60,
  );
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeExpiredModal, setTimeExpiredModal] = useState(false);
  const questionStartTimeRef = useRef(Date.now());
  const timerIntervalRef = useRef(null);
  useEffect(() => {
    const initialMap = {};
    questions.forEach((q, idx) => {
      initialMap[q.id] = {
        questionId: q.id,
        selectedOptionId: null,
        status: idx === 0 ? "not-answered" : "not-visited",
        timeSpentSeconds: 0,
      };
    });
    setUserAnswers(initialMap);
  }, [test]);
  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(timerIntervalRef.current);
  }, []);
  const recordCurrentQuestionTime = () => {
    const currentQ2 = questions[currentIndex];
    if (!currentQ2) return;
    const now = Date.now();
    const elapsed = Math.round((now - questionStartTimeRef.current) / 1e3);
    questionStartTimeRef.current = now;
    setUserAnswers((prev) => {
      const existing = prev[currentQ2.id] || {
        questionId: currentQ2.id,
        selectedOptionId: null,
        status: "not-answered",
        timeSpentSeconds: 0,
      };
      return {
        ...prev,
        [currentQ2.id]: {
          ...existing,
          timeSpentSeconds: existing.timeSpentSeconds + elapsed,
        },
      };
    });
  };
  const handleJumpToQuestion = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= totalQuestions) return;
    recordCurrentQuestionTime();
    const targetQ = questions[targetIndex];
    setUserAnswers((prev) => {
      const existing = prev[targetQ.id];
      if (existing && existing.status === "not-visited") {
        return {
          ...prev,
          [targetQ.id]: {
            ...existing,
            status: "not-answered",
          },
        };
      }
      return prev;
    });
    setCurrentIndex(targetIndex);
  };
  const handleSelectOption = (optionId) => {
    const currentQ2 = questions[currentIndex];
    if (!currentQ2) return;
    setUserAnswers((prev) => {
      const existing = prev[currentQ2.id];
      const isMarked =
        existing?.status === "marked-for-review" ||
        existing?.status === "answered-and-marked";
      return {
        ...prev,
        [currentQ2.id]: {
          questionId: currentQ2.id,
          selectedOptionId: optionId,
          status: isMarked ? "answered-and-marked" : "answered",
          timeSpentSeconds: existing?.timeSpentSeconds || 0,
        },
      };
    });
  };
  const handleClearResponse = () => {
    const currentQ2 = questions[currentIndex];
    if (!currentQ2) return;
    setUserAnswers((prev) => {
      const existing = prev[currentQ2.id];
      const isMarked =
        existing?.status === "marked-for-review" ||
        existing?.status === "answered-and-marked";
      return {
        ...prev,
        [currentQ2.id]: {
          questionId: currentQ2.id,
          selectedOptionId: null,
          status: isMarked ? "marked-for-review" : "not-answered",
          timeSpentSeconds: existing?.timeSpentSeconds || 0,
        },
      };
    });
  };
  const handleMarkForReviewAndNext = () => {
    const currentQ2 = questions[currentIndex];
    if (!currentQ2) return;
    setUserAnswers((prev) => {
      const existing = prev[currentQ2.id];
      const hasAnswer = !!existing?.selectedOptionId;
      return {
        ...prev,
        [currentQ2.id]: {
          questionId: currentQ2.id,
          selectedOptionId: existing?.selectedOptionId || null,
          status: hasAnswer ? "answered-and-marked" : "marked-for-review",
          timeSpentSeconds: existing?.timeSpentSeconds || 0,
        },
      };
    });
    if (currentIndex < totalQuestions - 1) {
      handleJumpToQuestion(currentIndex + 1);
    }
  };
  const handleSaveAndNext = () => {
    recordCurrentQuestionTime();
    if (currentIndex < totalQuestions - 1) {
      handleJumpToQuestion(currentIndex + 1);
    } else {
      setIsSubmitModalOpen(true);
    }
  };
  const handleAutoSubmit = () => {
    setTimeExpiredModal(true);
    setTimeout(() => {
      doFinalSubmit();
    }, 2500);
  };
  const doFinalSubmit = () => {
    recordCurrentQuestionTime();
    clearInterval(timerIntervalRef.current);
    const answersList = Object.values(userAnswers);
    const totalTimeTaken = test.durationMinutes * 60 - remainingSeconds;
    onSubmitExam(answersList, Math.max(1, totalTimeTaken));
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  const answeredCount = Object.values(userAnswers).filter(
    (a) => a.status === "answered",
  ).length;
  const markedCount = Object.values(userAnswers).filter(
    (a) => a.status === "marked-for-review",
  ).length;
  const answeredAndMarkedCount = Object.values(userAnswers).filter(
    (a) => a.status === "answered-and-marked",
  ).length;
  const notAnsweredCount = Object.values(userAnswers).filter(
    (a) => a.status === "not-answered",
  ).length;
  const notVisitedCount = Object.values(userAnswers).filter(
    (a) => a.status === "not-visited",
  ).length;
  const currentQ = questions[currentIndex];
  const currentAnswer = currentQ ? userAnswers[currentQ.id] : null;
  const isUrgentTime = remainingSeconds <= 300;
  const isCriticalTime = remainingSeconds <= 60;
  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-slate-950 z-50 flex flex-col font-sans select-none overflow-hidden transition-colors duration-200">
      {/* Top Exam Navigation Bar */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-black text-sm">
            PZ
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1">
              {test.title}
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Candidate:{" "}
              <strong className="text-slate-700 dark:text-slate-300">
                {currentUser?.name || "Student Candidate"}
              </strong>{" "}
              • Subject:{" "}
              <strong className="text-slate-700 dark:text-slate-300">
                {test.subjectName}
              </strong>
            </p>
          </div>
        </div>

        {/* Center Countdown Timer */}
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-sm font-extrabold transition-all ${isCriticalTime ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 animate-pulse ring-2 ring-rose-300 dark:ring-rose-800" : isUrgentTime ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800" : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"}`}
        >
          <Clock
            className={`w-4 h-4 ${isCriticalTime ? "text-rose-600 dark:text-rose-400" : isUrgentTime ? "text-amber-600 dark:text-amber-400" : "text-slate-600 dark:text-slate-400"}`}
          />
          <span>{formatTime(remainingSeconds)}</span>
          <span className="text-[10px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase">
            Left
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle inside Exam Interface */}
          <ThemeToggle />

          <button
            id="exit-exam-btn"
            onClick={() => setIsExitModalOpen(true)}
            className="px-2.5 sm:px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer flex items-center gap-1 font-semibold transition"
            title="Exit Exam"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Exam</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            id="submit-exam-btn"
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* Main Body: Question Area (Left) + Question Palette (Right) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Active Question Canvas */}
        <main className="flex-1 flex flex-col justify-between overflow-y-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
          {currentQ ? (
            <div className="max-w-4xl mx-auto w-full space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800/40">
                  <span>
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    +{currentQ.marks || 4} Marks
                  </span>
                  <span>•</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">
                    -{currentQ.negativeMarks || 1} Negative
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {currentQ.difficulty}
                  </span>
                </div>
              </div>

              {/* Question Statement */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                  {currentQ.questionText}
                </p>

                {currentQ.codeSnippet && (
                  <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 border border-slate-800 text-xs font-mono overflow-x-auto">
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Select one correct option:
                </p>
                <div className="space-y-2.5">
                  {(Array.isArray(currentQ.options) &&
                  currentQ.options.length > 0
                    ? currentQ.options
                    : [
                        { id: "A", text: "Option A" },
                        { id: "B", text: "Option B" },
                        { id: "C", text: "Option C" },
                        { id: "D", text: "Option D" },
                      ]
                  ).map((opt, optIdx) => {
                    const optionId =
                      typeof opt === "string"
                        ? String.fromCharCode(65 + optIdx)
                        : opt.id || String.fromCharCode(65 + optIdx);
                    const optionText =
                      typeof opt === "string" ? opt : opt.text || String(opt);
                    const isSelected =
                      currentAnswer?.selectedOptionId === optionId;
                    return (
                      <button
                        key={optionId}
                        id={`option-${optionId}`}
                        onClick={() => handleSelectOption(optionId)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${isSelected ? "bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/25 shadow-xs" : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-slate-50/70 dark:hover:bg-slate-800"}`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${isSelected ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"}`}
                          >
                            {optionId}
                          </div>
                          <span
                            className={`text-sm leading-relaxed ${isSelected ? "font-bold text-indigo-950 dark:text-indigo-200" : "text-slate-800 dark:text-slate-200"}`}
                          >
                            {optionText}
                          </span>
                        </div>

                        {/* Radio selection circle */}
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-indigo-600 dark:border-indigo-500 bg-indigo-600 dark:bg-indigo-500" : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"}`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
              <AlertTriangle className="w-12 h-12 text-amber-500" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                No Questions Available in this Mock Test
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm">
                Please return to the Mock Test Catalog to choose another paper.
              </p>
              <button
                onClick={onExitExam}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Back to Tests
              </button>
            </div>
          )}

          {/* Bottom Action Control Bar */}
          <div className="max-w-4xl mx-auto w-full pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                id="btn-mark-review"
                onClick={handleMarkForReviewAndNext}
                className="px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Mark for Review &amp; Next</span>
              </button>

              <button
                id="btn-clear-response"
                onClick={handleClearResponse}
                disabled={!currentAnswer?.selectedOptionId}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-prev-question"
                onClick={() => handleJumpToQuestion(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                id="btn-save-next"
                onClick={handleSaveAndNext}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1 cursor-pointer"
              >
                <span>
                  {currentIndex === totalQuestions - 1 ? "Save" : "Save & Next"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* Right: Question Palette & Live Status */}
        <aside className="w-full lg:w-80 bg-slate-50 dark:bg-slate-925 p-5 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 shrink-0 border-slate-200 dark:border-slate-800 transition-colors">
          <div className="space-y-5">
            {/* Legend Breakdown */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-[11px] shadow-xs">
              <h2 className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2">
                Question Palette Legend
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {answeredCount}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Answered
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {notAnsweredCount}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Not Answered
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {markedCount}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Marked Review
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-600 text-white text-[10px] font-bold relative flex items-center justify-center">
                    {answeredAndMarkedCount}
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5" />
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Ans &amp; Marked
                  </span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <span className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center">
                    {notVisitedCount}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Not Visited
                  </span>
                </div>
              </div>
            </div>

            {/* Question Number Palette Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Select Question:
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Click number to jump
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-64 overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  const state = userAnswers[q.id]?.status || "not-visited";
                  const isCurrent = idx === currentIndex;
                  let bgClass =
                    "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700";
                  if (state === "answered")
                    bgClass = "bg-emerald-600 text-white";
                  else if (state === "not-answered")
                    bgClass = "bg-rose-500 text-white";
                  else if (state === "marked-for-review")
                    bgClass = "bg-purple-600 text-white";
                  else if (state === "answered-and-marked")
                    bgClass =
                      "bg-purple-600 text-white ring-2 ring-emerald-400";
                  return (
                    <button
                      key={q.id}
                      id={`palette-btn-${idx + 1}`}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer relative ${bgClass} ${isCurrent ? "ring-2 ring-indigo-600 dark:ring-indigo-400 ring-offset-2 dark:ring-offset-slate-900 scale-105 shadow-sm" : ""}`}
                    >
                      {idx + 1}
                      {state === "answered-and-marked" && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-0.5 right-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Test Instructions Helper */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Exam Navigation Tips</span>
            </div>
            <p>
              Save responses before final submission. Test automatically submits
              when time expires.
            </p>
          </div>
        </aside>
      </div>

      {/* Manual Submit Confirmation Dialog */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Ready to Submit Exam?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Review your question completion summary before submitting
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
              <div>
                <span className="text-slate-500 dark:text-slate-400">
                  Total Questions:
                </span>
                <strong className="block text-sm font-bold text-slate-900 dark:text-white">
                  {totalQuestions}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">
                  Answered:
                </span>
                <strong className="block text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {answeredCount + answeredAndMarkedCount}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">
                  Unanswered / Skipped:
                </span>
                <strong className="block text-sm font-bold text-rose-600 dark:text-rose-400">
                  {notAnsweredCount + notVisitedCount}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">
                  Marked for Review:
                </span>
                <strong className="block text-sm font-bold text-purple-600 dark:text-purple-400">
                  {markedCount + answeredAndMarkedCount}
                </strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Once submitted, your responses will be evaluated instantly and
              your performance metrics will be calculated.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Continue Exam
              </button>
              <button
                id="confirm-submit-exam-btn"
                onClick={doFinalSubmit}
                className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition cursor-pointer"
              >
                Yes, Final Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Exam Confirmation Modal */}
      {isExitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Exit Mock Exam?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Candidate Session
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to quit this test? Any unsaved progress will
              be discarded and you will be returned to the mock test catalog.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setIsExitModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Cancel &amp; Continue Test
              </button>
              <button
                id="confirm-exit-btn"
                onClick={() => {
                  setIsExitModalOpen(false);
                  clearInterval(timerIntervalRef.current);
                  onExitExam();
                }}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition cursor-pointer"
              >
                Yes, Exit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
