import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Clock,
  Target,
  RotateCcw,
  BookOpen,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Award,
  Check,
  X,
} from "lucide-react";
export const ResultView = ({
  result,
  onRetake,
  onExploreTests,
  onViewAnalytics,
}) => {
  const [filterMode, setFilterMode] = useState("all");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const isPassed = result.percentage >= 40;
  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isPassed]);
  const toggleQuestion = (qId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };
  const filteredAnswers = result.answers.filter((ans) => {
    if (filterMode === "correct") return ans.isCorrect;
    if (filterMode === "wrong")
      return !ans.isCorrect && ans.selectedOptionId !== null;
    if (filterMode === "skipped") return ans.selectedOptionId === null;
    return true;
  });
  const minutes = Math.floor(result.timeTakenSeconds / 60);
  const seconds = result.timeTakenSeconds % 60;
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Score Hero Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${isPassed ? "bg-gradient-to-r from-emerald-800 via-indigo-900 to-indigo-950" : "bg-gradient-to-r from-rose-900 via-slate-900 to-slate-950"}`}
      >
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold border border-white/10">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isPassed
                ? "Exam Cleared Successfully"
                : "Practice Assessment Complete"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {result.testTitle}
          </h1>
          <p className="text-xs text-white/80 max-w-lg leading-relaxed">
            Candidate: <strong>{result.userName}</strong> • Subject:{" "}
            <strong>{result.subjectName}</strong> • Submitted:{" "}
            {new Date(result.submittedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Big Score Gauge */}
        <div className="flex flex-col items-center justify-center p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 min-w-[200px]">
          <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
            Final Score
          </span>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-4xl sm:text-5xl font-black text-white">
              {result.score}
            </span>
            <span className="text-sm font-bold text-white/70">
              / {result.totalMarks}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full text-xs font-extrabold bg-white/20 text-white">
            <span>{result.percentage}% Marks</span>
            <span>•</span>
            <span>{isPassed ? "PASS" : "NEEDS REVISION"}</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-700 uppercase">
              Correct Answers
            </span>
            <p className="text-2xl font-extrabold text-slate-900">
              {result.correctCount}
            </p>
            <span className="text-[10px] text-emerald-600 font-bold">
              +{result.correctCount * 4} Marks
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-700 uppercase">
              Wrong Answers
            </span>
            <p className="text-2xl font-extrabold text-slate-900">
              {result.wrongCount}
            </p>
            <span className="text-[10px] text-rose-600 font-bold">
              -{result.wrongCount * 1} Negative
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-700 uppercase">
              Accuracy Rate
            </span>
            <p className="text-2xl font-extrabold text-slate-900">
              {result.accuracy}%
            </p>
            <span className="text-[10px] text-slate-700">
              {result.correctCount + result.wrongCount} Attempted
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-700 uppercase">
              Time Invested
            </span>
            <p className="text-2xl font-extrabold text-slate-900">
              {minutes}m {seconds}s
            </p>
            <span className="text-[10px] text-slate-700">
              {Math.round(
                result.timeTakenSeconds / Math.max(1, result.totalQuestions),
              )}
              s / question
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRetake(result.testId)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake This Mock Test</span>
          </button>
          <button
            onClick={onExploreTests}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Browse More Mock Papers</span>
          </button>
        </div>

        <button
          onClick={onViewAnalytics}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
          <span>View Progress Analytics</span>
        </button>
      </div>

      {/* Question Solutions & Explanations Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Detailed Solutions &amp; Explanations
            </h2>
            <p className="text-xs text-slate-700">
              Review correct choices, concept explanations, and time spent on
              every question.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${filterMode === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              All ({result.answers.length})
            </button>
            <button
              onClick={() => setFilterMode("correct")}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${filterMode === "correct" ? "bg-emerald-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Correct ({result.correctCount})
            </button>
            <button
              onClick={() => setFilterMode("wrong")}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${filterMode === "wrong" ? "bg-rose-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Incorrect ({result.wrongCount})
            </button>
            <button
              onClick={() => setFilterMode("skipped")}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${filterMode === "skipped" ? "bg-amber-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Skipped ({result.skippedCount})
            </button>
          </div>
        </div>

        {/* List of Solutions */}
        <div className="space-y-4">
          {filteredAnswers.map((ans, idx) => {
            const isExpanded = expandedQuestions[ans.questionId] !== false;
            const isSkipped = ans.selectedOptionId === null;
            const isCorrect = ans.isCorrect;
            return (
              <div
                key={ans.questionId}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleQuestion(ans.questionId)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-700 shrink-0">
                      Q{idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-snug">
                        {ans.questionText}
                      </p>
                      <div className="flex items-center gap-3 text-xs mt-1.5 font-medium">
                        {isCorrect ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Correct (+
                            {ans.marksAwarded} Marks)
                          </span>
                        ) : isSkipped ? (
                          <span className="text-amber-600 font-bold flex items-center gap-1">
                            <MinusCircle className="w-3.5 h-3.5" /> Skipped (0
                            Marks)
                          </span>
                        ) : (
                          <span className="text-rose-600 font-bold flex items-center gap-1">
                            <X className="w-3.5 h-3.5" /> Incorrect (
                            {ans.marksAwarded} Marks)
                          </span>
                        )}
                        <span className="text-slate-700">•</span>
                        <span className="text-slate-700">
                          Time: {ans.timeSpentSeconds || 35}s
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="text-slate-400 p-1 hover:text-slate-600">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-4">
                    {/* Options Review */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Answer Options:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ans.options.map((opt) => {
                          const isUserPick = ans.selectedOptionId === opt.id;
                          const isCorrectPick = ans.correctOptionId === opt.id;
                          let optionClass =
                            "bg-white border-slate-200 text-slate-700";
                          if (isCorrectPick) {
                            optionClass =
                              "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400";
                          } else if (isUserPick && !isCorrectPick) {
                            optionClass =
                              "bg-rose-50 border-rose-500 text-rose-950 font-bold ring-1 ring-rose-300";
                          }
                          return (
                            <div
                              key={opt.id}
                              className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${optionClass}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold">
                                  {opt.id}.
                                </span>
                                <span>{opt.text}</span>
                              </div>
                              <div className="shrink-0 flex items-center gap-1">
                                {isCorrectPick && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-extrabold flex items-center gap-0.5">
                                    <Check className="w-3 h-3" /> Correct Key
                                  </span>
                                )}
                                {isUserPick && !isCorrectPick && (
                                  <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[10px] font-extrabold flex items-center gap-0.5">
                                    <X className="w-3 h-3" /> Your Choice
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Educational Explanation Box */}
                    <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                        <Award className="w-4 h-4 text-indigo-600" />
                        <span>Explanation &amp; Conceptual Solution:</span>
                      </div>
                      <p className="text-indigo-950 leading-relaxed font-normal">
                        {ans.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
