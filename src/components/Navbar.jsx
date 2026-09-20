import { useState } from "react";
import {
  GraduationCap,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Sparkles,
  Clock,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
export const Navbar = ({
  currentUser,
  activeView,
  setActiveView,
  onOpenAuth,
  onLogout,
  onSwitchRole,
  examInProgress,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            id="brand-logo-btn"
            onClick={() => {
              if (!examInProgress) setActiveView("dashboard");
            }}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            disabled={examInProgress}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 dark:shadow-none group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Prep
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Zone
                  </span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 rounded">
                  MOCK EXAM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Online Practice &amp; Assessment Platform
              </p>
            </div>
          </button>
        </div>

        {/* Exam in progress indicator */}
        {examInProgress && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-full animate-pulse">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
              Exam Session Active — Do not close tab
            </span>
          </div>
        )}

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Light / Dark Mode Switcher */}
          <ThemeToggle />

          {currentUser ? (
            <div className="relative">
              <div className="flex items-center gap-2">
                {/* Quick Role Switcher Pill */}
                <button
                  id="role-switcher-btn"
                  onClick={() =>
                    onSwitchRole(
                      currentUser.role === "admin" ? "student" : "admin",
                    )
                  }
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  title="Click to quickly toggle between Student and Admin mode"
                >
                  <ShieldCheck
                    className={`w-3.5 h-3.5 ${currentUser.role === "admin" ? "text-violet-600 dark:text-violet-400" : "text-slate-400 dark:text-slate-500"}`}
                  />
                  <span>
                    Mode:{" "}
                    <strong className="text-indigo-600 dark:text-indigo-400 uppercase">
                      {currentUser.role}
                    </strong>
                  </span>
                </button>

                {/* User Dropdown Trigger */}
                <button
                  id="user-menu-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none cursor-pointer"
                >
                  <img
                    src={
                      currentUser.avatar ||
                      `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}`
                    }
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover bg-slate-100 dark:bg-slate-800"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                      {currentUser.role}
                    </p>
                  </div>
                </button>
              </div>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 text-slate-700 dark:text-slate-300 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveView("profile");
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    Student Profile
                  </button>

                  {currentUser.role === "admin" && (
                    <button
                      onClick={() => {
                        setActiveView("admin");
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      Admin Control Center
                    </button>
                  )}

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                  <button
                    onClick={() => {
                      onSwitchRole(
                        currentUser.role === "admin" ? "student" : "admin",
                      );
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    Switch to{" "}
                    {currentUser.role === "admin"
                      ? "Student View"
                      : "Admin View"}
                  </button>

                  <button
                    onClick={() => {
                      onLogout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="login-register-btn"
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-100 dark:shadow-none transition cursor-pointer"
              >
                Sign In / Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
