import React, { useState, useMemo } from "react";
import {
  Search,
  Clock,
  CheckCircle2,
  Play,
  BookOpen,
  ArrowLeft,
  AlertCircle,
  Loader2,
  FileText,
  X,
  Award,
} from "lucide-react";
export const TestList = ({
  tests,
  subjects,
  selectedSubjectId,
  onSelectSubject,
  onStartTest,
  startingTestId,
}) => {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [activeTabSubject, setActiveTabSubject] = useState(
    selectedSubjectId || "All",
  );
  const [previewTest, setPreviewTest] = useState(null);
  React.useEffect(() => {
    if (selectedSubjectId) {
      setActiveTabSubject(selectedSubjectId);
    }
  }, [selectedSubjectId]);
  const currentSubject = subjects.find((s) => s.id === activeTabSubject);
  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      const matchesSubject =
        activeTabSubject === "All" || t.subjectId === activeTabSubject;
      const matchesDifficulty =
        difficultyFilter === "All" || t.difficulty === difficultyFilter;
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.subjectName.toLowerCase().includes(search.toLowerCase());
      return (
        matchesSubject && matchesDifficulty && matchesSearch && t.isPublished
      );
    });
  }, [tests, activeTabSubject, difficultyFilter, search]);
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {activeTabSubject !== "All" && currentSubject && (
            <button
              onClick={() => {
                setActiveTabSubject("All");
                onSelectSubject(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all test papers
            </button>
          )}
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {currentSubject
              ? `${currentSubject.name} \u2014 Mock Test Papers`
              : "All Practice & Mock Test Papers"}
          </h1>
          <p className="text-xs text-slate-700 mt-1">
            {currentSubject
              ? `Select from ${filteredTests.length} curated mock test papers with varying difficulty, timers, and questions.`
              : "Browse over 70+ subject-wise timed mock tests with automated question palette, negative marking, and instant solutions."}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search test paper title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Subject dropdown selector */}
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">Subject:</span>
          <select
            value={activeTabSubject}
            onChange={(e) => {
              setActiveTabSubject(e.target.value);
              onSelectSubject(e.target.value === "All" ? null : e.target.value);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All 14 Subjects ({tests.length} tests)</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({tests.filter((t) => t.subjectId === s.id).length}{" "}
                papers)
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Pill Filters */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-700 mr-1">
            Difficulty:
          </span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${difficultyFilter === diff ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Test Papers Cards List */}
      {filteredTests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-800">
            No mock tests found matching criteria
          </p>
          <p className="text-xs text-slate-700 mt-1">
            Try selecting a different subject or clearing your search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTests.map((test) => {
            const isHard = test.difficulty === "Hard";
            const isMedium = test.difficulty === "Medium";
            return (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {test.subjectName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${isHard ? "bg-rose-50 text-rose-700" : isMedium ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}
                    >
                      {test.difficulty}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-700 mt-2 line-clamp-2 leading-relaxed">
                    {test.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] mb-4 bg-slate-50 p-2 rounded-xl">
                    <div>
                      <span className="block text-slate-700 text-[10px]">
                        Questions
                      </span>
                      <strong className="text-slate-800 font-extrabold">
                        {test.questionCount} MCQs
                      </strong>
                    </div>
                    <div>
                      <span className="block text-slate-700 text-[10px]">
                        Duration
                      </span>
                      <strong className="text-slate-800 font-extrabold">
                        {test.durationMinutes} Mins
                      </strong>
                    </div>
                    <div>
                      <span className="block text-slate-700 text-[10px]">
                        Total Marks
                      </span>
                      <strong className="text-slate-800 font-extrabold">
                        {test.totalMarks}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewTest(test)}
                      className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer py-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Blueprint</span>
                    </button>

                    <button
                      id={`start-test-${test.id}`}
                      onClick={() => onStartTest(test.id)}
                      disabled={startingTestId === test.id}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs shadow-indigo-100 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {startingTestId === test.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Take Exam</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Test Blueprint & Question Outline Modal */}
      {previewTest && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {previewTest.subjectName} • {previewTest.difficulty}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {previewTest.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewTest(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {previewTest.description}
            </p>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Exam Blueprint & Marking Scheme
              </h4>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>{previewTest.questionCount}</strong> Multiple Choice
                    Questions
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    <strong>{previewTest.durationMinutes}</strong> Minutes Timed
                    Exam
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>+4 Marks</strong> per correct answer
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    <strong>-1 Mark</strong> negative marking
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold text-slate-800">
                Exam Instructions:
              </h4>
              <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4">
                <li>
                  Questions can be navigated freely using the interactive
                  Question Palette.
                </li>
                <li>
                  Mark questions for review if you want to revisit them before
                  final submission.
                </li>
                <li>
                  Auto-submit initiates automatically when the countdown timer
                  hits 00:00.
                </li>
                <li>
                  Instant scorecard, solution keys, and performance breakdown
                  provided immediately after submission.
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setPreviewTest(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = previewTest.id;
                  setPreviewTest(null);
                  onStartTest(id);
                }}
                disabled={startingTestId === previewTest.id}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs shadow-indigo-100 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {startingTestId === previewTest.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading Exam...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Test Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
