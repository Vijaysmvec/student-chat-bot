"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Binary,
  Cpu,
  Briefcase,
  FileCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Terminal,
  Layers,
  Flame,
  Target,
  Clock,
  Play,
  RotateCcw,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeHeroTab, setActiveHeroTab] = useState<"ai" | "visualizer" | "ide" | "interview">("ai");

  // Mini algorithm visualizer inside hero
  const [previewBars, setPreviewBars] = useState<number[]>([35, 75, 20, 90, 50, 65, 80]);
  const [comparingBars, setComparingBars] = useState<number[]>([]);

  const runMiniSort = () => {
    setComparingBars([1, 2]);
    setTimeout(() => {
      setPreviewBars([20, 35, 50, 65, 75, 80, 90]);
      setComparingBars([]);
    }, 500);
  };

  const FAQS = [
    {
      q: "What makes EduNova AI different from general-purpose chatbots?",
      a: "EduNova AI is purpose-built for computer science students and placement candidates. It features 8 distinct pedagogical modes (such as Socratic Tutor and DSA Coach), native LaTeX rendering ($...$ and $$...$$), integrated step-by-step algorithm visualizers, a sandboxed coding playground, and rubric-based mock technical and HR interview rooms.",
    },
    {
      q: "Can I use EduNova AI for free without an API key?",
      a: "Yes! EduNova AI includes an intelligent offline simulation engine that provides high-fidelity responses, algorithm animations, quizzes, and resume audits immediately out of the box. You can also configure your own Google Gemini API key anytime in Settings for live cloud inference.",
    },
    {
      q: "How is the Placement Readiness Index calculated?",
      a: "Your readiness score is calculated transparently from verified completions across 140+ DSA problems, Core Computer Science curriculum (OS, DBMS, Networks, System Design), and mock technical interview evaluations.",
    },
    {
      q: "Is my uploaded resume or student notes data private?",
      a: "Absolutely. All resume parsing and note processing runs client-side or through authenticated server sessions. No data is stored or shared with third parties.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050713] text-slate-100 bg-mesh-grid selection:bg-violet-600/40 relative">
      {/* Top Ambient Glow Spotlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 h-20 bg-[#080D1D]/80 backdrop-blur-2xl border-b border-white/[0.08]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-transform group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              EduNova <span className="text-[10px] px-2 py-0.5 rounded-md bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-cyan-300 border border-violet-500/30 font-mono font-bold">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Next-Gen Workspace</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wide text-slate-300">
          <a href="#features" className="hover:text-cyan-300 transition-colors">Features</a>
          <a href="#preview" className="hover:text-cyan-300 transition-colors">Interactive Demo</a>
          <a href="#faq" className="hover:text-cyan-300 transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
              Sign In
            </button>
          </Link>
          <Link href="/dashboard">
            <GradientButton size="sm" variant="glow" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Open Workspace
            </GradientButton>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-16 pb-20 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-violet-500/30 text-xs font-semibold text-violet-300 shadow-md">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Code Smarter. Learn Faster. Get Hired.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
          Your AI-Powered Journey From Learning to{" "}
          <span className="text-gradient">Landing Your Dream Job</span>.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Master data structures, derive machine learning mathematics, debug code in real-time, and ace technical placement interviews with your personal AI companion.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/dashboard">
            <GradientButton size="lg" variant="glow" icon={<ArrowRight className="w-5 h-5" />}>
              Start Learning Free
            </GradientButton>
          </Link>
          <Link href="/chat">
            <button className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-bold text-sm transition-all hover:scale-105 shadow-md">
              Try AI Companion (8 Modes)
            </button>
          </Link>
        </div>

        {/* Hero Interactive Cockpit Preview */}
        <div id="preview" className="pt-10 max-w-5xl mx-auto">
          <GlassCard elevated className="p-3 md:p-6 rounded-3xl border-white/[0.12] bg-[#0A0F24]/90 shadow-2xl relative overflow-hidden text-left">
            {/* Window bar */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/[0.08] px-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">edunova-ai://workspace</span>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-white/[0.08]">
                <button
                  onClick={() => setActiveHeroTab("ai")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeHeroTab === "ai" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  AI Companion
                </button>
                <button
                  onClick={() => setActiveHeroTab("visualizer")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeHeroTab === "visualizer" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  DSA Visualizer
                </button>
                <button
                  onClick={() => setActiveHeroTab("ide")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeHeroTab === "ide" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Coding Sandbox
                </button>
                <button
                  onClick={() => setActiveHeroTab("interview")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeHeroTab === "interview" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Interview HUD
                </button>
              </div>
            </div>

            {/* Simulated Live Workspace Screen */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-5">
              {/* Tab 1: AI Companion */}
              {activeHeroTab === "ai" && (
                <>
                  <div className="md:col-span-8 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-bold"># Scaled Dot-Product Attention Equation</span>
                      <Badge variant="violet" size="sm">AI/ML Expert Mode</Badge>
                    </div>
                    <div className="text-slate-200 text-sm font-sans bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <MarkdownRenderer content={"$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$"} />
                    </div>
                    <pre className="text-slate-300 text-[11px] bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 leading-relaxed overflow-x-auto">
{`def scaled_dot_product_attention(q, k, v, d_k):
    # Compute attention logits
    logits = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)
    weights = F.softmax(logits, dim=-1)
    return torch.matmul(weights, v)`}
                    </pre>
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <MarkdownRenderer content={"Time Complexity: $\\mathcal{O}(N^2 \\cdot d)$ • Verified Optimal"} />
                    </div>
                  </div>

                  <div className="md:col-span-4 space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/[0.08] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Placement Readiness</span>
                        <div className="text-2xl font-extrabold text-cyan-400 mt-0.5">78%</div>
                        <span className="text-[10px] text-slate-500">Tier 1 Benchmark</span>
                      </div>
                      <ProgressRing progress={78} size={68} strokeWidth={6} variant="cyan" />
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Learning Streak</span>
                      <div className="text-2xl font-extrabold text-amber-400 flex items-center gap-2">
                        <Flame className="w-6 h-6 fill-amber-400" /> 12 Days
                      </div>
                      <p className="text-[11px] text-slate-400">Consistent study momentum</p>
                    </div>
                  </div>
                </>
              )}

              {/* Tab 2: Visualizer */}
              {activeHeroTab === "visualizer" && (
                <div className="md:col-span-12 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Algorithm Visualizer Live Preview</h4>
                      <p className="text-xs text-slate-400">Step-by-step element sorting animations</p>
                    </div>
                    <button
                      onClick={runMiniSort}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Animate Sort
                    </button>
                  </div>

                  <div className="h-44 flex items-end justify-center gap-3 pt-4">
                    {previewBars.map((val, idx) => (
                      <div key={idx} className="flex-1 max-w-[42px] flex flex-col items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-300">{val}</span>
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 ${
                            comparingBars.includes(idx) ? "bg-cyan-400 animate-pulse" : "bg-violet-500"
                          }`}
                          style={{ height: `${val * 1.3}px` }}
                        />
                        <span className="text-[9px] text-slate-500 font-mono">[{idx}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: IDE */}
              {activeHeroTab === "ide" && (
                <div className="md:col-span-12 p-5 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                    <span className="text-cyan-400 font-bold">solution.py (Python 3.12)</span>
                    <Badge variant="emerald" size="sm">Sandbox Ready</Badge>
                  </div>
                  <pre className="text-slate-300 leading-relaxed">
{`def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Output: [0, 1] | Time: O(N) | Space: O(N)`}
                  </pre>
                </div>
              )}

              {/* Tab 4: Interview */}
              {activeHeroTab === "interview" && (
                <div className="md:col-span-12 p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-cyan-300">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-white">AI Technical Evaluator</span>
                    </div>
                    <Badge variant="cyan" size="sm">Score: 86% Strong Pass</Badge>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "Candidate correctly structured latency mitigation using Server-Sent Events (SSE) and backpressure mechanisms."
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 6 Core Feature Bento Grid Section */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="violet" size="sm">
            Comprehensive Engineering Suite
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for Modern Tech Recruiters & Campus Placements
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need from your first line of code to receiving your offer letter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard interactive className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Learning Companion</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Switch seamlessly between 8 pedagogical modes: Socratic Tutor, DSA Coach, Coding Mentor, and Exam Revision with native LaTeX math rendering.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Interactive Coding Playground</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-language code sandbox (Python, JS, C++) with line-by-line AI explanations, automated bug detection, and complexity audits.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Binary className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">DSA Algorithm Visualizer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Watch Bubble Sort, Binary Search, and Graph traversals animate step-by-step with real pointer markers and speed controls.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI & Machine Learning Lab</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive parameter sliders for Linear Regression, Decision Trees, KNN clustering, and Neural Network forward propagation.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Technical & HR Interview Room</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Practice live timed interviews with a virtual AI avatar, Speech-to-Text support, STAR method critiques, and comprehensive scorecards.
            </p>
          </GlassCard>

          <GlassCard interactive className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Resume Analyzer & ATS Audit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scan your resume against target software engineer roles, detect missing technical keywords, and generate custom project defense questions.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 md:px-12 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="cyan" size="sm">
            Answers
          </Badge>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <GlassCard
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="p-5 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-sm font-bold text-white">
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {isOpen && (
                  <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-white/[0.08] leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <GlassCard elevated className="p-10 md:p-14 space-y-6 rounded-3xl border-violet-500/40 bg-gradient-to-r from-violet-950/40 via-[#0B1020] to-cyan-950/40 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Ready to Level Up Your Engineering Career?
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">
            Join thousands of engineering students preparing for top-tier software developer placements with EduNova AI.
          </p>
          <div className="pt-2">
            <Link href="/dashboard">
              <GradientButton size="lg" variant="glow" icon={<Sparkles className="w-5 h-5" />}>
                Launch EduNova AI Now
              </GradientButton>
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-10 px-6 md:px-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="font-bold text-slate-300">EduNova AI</span> — Code Smarter. Learn Faster. Get Hired.
          </div>
          <div className="flex gap-6">
            <Link href="/dashboard" className="hover:text-slate-300">Dashboard</Link>
            <Link href="/chat" className="hover:text-slate-300">AI Companion</Link>
            <Link href="/coding" className="hover:text-slate-300">Coding Lab</Link>
            <Link href="/interviews" className="hover:text-slate-300">Interviews</Link>
            <Link href="/settings" className="hover:text-slate-300">Settings</Link>
          </div>
          <div>© 2026 EduNova AI. Built for next-generation engineers.</div>
        </div>
      </footer>
    </div>
  );
}
