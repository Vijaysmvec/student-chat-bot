"use client";

import React from "react";
import {
  LineChart as LineChartIcon,
  Flame,
  Clock,
  Target,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { useEduNovaStore } from "@/lib/store/appState";

const WEEKLY_HOURS_DATA = [
  { day: "Mon", hours: 2.5, goal: 3 },
  { day: "Tue", hours: 3.2, goal: 3 },
  { day: "Wed", hours: 1.8, goal: 3 },
  { day: "Thu", hours: 4.0, goal: 3 },
  { day: "Fri", hours: 2.2, goal: 3 },
  { day: "Sat", hours: 4.8, goal: 4 },
  { day: "Sun", hours: 3.5, goal: 4 },
];

const SUBJECT_MASTERY_DATA = [
  { subject: "DSA", solved: 143, total: 200 },
  { subject: "OS & Memory", solved: 48, total: 60 },
  { subject: "DBMS & SQL", solved: 39, total: 50 },
  { subject: "Networks", solved: 28, total: 40 },
  { subject: "System Design", solved: 22, total: 35 },
  { subject: "AI & ML", solved: 34, total: 45 },
];

const QUIZ_PROGRESSION_DATA = [
  { test: "Test 1", score: 70 },
  { test: "Test 2", score: 75 },
  { test: "Test 3", score: 82 },
  { test: "Test 4", score: 80 },
  { test: "Test 5", score: 90 },
  { test: "Test 6", score: 94 },
];

export default function LearningAnalyticsPage() {
  const { profile } = useEduNovaStore();

  return (
    <AppShell
      title="Learning Analytics & Performance Insights"
      subtitle="Comprehensive data-driven review of study habits, accuracy metrics, and mastery trends"
    >
      <div className="space-y-6">
        {/* Top 4 Key Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-amber-400 fill-amber-400/20" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">{profile.studyStreak} Days</div>
              <div className="text-xs text-slate-400">Current Study Streak</div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">{profile.placementReadiness}%</div>
              <div className="text-xs text-slate-400">Readiness Benchmark</div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">{profile.weeklyHoursLogged}h</div>
              <div className="text-xs text-slate-400">Weekly Study Hours</div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">90%</div>
              <div className="text-xs text-slate-400">Average Quiz Accuracy</div>
            </div>
          </GlassCard>
        </div>

        {/* Charts Row 1: Weekly Hours & Mastery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Hours AreaChart */}
          <GlassCard elevated className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Weekly Focus Time (Hours)</h3>
                <span className="text-xs text-slate-400">Actual vs Daily 3h Benchmark</span>
              </div>
              <Badge variant="cyan" size="sm">
                +18% vs Last Week
              </Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEEKLY_HOURS_DATA}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#8B5CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Subject Mastery BarChart */}
          <GlassCard elevated className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Topic Mastery Progression</h3>
                <span className="text-xs text-slate-400">Total Solved / Target Bank</span>
              </div>
              <Badge variant="violet" size="sm">
                6 Tracks
              </Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SUBJECT_MASTERY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                  />
                  <Bar dataKey="solved" fill="#22D3EE" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Charts Row 2: Assessment Accuracy Progression */}
        <GlassCard elevated className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Assessment Score Trajectory (%)</h3>
              <span className="text-xs text-slate-400">Chronological score progression across quizzes</span>
            </div>
            <Badge variant="emerald" size="sm">
              Steady Growth
            </Badge>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={QUIZ_PROGRESSION_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="test" stroke="#64748b" fontSize={12} />
                <YAxis domain={[50, 100]} stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                />
                <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} dot={{ r: 5, fill: "#10B981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
