"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Flame,
  Target,
  Clock,
  BookOpen,
  Code2,
  Binary,
  Cpu,
  Briefcase,
  FileCheck,
  CalendarDays,
  HelpCircle,
  FileText,
  CheckCircle,
  TrendingUp,
  Moon,
  Sun,
  Mic,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { triggerConfetti } from "@/components/ui/Confetti";
import { useEduNovaStore } from "@/lib/store/appState";

export default function DashboardPage() {
  const router = useRouter();
  const { profile, tasks, updateTaskStatus, quizzes } = useEduNovaStore();
  const [promptInput, setPromptInput] = useState("");

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    router.push(`/chat?q=${encodeURIComponent(promptInput.trim())}`);
  };

  const handleTaskToggle = (taskId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Completed" ? "Pending" : "Completed";
    updateTaskStatus(taskId, nextStatus);
    if (nextStatus === "Completed") {
      triggerConfetti();
    }
  };

  const SUGGESTION_CHIPS = [
    { label: "Transformer Self-Attention", prompt: "Explain Scaled Dot-Product Attention in Transformers with math and diagrams" },
    { label: "Graph BFS vs DFS", prompt: "Explain the difference between BFS and DFS with time/space complexity and Python code" },
    { label: "Python Decorators", prompt: "How do Python decorators work under the hood? Show clean examples" },
    { label: "Mock Tech Interview", route: "/interviews" },
    { label: "Scan Resume (ATS)", route: "/resume-analyzer" },
    { label: "Binary Search Visualizer", route: "/dsa" },
  ];

  const QUICK_MODULES = [
    {
      title: "AI Companion",
      desc: "8 specialized learning modes with KaTeX math and syntax highlighting",
      href: "/chat",
      icon: Sparkles,
      color: "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400",
    },
    {
      title: "Coding Playground",
      desc: "Multi-language editor, AI debugging & safe code execution",
      href: "/coding",
      icon: Code2,
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400",
    },
    {
      title: "DSA Academy",
      desc: "Step-by-step interactive algorithm visualizers and topic roadmaps",
      href: "/dsa",
      icon: Binary,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    },
    {
      title: "AI & ML Lab",
      desc: "Interactive visualizers for Regression, Decision Trees, KNN & Neural Nets",
      href: "/aiml",
      icon: Cpu,
      color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-400",
    },
    {
      title: "Interview Simulator",
      desc: "AI technical interviewer with rubric-based scorecard & feedback",
      href: "/interviews",
      icon: Briefcase,
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    },
    {
      title: "AI Resume Analyzer",
      desc: "Instant ATS score, missing skills detection & mock interview questions",
      href: "/resume-analyzer",
      icon: FileCheck,
      color: "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400",
    },
  ];

  return (
    <AppShell title="Student Learning Dashboard" subtitle="Welcome back to your personalized AI workspace">
      <div className="space-y-6">
        {/* Futuristic Cockpit Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 border border-white/[0.1] bg-gradient-to-r from-[#131934] via-[#0E152B] to-[#121B35] shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="violet" size="sm">
                  {profile.academicYear}
                </Badge>
                <Badge variant="cyan" size="sm">
                  Target: {profile.targetRole}
                </Badge>
                <Badge variant="emerald" size="sm">
                  Goal: {profile.targetCompany}
                </Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Good evening, <span className="text-gradient">{profile.name}</span>!
                <Moon className="w-5 h-5 text-cyan-300 inline-block animate-pulse-subtle" />
              </h2>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                You have logged <strong>14.5 hours</strong> of study this week and maintained a <strong>{profile.studyStreak}-day streak</strong>! Placement readiness is currently at <strong>78%</strong>.
              </p>
            </div>

            <div className="flex items-center gap-5 shrink-0">
              <div className="hidden sm:block">
                <ProgressRing
                  progress={profile.placementReadiness}
                  size={85}
                  strokeWidth={8}
                  variant="cyan"
                  sublabel="Readiness"
                />
              </div>
              <Link href="/placement">
                <GradientButton variant="primary" icon={<Target className="w-4 h-4" />}>
                  Placement Roadmap
                </GradientButton>
              </Link>
            </div>
          </div>

          {/* Ambient subtle glow blob */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -top-10 w-60 h-60 bg-cyan-500/12 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* AI Command Center Box */}
        <GlassCard elevated className="p-5 md:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">EduNova AI Command Bar</h3>
                <p className="text-xs text-slate-400">Ask any doubt, request code reviews, or generate a tailored study plan</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono">
              <Zap className="w-3 h-3 text-cyan-400" /> Powered by Gemini
            </span>
          </div>

          <form onSubmit={handlePromptSubmit} className="relative">
            <textarea
              rows={2}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handlePromptSubmit(e);
                }
              }}
              placeholder="Ask anything, upload your notes, or tell me what you want to learn..."
              className="w-full rounded-2xl bg-slate-950/80 border border-white/[0.1] px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 resize-none pr-32 transition-all shadow-inner"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <GradientButton type="submit" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Ask AI
              </GradientButton>
            </div>
          </form>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quick Suggestions:</span>
            {SUGGESTION_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (chip.route) router.push(chip.route);
                  else if (chip.prompt) router.push(`/chat?q=${encodeURIComponent(chip.prompt)}`);
                }}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-violet-600/20 text-slate-300 hover:text-cyan-300 border border-white/[0.08] hover:border-violet-500/40 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
              >
                <span>{chip.label}</span>
                <ArrowRight className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>
        </GlassCard>

        {/* 4 Stat Cockpit Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Flame className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">{profile.studyStreak} Days</div>
              <div className="text-xs text-slate-400">Current Study Streak</div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">{profile.placementReadiness}%</div>
              <div className="text-xs text-slate-400">Placement Benchmark</div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <Clock className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">{profile.weeklyHoursLogged}h</div>
              <div className="text-xs text-slate-400">Weekly Focus Hours</div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">90%</div>
              <div className="text-xs text-slate-400">Avg Quiz Accuracy</div>
            </div>
          </GlassCard>
        </div>

        {/* Primary Learning Modules Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight">Core Learning Platforms</h3>
            <span className="text-xs text-slate-400">Select a tool to begin</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_MODULES.map((m, idx) => {
              const Icon = m.icon;
              return (
                <Link key={idx} href={m.href}>
                  <GlassCard interactive className="p-5 h-full flex flex-col justify-between group">
                    <div className="space-y-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} border flex items-center justify-center transition-transform group-hover:scale-110 shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                          <span>{m.title}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Active Study Tasks & Recent Quizzes Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks */}
          <GlassCard className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-bold text-white">Today's Academic Tasks</h3>
              </div>
              <Link href="/study-planner" className="text-xs text-cyan-400 hover:underline">
                Open Planner
              </Link>
            </div>

            <div className="space-y-2.5">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all text-xs"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleTaskToggle(task.id, task.status)}
                      className={`mt-0.5 rounded-md p-0.5 transition-colors ${
                        task.status === "Completed" ? "text-emerald-400" : "text-slate-600 hover:text-slate-400"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <div>
                      <div className={`font-semibold ${task.status === "Completed" ? "line-through text-slate-500" : "text-slate-200"}`}>
                        {task.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span className="text-violet-400 font-medium">{task.subject}</span>
                        <span>•</span>
                        <span className="text-amber-400">Due {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={task.priority === "High" ? "rose" : task.priority === "Medium" ? "amber" : "neutral"} size="sm">
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recent Quizzes */}
          <GlassCard className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Recent Assessments</h3>
              </div>
              <Link href="/quiz" className="text-xs text-cyan-400 hover:underline">
                Create Quiz
              </Link>
            </div>

            <div className="space-y-2.5">
              {quizzes.map((q) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-200">{q.topic}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Completed on {q.date} • {Math.round(q.timeSpentSeconds / 60)} mins
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {q.score} / {q.totalQuestions}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono">{Math.round((q.score / q.totalQuestions) * 100)}% accuracy</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
