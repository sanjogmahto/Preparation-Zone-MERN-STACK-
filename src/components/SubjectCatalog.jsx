import { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Binary,
  Database,
  Terminal,
  Network,
  Boxes,
  FileCode,
  Code,
  Sparkles,
  Calculator,
  Brain,
  Globe,
  Atom,
  Cpu,
  ArrowRight,
  Filter,
  Play,
  Loader2,
} from "lucide-react";
export const SubjectCatalog = ({
  subjects,
  onSelectSubject,
  onStartTest,
  startingTestId,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Core CS",
    "Aptitude",
    "General Studies",
    "Emerging Tech",
  ];
  const getSubjectIcon = (name) => {
    switch (name) {
      case "Quantitative Aptitude":
        return Calculator;
      case "Logical Reasoning":
        return Brain;
      case "Verbal Ability":
        return BookOpen;
      case "General Knowledge (GK)":
        return Globe;
      case "General Science (GS)":
        return Atom;
      case "Computer Fundamentals":
        return Cpu;
      case "Data Structures & Algorithms (DSA)":
        return Binary;
      case "Database Management Systems (DBMS)":
        return Database;
      case "Operating Systems":
        return Terminal;
      case "Computer Networks":
        return Network;
      case "Object Oriented Programming (OOP)":
        return Boxes;
      case "Software Engineering":
        return FileCode;
      case "Web Technology":
        return Code;
      case "AI & Machine Learning":
        return Sparkles;
      default:
        return BookOpen;
    }
  };
  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const matchesCat =
        selectedCategory === "All" || s.category === selectedCategory;
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [subjects, selectedCategory, search]);
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Subject Catalog &amp; Syllabus
          </h1>
          <p className="text-xs text-slate-700 mt-1">
            Choose from 14 comprehensive domains covering B.Tech CSE, GATE
            syllabus, and Competitive Campus Exams.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subjects, topics, codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 mr-0.5" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer ${selectedCategory === cat ? "bg-indigo-600 text-white shadow-xs" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
          >
            {cat}
          </button>
        ))}
        <span className="text-[11px] text-slate-700 font-semibold ml-auto shrink-0 hidden sm:block">
          Showing {filteredSubjects.length} of {subjects.length} subjects
        </span>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((subject) => {
          const IconComponent = getSubjectIcon(subject.name);
          return (
            <div
              key={subject.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {subject.code}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {subject.category}
                    </span>
                  </div>
                </div>

                <h2 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {subject.name}
                </h2>
                <p className="text-xs text-slate-700 mt-2 line-clamp-2 leading-relaxed">
                  {subject.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium">
                  <span>
                    <strong>{subject.testCount || 6}</strong> Mock Papers
                  </span>
                  <span>•</span>
                  <span>
                    <strong>{subject.questionCount || 65}+</strong> MCQs
                  </span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">
                    Instant Evaluation
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    id={`view-tests-${subject.id}`}
                    onClick={() => onSelectSubject(subject.id)}
                    className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer py-1.5"
                  >
                    <span>View All {subject.testCount || 6} Papers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {onStartTest && (
                    <button
                      id={`quick-start-${subject.id}`}
                      onClick={() => onStartTest(`${subject.id}-mock-1`)}
                      disabled={startingTestId === `${subject.id}-mock-1`}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs shadow-indigo-100 cursor-pointer disabled:opacity-50"
                    >
                      {startingTestId === `${subject.id}-mock-1` ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Start Mock Test</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
