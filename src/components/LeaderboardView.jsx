import { Trophy, Flame } from "lucide-react";
export const LeaderboardView = ({ leaderboard, currentUserId }) => {
  const top3 = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>All-India Mock Exam Rankings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Global Student Leaderboard
        </h1>
        <p className="text-xs text-slate-700">
          Rankings are calibrated based on total points earned, test completion
          consistency, accuracy %, and daily practice streaks.
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
        {/* Rank 2 */}
        {top3[1] && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col items-center text-center order-2 md:order-1 relative">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-extrabold text-sm flex items-center justify-center absolute -top-3.5 shadow-sm">
              2
            </div>
            <img
              src={top3[1].avatar}
              alt={top3[1].name}
              className="w-20 h-20 rounded-full border-4 border-slate-100 shadow-md object-cover my-2"
            />
            <h3 className="font-extrabold text-slate-900 text-base mt-1">
              {top3[1].name}
            </h3>
            <p className="text-xs text-slate-700">{top3[1].college}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 w-full grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-700 text-[10px] block">Points</span>
                <strong className="text-slate-800 font-bold">
                  {top3[1].totalPoints}
                </strong>
              </div>
              <div>
                <span className="text-slate-700 text-[10px] block">
                  Accuracy
                </span>
                <strong className="text-emerald-600 font-bold">
                  {top3[1].accuracy}%
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* Rank 1 - Champion */}
        {top3[0] && (
          <div className="bg-gradient-to-b from-amber-50 via-white to-white rounded-3xl p-7 border-2 border-amber-300 shadow-md flex flex-col items-center text-center order-1 md:order-2 relative -mt-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-white font-black text-sm flex items-center justify-center absolute -top-4 shadow-md">
              1
            </div>
            <div className="relative my-2">
              <img
                src={top3[0].avatar}
                alt={top3[0].name}
                className="w-24 h-24 rounded-full border-4 border-amber-300 shadow-lg object-cover"
              />
              <span className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-1 rounded-full shadow">
                <Trophy className="w-4 h-4 fill-current" />
              </span>
            </div>
            <h3 className="font-black text-slate-900 text-lg mt-1">
              {top3[0].name}
            </h3>
            <p className="text-xs text-amber-800 font-semibold">
              {top3[0].college}
            </p>
            <div className="mt-4 pt-3 border-t border-amber-100 w-full grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-700 text-[10px] block">Points</span>
                <strong className="text-slate-900 font-extrabold">
                  {top3[0].totalPoints}
                </strong>
              </div>
              <div>
                <span className="text-slate-700 text-[10px] block">
                  Accuracy
                </span>
                <strong className="text-emerald-600 font-extrabold">
                  {top3[0].accuracy}%
                </strong>
              </div>
              <div>
                <span className="text-slate-700 text-[10px] block">Streak</span>
                <strong className="text-amber-600 font-extrabold flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 fill-current" />{" "}
                  {top3[0].streakDays}d
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {top3[2] && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col items-center text-center order-3 md:order-3 relative">
            <div className="w-8 h-8 rounded-full bg-amber-700/80 text-white font-extrabold text-sm flex items-center justify-center absolute -top-3.5 shadow-sm">
              3
            </div>
            <img
              src={top3[2].avatar}
              alt={top3[2].name}
              className="w-20 h-20 rounded-full border-4 border-slate-100 shadow-md object-cover my-2"
            />
            <h3 className="font-extrabold text-slate-900 text-base mt-1">
              {top3[2].name}
            </h3>
            <p className="text-xs text-slate-700">{top3[2].college}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 w-full grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-700 text-[10px] block">Points</span>
                <strong className="text-slate-800 font-bold">
                  {top3[2].totalPoints}
                </strong>
              </div>
              <div>
                <span className="text-slate-700 text-[10px] block">
                  Accuracy
                </span>
                <strong className="text-emerald-600 font-bold">
                  {top3[2].accuracy}%
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900">
            Top Competitive Ranks
          </h2>
          <span className="text-xs text-slate-700">Updated in real-time</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-700 uppercase font-bold text-[10px]">
                <th className="py-3 px-4 w-14">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Institute</th>
                <th className="py-3 px-4 text-center">Tests Taken</th>
                <th className="py-3 px-4 text-center">Avg Score</th>
                <th className="py-3 px-4 text-center">Accuracy</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {leaderboard.map((entry) => {
                const isUser = entry.userId === currentUserId;
                return (
                  <tr
                    key={entry.userId}
                    className={`hover:bg-slate-50 transition ${isUser ? "bg-indigo-50/60 font-bold" : ""}`}
                  >
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {entry.rank === 1
                        ? "\u{1F947} 1"
                        : entry.rank === 2
                          ? "\u{1F948} 2"
                          : entry.rank === 3
                            ? "\u{1F949} 3"
                            : `#${entry.rank}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <span className="font-bold text-slate-900">
                          {entry.name}{" "}
                          {isUser && (
                            <span className="text-[10px] text-indigo-600 font-bold">
                              (You)
                            </span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {entry.college}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                      {entry.testsCompleted}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                      {entry.averageScore}%
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-600">
                      {entry.accuracy}%
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-amber-600">
                      <span className="inline-flex items-center gap-0.5">
                        <Flame className="w-3 h-3 fill-current" />{" "}
                        {entry.streakDays}d
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                      {entry.totalPoints}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
