import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
export const ThemeToggle = ({
  variant = "icon",
  className = "",
  showLabel = false,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();
  if (variant === "switch") {
    return (
      <button
        id="theme-toggle-switch-btn"
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${isDark ? "bg-slate-800 text-slate-200 hover:bg-slate-750" : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"} ${className}`}
      >
        <div className="flex items-center gap-2.5">
          {isDark ? (
            <Moon className="w-4 h-4 text-indigo-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
          <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
        </div>

        {/* Tactile pill switch track */}
        <div
          className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${isDark ? "bg-indigo-600" : "bg-slate-300"}`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 flex items-center justify-center ${isDark ? "translate-x-4" : "translate-x-0"}`}
          >
            {isDark ? (
              <Moon className="w-2.5 h-2.5 text-indigo-700" />
            ) : (
              <Sun className="w-2.5 h-2.5 text-amber-500" />
            )}
          </div>
        </div>
      </button>
    );
  }
  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative p-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus:outline-hidden ${isDark ? "bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700/80 shadow-xs" : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80"} ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-slate-600 transition-transform duration-200 -rotate-12 hover:rotate-0" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold select-none pr-1">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
};
