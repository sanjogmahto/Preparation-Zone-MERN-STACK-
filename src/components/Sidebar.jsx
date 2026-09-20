import {
  LayoutDashboard,
  BookOpen,
  FileText,
  BarChart3,
  Trophy,
  History,
  User,
  ShieldCheck,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
export const Sidebar = ({
  activeView,
  setActiveView,
  userRole,
  completedTestsCount = 0,
}) => {
  const studentNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "subjects", label: "Subject Catalog", icon: BookOpen, badge: "14" },
    { id: "tests", label: "Mock Test Papers", icon: FileText, badge: "70+" },
    { id: "analytics", label: "Performance Analytics", icon: BarChart3 },
    { id: "leaderboard", label: "Global Leaderboard", icon: Trophy },
    {
      id: "history",
      label: "Test History & Review",
      icon: History,
      count: completedTestsCount,
    },
    { id: "profile", label: "My Student Profile", icon: User },
  ];
  return (
    <aside className="w-64 shrink-0 hidden md:block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs transition-colors duration-200 h-fit sticky top-22">
      <div className="space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            Student Learning
          </div>
          <nav className="space-y-1">
            {studentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${isActive ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-100 dark:border-indigo-800/60 shadow-xs" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"}`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== void 0 && item.count > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin Management Section */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase flex items-center justify-between">
            <span>Administration</span>
            {userRole === "admin" && (
              <span className="px-1.5 py-0.5 text-[9px] bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-extrabold rounded">
                ACTIVE
              </span>
            )}
          </div>
          <button
            id="nav-admin"
            onClick={() => setActiveView("admin")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${activeView === "admin" ? "bg-violet-50 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 font-bold border border-violet-200 dark:border-violet-800 shadow-xs" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"}`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck
                className={`w-4 h-4 ${activeView === "admin" ? "text-violet-600 dark:text-violet-400" : "text-slate-400 dark:text-slate-500"}`}
              />
              <span>Admin Control Center</span>
            </div>
          </button>
        </div>

        {/* Theme Mode Toggle Row */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            Appearance
          </div>
          <ThemeToggle variant="switch" />
        </div>
      </div>

      {/* Target Exam Info Widget */}
      <div className="mt-6 p-3.5 bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/40 dark:to-slate-900 rounded-xl border border-indigo-100/80 dark:border-indigo-900/40">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-indigo-950 dark:text-indigo-200 uppercase tracking-wide">
            Exam Target: 2026
          </span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2 font-medium leading-relaxed">
          GATE, Campus Placements &amp; B.Tech CSE Semester Practice
        </p>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full w-2/3" />
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-semibold text-right">
          65% Syllabus Prepared
        </p>
      </div>
    </aside>
  );
};
