"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Flame,
  Target,
  Sparkles,
  Command,
  X,
  Clock,
  Plus,
} from "lucide-react";
import { useEduNovaStore } from "@/lib/store/appState";

interface TopNavProps {
  onMobileOpen: () => void;
  title?: string;
  subtitle?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ onMobileOpen, title = "Workspace", subtitle }) => {
  const router = useRouter();
  const { profile } = useEduNovaStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
          " • " +
          now.toLocaleDateString([], { month: "short", day: "numeric" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener for Command/Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const SEARCH_ITEMS = [
    { title: "Ask AI Companion", path: "/chat", category: "AI Chat", badge: "8 Modes" },
    { title: "Interactive Coding Playground", path: "/coding", category: "IDE & Execution", badge: "Python/JS/C++" },
    { title: "DSA Algorithm Visualizers", path: "/dsa", category: "Algorithms", badge: "Interactive" },
    { title: "AI & ML Learning Lab", path: "/aiml", category: "Machine Learning", badge: "Visualizer" },
    { title: "Technical Mock Interview", path: "/interviews", category: "Interviews", badge: "Live Avatar" },
    { title: "HR Behavioral Prep (STAR)", path: "/hr-interview", category: "Interviews", badge: "STAR Framework" },
    { title: "Quantitative Aptitude Tests", path: "/aptitude", category: "Placement", badge: "Timed Test" },
    { title: "AI Resume Analyzer & ATS Score", path: "/resume-analyzer", category: "Placement", badge: "ATS Heuristic" },
    { title: "Placement Readiness Checklist", path: "/placement", category: "Placement", badge: "Weighted" },
    { title: "Smart Study Planner & Calendar", path: "/study-planner", category: "Planning", badge: "Pomodoro" },
    { title: "Quiz Studio & Flashcards", path: "/quiz", category: "Assessment", badge: "3D Flip" },
    { title: "Document Intelligence (PDF / Notes)", path: "/documents", category: "Notes", badge: "Citations" },
    { title: "Learning Analytics & Streaks", path: "/analytics", category: "Analytics", badge: "Recharts" },
    { title: "API Keys & Preferences", path: "/settings", category: "Settings", badge: "Gemini Key" },
  ];

  const filteredItems = SEARCH_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-[#080D1D]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-sm">
        {/* Left: Mobile hamburger & breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileOpen}
            className="lg:hidden p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white transition-colors"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base md:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {title}
            </h1>
            {subtitle && <p className="text-[11px] text-slate-400 hidden sm:block">{subtitle}</p>}
          </div>
        </div>

        {/* Center: Global Search Bar trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/60 hover:border-violet-500/50 text-slate-400 hover:text-slate-200 text-xs transition-all w-64 lg:w-80 shadow-inner group"
        >
          <Search className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          <span className="flex-1 text-left truncate">Search anything in EduNova...</span>
          <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg bg-slate-800 text-[10px] text-slate-400 border border-slate-700 font-mono">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>

        {/* Right Action Icons & Readiness pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live time indicator */}
          {timeStr && (
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/60 border border-white/[0.06] text-[11px] font-mono text-slate-400">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>{timeStr}</span>
            </div>
          )}

          {/* Readiness Meter */}
          <Link
            href="/placement"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 transition-all hover:scale-105"
            title="Placement Readiness Index"
          >
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Readiness:</span>
            <span>{profile.placementReadiness}%</span>
          </Link>

          {/* Study Streak */}
          <Link
            href="/analytics"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-all hover:scale-105"
            title="Current Learning Streak"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{profile.studyStreak}d</span>
          </Link>

          {/* Quick New Chat Button */}
          <Link
            href="/chat"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-violet-600/20 hover:scale-105 transition-all"
            title="New AI Chat"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Doubt</span>
          </Link>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl p-4 bg-[#10162B] border border-white/[0.12] shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Activity & Alerts</span>
                  <button onClick={() => setNotificationsOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 mt-3 text-xs">
                  <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-slate-200 space-y-1">
                    <div className="font-semibold text-violet-300 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 12-Day Streak Maintained!
                    </div>
                    <div className="text-slate-400 text-[11px]">Solve 1 DSA question today to reach 13 consecutive days.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-slate-200 space-y-1">
                    <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-cyan-400" /> Target Benchmark: 78%
                    </div>
                    <div className="text-slate-400 text-[11px]">Operating Systems & Dynamic Programming are your top revision priorities.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-[#0F152B] border border-white/[0.15] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-slate-950/60">
              <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Jump to any module, topic visualizer, or interview..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {filteredItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchOpen(false);
                    router.push(item.path);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs hover:bg-violet-600/20 text-slate-200 group transition-all"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Sparkles className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                    <span className="font-semibold group-hover:text-white truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/60">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
              {filteredItems.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500">
                  No matching tools found for "{searchQuery}". Try "DSA", "Interview", or "Python".
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
