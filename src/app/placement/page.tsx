"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Target,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  Calendar,
  Building2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { CORE_CS_SYLLABUS, CoreCSTopic } from "@/lib/data/mockData";
import { useEduNovaStore } from "@/lib/store/appState";

export default function PlacementDashboardPage() {
  const { profile } = useEduNovaStore();
  const [syllabus, setSyllabus] = useState<CoreCSTopic[]>(CORE_CS_SYLLABUS);

  const toggleTopic = (subjectId: string, topicName: string) => {
    setSyllabus((prev) =>
      prev.map((sub) => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          topics: sub.topics.map((t) => (t.name === topicName ? { ...t, completed: !t.completed } : t)),
        };
      })
    );
  };

  const totalTopics = syllabus.reduce((acc, sub) => acc + sub.topics.length, 0);
  const completedTopics = syllabus.reduce(
    (acc, sub) => acc + sub.topics.filter((t) => t.completed).length,
    0
  );
  const coreCsPercentage = Math.round((completedTopics / totalTopics) * 100);

  return (
    <AppShell
      title="Placement Preparation Dashboard"
      subtitle="Track your campus placement and off-campus recruitment readiness index"
    >
      <div className="space-y-6">
        {/* Top Readiness Hero Banner */}
        <div className="rounded-3xl p-6 md:p-8 border border-white/[0.1] bg-gradient-to-r from-violet-950/40 via-slate-900 to-cyan-950/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <Badge variant="cyan" size="sm">
                Target: {profile.targetCompany} • {profile.targetRole}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Placement Readiness Index: <span className="text-cyan-400">{profile.placementReadiness}%</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-300 max-w-xl">
                Calculated transparently across your DSA completions (45%), Core CS topics ({coreCsPercentage}%), mock interviews (86%), and aptitude tests (90%).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link href="/interviews">
                <GradientButton variant="primary" icon={<Target className="w-4 h-4" />}>
                  Take Mock Interview
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Major Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider">DSA & Problem Solving</span>
              <span className="text-cyan-400 font-bold">143 / 200</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: "71%" }} />
            </div>
            <span className="text-[11px] text-slate-400">Medium & Hard difficulty focus recommended.</span>
          </GlassCard>

          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider">Core CS Foundations</span>
              <span className="text-violet-400 font-bold">{completedTopics} / {totalTopics} Topics</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-violet-400 rounded-full" style={{ width: `${coreCsPercentage}%` }} />
            </div>
            <span className="text-[11px] text-slate-400">OS, DBMS, Computer Networks & System Design.</span>
          </GlassCard>

          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider">Interview Soft Skills</span>
              <span className="text-emerald-400 font-bold">84% Strong Pass</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: "84%" }} />
            </div>
            <span className="text-[11px] text-slate-400">Technical and behavioral mock evaluations.</span>
          </GlassCard>
        </div>

        {/* Core CS Interactive Checklist Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight">Core Computer Science Syllabus Checklist</h3>
            <span className="text-xs text-slate-400">Click circle to mark topic reviewed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {syllabus.map((subject) => (
              <GlassCard key={subject.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>{subject.subject}</span>
                  </h4>
                  <span className="text-xs font-semibold text-slate-400">
                    {subject.topics.filter((t) => t.completed).length}/{subject.topics.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {subject.topics.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleTopic(subject.id, t.name)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900/80 cursor-pointer transition-colors text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        {t.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0" />
                        )}
                        <span className={t.completed ? "line-through text-slate-500" : "text-slate-200"}>
                          {t.name}
                        </span>
                      </div>
                      {t.important && (
                        <Badge variant="rose" size="sm">
                          High Yield
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
