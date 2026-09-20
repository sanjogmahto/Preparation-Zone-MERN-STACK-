import { History, Clock, RotateCcw, ArrowRight, Target } from "lucide-react";
export const HistoryView = ({
  results,
  onViewResult,
  onRetake,
  onExploreTests,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Test History &amp; Solutions Log
          </h1>
          <p className="text-xs text-slate-700 mt-1">
            Complete record of your mock exam submissions with full access to
            question explanations and error analysis.
          </p>
        </div>

        <button
          onClick={onExploreTests}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 self-start cursor-pointer"
        >
          <span>Take New Mock Test</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* History Items */}
      {results.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            No test attempts logged yet
          </h3>
          <p className="text-xs text-slate-700 mt-1 max-w-sm mx-auto">
            Once you take a mock test, your scorecards, question-by-question
            explanations, and time diagnostics will appear here.
          </p>
          <button
            onClick={onExploreTests}
            className="mt-5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
          >
            Start Your First Test
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((res, index) => {
            const minutes = Math.floor(res.timeTakenSeconds / 60);
            const seconds = res.timeTakenSeconds % 60;
            const isPassed = res.percentage >= 40;
            return (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Attempt #{results.length - index}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {res.subjectName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${isPassed ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
                    >
                      {isPassed ? "PASSED" : "NEEDS PRACTICE"}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {res.testTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 pt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Time: {minutes}m {seconds}s
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-slate-400" />
                      Accuracy:{" "}
                      <strong className="text-slate-800">
                        {res.accuracy}%
                      </strong>
                    </span>
                    <span>
                      Date:{" "}
                      {new Date(res.submittedAt).toLocaleDateString(void 0, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {/* Score pill */}
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-700 block">
                      Score
                    </span>
                    <div className="flex items-baseline gap-1">
                      <strong className="text-xl font-black text-slate-900">
                        {res.score}
                      </strong>
                      <span className="text-xs text-slate-700">
                        / {res.totalMarks}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-indigo-600">
                      ({res.percentage}%)
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewResult(res.id)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition cursor-pointer"
                    >
                      View Solutions
                    </button>
                    <button
                      onClick={() => onRetake(res.testId)}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                      title="Retake Exam"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
