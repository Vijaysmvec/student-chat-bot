"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Target,
  Flame,
} from "lucide-react";
import { useEduNovaStore } from "@/lib/store/appState";
import { triggerConfetti } from "@/components/ui/Confetti";

export const ContextPanel: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { profile, tasks, updateTaskStatus } = useEduNovaStore();

  // Mini Pomodoro Timer
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      triggerConfetti();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTaskComplete = (taskId: string) => {
    updateTaskStatus(taskId, "Completed");
    triggerConfetti();
  };

  const highPriorityTasks = tasks.filter((t) => t.status !== "Completed").slice(0, 2);

  if (collapsed) {
    return (
      <div className="hidden xl:flex flex-col items-center py-4 px-2 w-12 border-l border-white/[0.08] bg-[#070B1A]/90">
        <button
          onClick={() => setCollapsed(false)}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-400 hover:text-white transition-colors"
          title="Expand Context Panel"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="mt-8 flex flex-col items-center gap-5 text-slate-400">
          <Clock className="w-4 h-4 text-cyan-400" />
          <Target className="w-4 h-4 text-violet-400" />
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden xl:flex flex-col w-72 shrink-0 border-l border-white/[0.08] bg-[#070B1A]/90 backdrop-blur-2xl p-4 space-y-5 overflow-y-auto shadow-2xl">
      {/* Header with collapse button */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Learning HUD</span>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Collapse Panel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mini Pomodoro Study Timer */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-950/40 via-slate-900/90 to-cyan-950/40 border border-violet-500/30 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
          <span className="flex items-center gap-1.5 font-bold">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Focus Sprint
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono font-bold">
            25m
          </span>
        </div>
        <div className="text-center py-2 text-3xl font-mono font-extrabold text-white tracking-widest drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
          {formatTimer(timeLeft)}
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={() => setTimerActive(!timerActive)}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:brightness-110 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            {timerActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            <span>{timerActive ? "Pause" : "Start"}</span>
          </button>
          <button
            onClick={() => {
              setTimerActive(false);
              setTimeLeft(25 * 60);
            }}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white text-xs transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Weekly Study Goal Progress */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
          <span>Weekly Target</span>
          <span className="text-cyan-400 font-mono font-bold">
            {profile.weeklyHoursLogged} / {profile.weeklyHoursGoal}h
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
            style={{ width: `${Math.min(100, (profile.weeklyHoursLogged / profile.weeklyHoursGoal) * 100)}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400">
          <strong>5.5 hours</strong> needed to hit your weekly engineering benchmark.
        </p>
      </div>

      {/* High-Priority Upcoming Tasks with Instant Completion */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span>Focus Tasks</span>
          <Link href="/study-planner" className="text-[11px] text-cyan-400 hover:underline">
            View All
          </Link>
        </div>

        {highPriorityTasks.map((t) => (
          <div
            key={t.id}
            className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-violet-500/40 transition-all text-xs space-y-1.5 group"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                {t.title}
              </span>
              <button
                onClick={() => handleTaskComplete(t.id)}
                className="text-slate-500 hover:text-emerald-400 transition-colors shrink-0 p-0.5"
                title="Mark completed"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-violet-400 font-medium">{t.subject}</span>
              <span className="text-amber-400">Due {t.dueDate}</span>
            </div>
          </div>
        ))}

        {highPriorityTasks.length === 0 && (
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-500 text-center">
            All priority tasks complete! 🎉
          </div>
        )}
      </div>

      {/* AI Next Recommended Action */}
      <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-2 relative overflow-hidden">
        <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Recommended Next</span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          Based on your target role ({profile.targetRole}), practice **Dynamic Programming** or take a mock Technical Interview today.
        </p>
        <Link
          href="/interviews"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 pt-1 transition-colors"
        >
          Launch Interview Simulator <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
};
