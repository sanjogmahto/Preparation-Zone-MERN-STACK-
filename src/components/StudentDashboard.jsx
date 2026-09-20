import {
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  Trophy,
  Play,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
export const StudentDashboard = ({
  currentUser,
  tests,
  results,
  onStartTest,
  onViewResult,
  onExploreSubjects,
  onExploreTests,
  onViewLeaderboard,
}) => {
  const totalTestsTaken = results.length;
  const avgScore =
    totalTestsTaken > 0
      ? Math.round(
          results.reduce((acc, r) => acc + r.percentage, 0) / totalTestsTaken,
        )
      : 80;
  const avgAccuracy =
    totalTestsTaken > 0
      ? Math.round(
          results.reduce((acc, r) => acc + r.accuracy, 0) / totalTestsTaken,
        )
      : 85;
  const totalSeconds = results.reduce((acc, r) => acc + r.timeTakenSeconds, 0);
  const totalHours = (totalSeconds / 3600).toFixed(1);
  const chartData =
    results.length > 0
      ? results.slice(-6).map((r, i) => ({
          name: `Test ${i + 1}`,
          score: r.percentage,
          accuracy: r.accuracy,
          title: r.testTitle.split(":")[0],
        }))
      : [
          { name: "Paper 1", score: 65, accuracy: 72, title: "Quant Aptitude" },
          {
            name: "Paper 2",
            score: 75,
            accuracy: 80,
            title: "Logical Reasoning",
          },
          { name: "Paper 3", score: 82, accuracy: 86, title: "DSA Core" },
          {
            name: "Paper 4",
            score: 88,
            accuracy: 91,
            title: "DBMS Fundamentals",
          },
          {
            name: "Paper 5",
            score: 92,
            accuracy: 94,
            title: "Operating Systems",
          },
        ];
  const featuredTests = tests.slice(0, 4);
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome & Study Target Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white p-6 sm:p-8 shadow-lg shadow-indigo-950/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-indigo-100 border border-white/10">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>Study Streak: 5 Days Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.name || "Candidate"}!
            </h1>
            <p className="text-sm text-indigo-100/90 leading-relaxed">
              Sharpen your aptitude, computer science fundamentals, and
              technical interview skills with real-time timed mock tests and
              instant AI-assisted solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="dash-explore-subjects-btn"
              onClick={onExploreSubjects}
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs hover:bg-indigo-50 shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>Explore 14 Subjects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="dash-explore-all-tests-btn"
              onClick={onExploreTests}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition flex items-center gap-2 cursor-pointer"
            >
              <span>View All 70+ Papers</span>
            </button>
          </div>
        </div>

        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
      </div>

      {/* Key Metrics Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Tests Completed
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {totalTestsTaken}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2 this week
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Average Score
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {avgScore}%
          </p>
          <p className="text-xs text-slate-700 font-medium mt-1">
            Passing benchmark: 40%
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Accuracy Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {avgAccuracy}%
          </p>
          <p className="text-xs text-indigo-600 font-medium mt-1">
            High precision tier
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Practice Time
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {totalHours}h
          </p>
          <p className="text-xs text-slate-700 font-medium mt-1">
            Timed exam practice
          </p>
        </div>
      </div>

      {/* Analytics Graph & High Yield Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score Progression Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Score &amp; Accuracy Progression
              </h2>
              <p className="text-xs text-slate-700">
                Track your performance trajectory across recent mock test papers
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 font-semibold text-indigo-600">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />{" "}
                Score %
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />{" "}
                Accuracy %
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(val) => [`${val}%`]}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#scoreGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#accGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
            <span>
              Overall Score Index:{" "}
              <strong className="text-slate-800">{avgScore}%</strong>
            </span>
            <button
              onClick={onViewLeaderboard}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5" /> View Global Leaderboard
            </button>
          </div>
        </div>

        {/* Quick Recommended Tests */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Recommended For You
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                High-Yield
              </span>
            </div>
            <div className="space-y-3">
              {featuredTests.map((test) => (
                <div
                  key={test.id}
                  className="p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition group"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 line-clamp-1">
                      {test.title}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${test.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700" : test.difficulty === "Medium" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}
                    >
                      {test.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-700">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {test.durationMinutes} mins
                    </span>
                    <span>{test.questionCount} Questions</span>
                    <button
                      onClick={() => onStartTest(test.id)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" /> Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onExploreTests}
            className="w-full mt-4 py-2.5 rounded-xl border border-dashed border-slate-300 text-xs font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 hover:bg-slate-50 transition text-center cursor-pointer"
          >
            Browse All 70+ Subject Tests &rarr;
          </button>
        </div>
      </div>

      {/* Recent Test Submissions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent Test Attempts
            </h2>
            <p className="text-xs text-slate-700">
              Review detailed explanations, mistakes, and correct options
            </p>
          </div>
          {results.length > 0 && (
            <span className="text-xs text-slate-700 font-semibold">
              Showing last {Math.min(results.length, 5)} attempts
            </span>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">
              No mock tests attempted yet
            </p>
            <p className="text-xs text-slate-700 mt-1 max-w-sm mx-auto">
              Select any of the 14 subjects or try one of the recommended papers
              to begin your practice.
            </p>
            <button
              onClick={onExploreSubjects}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 cursor-pointer"
            >
              Start First Mock Test
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="pb-3 font-bold">Mock Test Paper</th>
                  <th className="pb-3 font-bold">Subject</th>
                  <th className="pb-3 font-bold">Score</th>
                  <th className="pb-3 font-bold">Accuracy</th>
                  <th className="pb-3 font-bold">Time Taken</th>
                  <th className="pb-3 font-bold">Attempted Date</th>
                  <th className="pb-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.slice(0, 5).map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 pr-3 font-bold text-slate-900 max-w-xs truncate">
                      {res.testTitle}
                    </td>
                    <td className="py-3.5 pr-3 text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-700">
                        {res.subjectName}
                      </span>
                    </td>
                    <td className="py-3.5 pr-3">
                      <span className="font-extrabold text-slate-900">
                        {res.score}
                      </span>
                      <span className="text-slate-700">
                        {" "}
                        / {res.totalMarks} ({res.percentage}%)
                      </span>
                    </td>
                    <td className="py-3.5 pr-3">
                      <span
                        className={`font-bold ${res.accuracy >= 80 ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {res.accuracy}%
                      </span>
                    </td>
                    <td className="py-3.5 pr-3 text-slate-700">
                      {Math.floor(res.timeTakenSeconds / 60)}m{" "}
                      {res.timeTakenSeconds % 60}s
                    </td>
                    <td className="py-3.5 pr-3 text-slate-700">
                      {new Date(res.submittedAt).toLocaleDateString(void 0, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      <button
                        onClick={() => onViewResult(res.id)}
                        className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] cursor-pointer"
                      >
                        Solutions
                      </button>
                      <button
                        onClick={() => onStartTest(res.testId)}
                        className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] cursor-pointer"
                      >
                        Retake
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
