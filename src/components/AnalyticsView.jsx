import { TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
export const AnalyticsView = ({ results, onTakeTest }) => {
  const totalAttempts = results.length;
  const overallAvgScore =
    totalAttempts > 0
      ? Math.round(
          results.reduce((acc, r) => acc + r.percentage, 0) / totalAttempts,
        )
      : 80;
  const overallAccuracy =
    totalAttempts > 0
      ? Math.round(
          results.reduce((acc, r) => acc + r.accuracy, 0) / totalAttempts,
        )
      : 85;
  const totalCorrect = results.reduce((acc, r) => acc + r.correctCount, 0);
  const totalWrong = results.reduce((acc, r) => acc + r.wrongCount, 0);
  const totalSkipped = results.reduce((acc, r) => acc + r.skippedCount, 0);
  const subjectAccuracyMap = {};
  results.forEach((r) => {
    if (!subjectAccuracyMap[r.subjectName]) {
      subjectAccuracyMap[r.subjectName] = {
        total: 0,
        scoreSum: 0,
        attempts: 0,
      };
    }
    subjectAccuracyMap[r.subjectName].scoreSum += r.percentage;
    subjectAccuracyMap[r.subjectName].attempts += 1;
  });
  const subjectChartData =
    Object.keys(subjectAccuracyMap).length > 0
      ? Object.keys(subjectAccuracyMap).map((subj) => ({
          subject: subj.length > 14 ? subj.slice(0, 14) + "..." : subj,
          fullName: subj,
          accuracy: Math.round(
            subjectAccuracyMap[subj].scoreSum /
              subjectAccuracyMap[subj].attempts,
          ),
        }))
      : [
          {
            subject: "Quant Aptitude",
            fullName: "Quantitative Aptitude",
            accuracy: 82,
          },
          {
            subject: "Logical Reas.",
            fullName: "Logical Reasoning",
            accuracy: 88,
          },
          {
            subject: "Verbal Ability",
            fullName: "Verbal Ability",
            accuracy: 78,
          },
          {
            subject: "DSA",
            fullName: "Data Structures & Algorithms",
            accuracy: 75,
          },
          {
            subject: "DBMS",
            fullName: "Database Management Systems",
            accuracy: 85,
          },
          {
            subject: "Operating Sys.",
            fullName: "Operating Systems",
            accuracy: 90,
          },
          { subject: "Networks", fullName: "Computer Networks", accuracy: 84 },
          { subject: "Web Tech", fullName: "Web Technology", accuracy: 92 },
        ];
  const timelineData =
    results.length > 0
      ? results
          .slice()
          .reverse()
          .map((r, idx) => ({
            paper: `Test ${idx + 1}`,
            score: r.percentage,
            accuracy: r.accuracy,
          }))
      : [
          { paper: "Test 1", score: 68, accuracy: 72 },
          { paper: "Test 2", score: 74, accuracy: 78 },
          { paper: "Test 3", score: 82, accuracy: 85 },
          { paper: "Test 4", score: 86, accuracy: 89 },
          { paper: "Test 5", score: 90, accuracy: 92 },
        ];
  const pieData = [
    { name: "Correct", value: totalCorrect || 42, color: "#10b981" },
    { name: "Wrong", value: totalWrong || 8, color: "#f43f5e" },
    { name: "Skipped", value: totalSkipped || 5, color: "#f59e0b" },
  ];
  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Progress Analytics
          </h1>
          <p className="text-xs text-slate-700 mt-1">
            Diagnostic analytics, subject accuracy breakdowns, and precision
            tracking across all test attempts.
          </p>
        </div>

        <button
          onClick={onTakeTest}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer self-start"
        >
          Practice Another Test
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-700 uppercase">
            Average Score
          </span>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">
            {overallAvgScore}%
          </p>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +6.5% vs last month
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-700 uppercase">
            Precision &amp; Accuracy
          </span>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">
            {overallAccuracy}%
          </p>
          <span className="text-xs text-indigo-600 font-semibold mt-1 block">
            Top 15th percentile
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-700 uppercase">
            Total Questions Answered
          </span>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">
            {totalCorrect + totalWrong || 50}
          </p>
          <span className="text-xs text-slate-700 mt-1 block">
            Across {totalAttempts || 3} mock exams
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-700 uppercase">
            Time Efficiency
          </span>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">72s</p>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            Optimal pace (&lt; 90s/Q)
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject-Wise Accuracy Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Subject-Wise Performance
            </h2>
            <p className="text-xs text-slate-700">
              Accuracy rate % attained in each subject area
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="subject"
                  stroke="#94a3b8"
                  fontSize={10}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  formatter={(val, name, item) => [
                    `${val}%`,
                    item.payload.fullName,
                  ]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Bar dataKey="accuracy" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Trend Line Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Score &amp; Accuracy Trend
            </h2>
            <p className="text-xs text-slate-700">
              Progression from earlier attempts to latest mock exams
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timelineData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis dataKey="paper" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  formatter={(val) => [`${val}%`]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  name="Score %"
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  name="Accuracy %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strengths & Focus Areas Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Answer Breakdown Donut */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Response Breakdown
            </h2>
            <p className="text-xs text-slate-700">
              Distribution of overall choices
            </p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                  }}
                />
                <Legend verticalAlign="bottom" height={24} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center text-xs font-semibold text-slate-700">
            Total {totalCorrect + totalWrong + totalSkipped || 55} Questions
            Processed
          </div>
        </div>

        {/* Strengths Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Key Strength Areas (&gt; 85%)</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
              <strong className="block text-emerald-900">
                Operating Systems &amp; Concurrency
              </strong>
              <span className="text-emerald-700">
                90% average accuracy. Mastered Deadlocks, Scheduling, and
                Virtual Memory.
              </span>
            </div>
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
              <strong className="block text-emerald-900">
                Logical Reasoning &amp; Puzzles
              </strong>
              <span className="text-emerald-700">
                88% average accuracy. Strong deductive syllogism reasoning
                speed.
              </span>
            </div>
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
              <strong className="block text-emerald-900">
                Web Technology &amp; APIs
              </strong>
              <span className="text-emerald-700">
                92% average accuracy. Flawless grasp of REST, HTTP, and
                JavaScript concepts.
              </span>
            </div>
          </div>
        </div>

        {/* Recommended Focus Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>Recommended Focus Areas</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl">
              <strong className="block text-amber-900">
                Data Structures &amp; Complexity
              </strong>
              <span className="text-amber-700">
                Average accuracy: 75%. Practice more QuickSort edge-cases and
                Dynamic Programming.
              </span>
            </div>
            <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl">
              <strong className="block text-amber-900">
                Negative Marking Reduction
              </strong>
              <span className="text-amber-700">
                Lost marks due to uncertain guesses. Skip ambiguous questions
                when confidence is below 50%.
              </span>
            </div>
            <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl">
              <strong className="block text-amber-900">
                Computer Networks Subnetting
              </strong>
              <span className="text-amber-700">
                Review CIDR notation calculations and TCP congestion window
                threshold rules.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
