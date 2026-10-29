"use client";

import React, { useState } from "react";
import {
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Send,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";

const HR_QUESTIONS = [
  {
    id: "hr-1",
    title: "1. Tell me about yourself",
    prompt: "Tell me about yourself, your technical passions, and what drives you as an engineer.",
    framework: "Present ➔ Past ➔ Future trajectory",
  },
  {
    id: "hr-2",
    title: "2. Team Conflict & Resolution (STAR)",
    prompt: "Describe a situation where you had a strong disagreement with a teammate over technical choices. How did you resolve it?",
    framework: "STAR Method: Situation ➔ Task ➔ Action ➔ Result",
  },
  {
    id: "hr-3",
    title: "3. Handling Critical Failure",
    prompt: "Tell me about a time a project didn't go according to plan or you introduced a bug into production. How did you handle it?",
    framework: "Ownership ➔ Immediate remediation ➔ Root cause analysis ➔ Long-term prevention",
  },
  {
    id: "hr-4",
    title: "4. Why our company?",
    prompt: "Why are you specifically interested in working with our engineering organization?",
    framework: "Company engineering mission + Personal alignment + Unique contribution",
  },
];

export default function HrInterviewPage() {
  const [selectedQ, setSelectedQ] = useState(HR_QUESTIONS[0]);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!candidateAnswer.trim()) return;
    setIsAnalyzing(true);

    // Realistic pedagogical feedback synthesis
    setTimeout(() => {
      setFeedback({
        starScore: 88,
        tone: "Professional, collaborative, and results-oriented",
        strengths: [
          "Demonstrates strong personal accountability and ownership.",
          "Clear timeline flow from technical foundation to measurable outcomes.",
        ],
        improvements: [
          "Include a quantifiable metric in your Result section (e.g. 'boosted throughput by 30%').",
          "Condense introductory backstory to leave more room for the Action and Result phase.",
        ],
        upgradedPhrasing: `\"In my previous semester project, our team faced a bottleneck with query response times. Rather than debating opinions, I benchmarked our database queries using EXPLAIN ANALYZE to produce objective data. We agreed to implement Redis caching, which reduced load times by 45% and delivered our release ahead of schedule.\"`,
      });
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <AppShell
      title="HR & Behavioral Interview Preparation"
      subtitle="Master the STAR method, articulate impact, and elevate your behavioral storytelling"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Behavioral Prompts</span>
            <div className="space-y-2">
              {HR_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQ(q);
                    setCandidateAnswer("");
                    setFeedback(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs font-semibold transition-all ${
                    selectedQ.id === q.id
                      ? "bg-violet-600/30 border-violet-500/50 text-white shadow-lg shadow-violet-500/20"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-slate-100">{q.title}</div>
                  <div className="text-[11px] text-cyan-400 mt-1 font-mono">{q.framework}</div>
                </button>
              ))}
            </div>

            {/* STAR Quick Ref Card */}
            <GlassCard className="p-4 space-y-2 text-xs">
              <span className="font-bold text-violet-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> The STAR Method
              </span>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li><strong className="text-white">Situation:</strong> Set the context and timeline briefly (15%).</li>
                <li><strong className="text-white">Task:</strong> Your specific goal or challenge (15%).</li>
                <li><strong className="text-white">Action:</strong> What <em>you</em> did specifically (50%).</li>
                <li><strong className="text-white">Result:</strong> Quantifiable outcome and key learning (20%).</li>
              </ul>
            </GlassCard>
          </div>

          {/* Active Question & Answer Area (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <GlassCard elevated className="p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" size="sm">
                  {selectedQ.framework}
                </Badge>
                <span className="text-xs text-slate-400">Behavioral Question</span>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                "{selectedQ.prompt}"
              </h2>

              <div className="space-y-3 pt-2">
                <textarea
                  rows={6}
                  value={candidateAnswer}
                  onChange={(e) => setCandidateAnswer(e.target.value)}
                  placeholder="Draft your answer here using the STAR technique (Situation, Task, Action, Result)..."
                  className="w-full bg-slate-950/80 border border-white/[0.1] rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60"
                />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {candidateAnswer.split(/\s+/).filter(Boolean).length} words
                  </span>
                  <GradientButton
                    onClick={handleAnalyze}
                    loading={isAnalyzing}
                    disabled={!candidateAnswer.trim()}
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    Analyze with EduNova AI
                  </GradientButton>
                </div>
              </div>
            </GlassCard>

            {/* AI Feedback Display */}
            {feedback && (
              <GlassCard elevated className="p-6 space-y-5 animate-in fade-in zoom-in-95 border-violet-500/30">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    <h3 className="text-base font-bold text-white">AI Behavioral Critique & Upgrade</h3>
                  </div>
                  <Badge variant="emerald" size="md">
                    STAR Score: {feedback.starScore}%
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                    <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Strong Elements
                    </div>
                    {feedback.strengths.map((s: string, i: number) => (
                      <p key={i} className="text-slate-300">• {s}</p>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> Areas to Refine
                    </div>
                    {feedback.improvements.map((s: string, i: number) => (
                      <p key={i} className="text-slate-300">• {s}</p>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2">
                  <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    ⭐ Upgraded Answer Example:
                  </div>
                  <p className="text-xs md:text-sm text-slate-200 italic leading-relaxed">
                    {feedback.upgradedPhrasing}
                  </p>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
