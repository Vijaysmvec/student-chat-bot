"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Play,
  Clock,
  Mic,
  MicOff,
  Send,
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { VoiceWave } from "@/components/ui/VoiceWave";
import { useEduNovaStore } from "@/lib/store/appState";

interface QuestionItem {
  question: string;
  expectedKeywords: string[];
  followUp: string;
}

const ROLE_QUESTIONS: Record<string, QuestionItem[]> = {
  "Full-Stack AI Engineer": [
    {
      question: "How do you mitigate latency in a real-time web application when streaming large language model responses to thousands of concurrent users?",
      expectedKeywords: ["SSE", "Server-Sent Events", "WebSocket", "token streaming", "caching", "backpressure"],
      followUp: "How would you handle network disconnection midway through an AI stream without restarting from scratch?",
    },
    {
      question: "Can you explain the difference between optimistic UI updates and pessimistic state synchronization in React?",
      expectedKeywords: ["rollback", "mutation", "reconciliation", "cache invalidation", "latency"],
      followUp: "What strategies do you employ when an optimistic update fails on the server?",
    },
  ],
  "Software Developer (Backend / DSA)": [
    {
      question: "Suppose you have a database table with 50 million rows and a query is taking 8 seconds. How do you systematically diagnose and optimize it?",
      expectedKeywords: ["EXPLAIN", "indexing", "B-tree", "composite index", "caching", "partitioning"],
      followUp: "When can adding an index actually degrade database performance?",
    },
    {
      question: "Explain the ACID properties in relational databases and provide an example of where eventual consistency is preferred.",
      expectedKeywords: ["Atomicity", "Consistency", "Isolation", "Durability", "CAP theorem", "distributed systems"],
      followUp: "How do distributed databases prevent split-brain scenarios?",
    },
  ],
};

export default function TechnicalInterviewPage() {
  const { profile } = useEduNovaStore();
  const [inSession, setInSession] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("Full-Stack AI Engineer");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");

  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [answerText, setAnswerText] = useState<string>("");
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);

  // Active question set
  const currentQuestions = ROLE_QUESTIONS[selectedRole] || ROLE_QUESTIONS["Full-Stack AI Engineer"];
  const currentQ = currentQuestions[questionIdx] || currentQuestions[0];

  useEffect(() => {
    let timer: any = null;
    if (inSession) {
      timer = setInterval(() => setSecondsElapsed((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [inSession]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartInterview = () => {
    setInSession(true);
    setQuestionIdx(0);
    setSecondsElapsed(0);
    setHistory([]);
    setAnswerText("");
    setShowReport(false);
  };

  const handleSubmitAnswer = () => {
    if (!answerText.trim()) return;

    const newHistory = [...history, { q: currentQ.question, a: answerText.trim() }];
    setHistory(newHistory);
    setAnswerText("");

    if (questionIdx + 1 < currentQuestions.length) {
      setQuestionIdx(questionIdx + 1);
    } else {
      setInSession(false);
      setShowReport(true);
    }
  };

  return (
    <AppShell
      title="Technical Mock Interview Simulator"
      subtitle="Practice live coding and system design interviews with EduNova AI's rubric evaluation"
      showContextPanel={!inSession}
    >
      <div className="space-y-6">
        {!inSession && !showReport && (
          <GlassCard elevated className="p-6 md:p-8 space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Configure Your Interview Session</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  AI will evaluate your technical precision, trade-off analysis, and communication clarity
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Target Technical Role
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(ROLE_QUESTIONS).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                        selectedRole === role
                          ? "bg-violet-600/30 border-violet-500/60 text-white shadow-lg shadow-violet-500/20"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Difficulty Benchmark
                </label>
                <div className="flex gap-3">
                  {(["Beginner", "Intermediate", "Advanced"] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${
                        selectedDifficulty === diff
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/20"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-slate-400">Duration: ~15-20 Minutes • Rubric Evaluation Included</span>
              <GradientButton onClick={handleStartInterview} icon={<Play className="w-4 h-4 fill-current" />}>
                Start Live Interview
              </GradientButton>
            </div>
          </GlassCard>
        )}

        {/* Live Interview Room */}
        {inSession && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header bar */}
            <div className="flex items-center justify-between p-4 rounded-2xl glass-panel">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Technical Evaluator</h3>
                  <span className="text-xs text-slate-400">{selectedRole} • Question {questionIdx + 1} of {currentQuestions.length}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-cyan-400 text-xs font-mono font-bold border border-slate-800">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(secondsElapsed)}</span>
                </div>
                <button
                  onClick={() => {
                    setInSession(false);
                    setShowReport(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-semibold border border-rose-500/30 transition-colors"
                >
                  Conclude Interview
                </button>
              </div>
            </div>

            {/* Question Display Card */}
            <GlassCard elevated className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="violet" size="sm">
                  Question {questionIdx + 1}
                </Badge>
                <span className="text-xs text-slate-400">Take your time to structure your response</span>
              </div>

              <p className="text-base md:text-lg font-semibold text-white leading-relaxed">
                "{currentQ.question}"
              </p>

              {/* Response input */}
              <div className="space-y-3 pt-3">
                <textarea
                  rows={5}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="State your approach, assumptions, trade-offs, and optimal technical solution..."
                  className="w-full bg-slate-950/80 border border-white/[0.1] rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60"
                />

                {isListening && (
                  <div className="space-y-2">
                    <VoiceWave
                      isActive={true}
                      mode="listening"
                      statusText="Real-time speech detection active • Transcribing spoken words..."
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setAnswerText((prev) =>
                            prev
                              ? prev + " We can optimize this by adding a composite index on (user_id, created_at) and utilizing Redis caching for frequent reads."
                              : "To address this bottleneck, I would run EXPLAIN ANALYZE on the query to inspect the query execution plan. If there is a sequential scan, I would create a B-tree index on the filtered foreign keys and introduce Redis caching to offload 90% of read traffic."
                          );
                        }}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-mono cursor-pointer"
                      >
                        + Insert voice transcription sample
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsListening(!isListening)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isListening
                        ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                        : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isListening ? "Listening..." : "Speak Answer"}</span>
                  </button>

                  <GradientButton
                    onClick={handleSubmitAnswer}
                    disabled={!answerText.trim()}
                    icon={<Send className="w-4 h-4" />}
                  >
                    {questionIdx + 1 === currentQuestions.length ? "Submit & View Report" : "Next Question"}
                  </GradientButton>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Evaluation Scorecard */}
        {showReport && (
          <GlassCard elevated className="p-6 md:p-8 space-y-6 max-w-3xl mx-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Interview Evaluation Report</h2>
                  <span className="text-xs text-slate-400">Completed in {formatTime(secondsElapsed)} • {selectedRole}</span>
                </div>
              </div>
              <Badge variant="emerald" size="md">
                Strong Pass
              </Badge>
            </div>

            {/* Score Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl font-extrabold text-cyan-400">86%</div>
                <div className="text-xs text-slate-400 mt-0.5">Technical Accuracy</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl font-extrabold text-violet-400">82%</div>
                <div className="text-xs text-slate-400 mt-0.5">Communication & Trade-offs</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center col-span-2 md:col-span-1">
                <div className="text-2xl font-extrabold text-emerald-400">84 / 100</div>
                <div className="text-xs text-slate-400 mt-0.5">Overall Readiness</div>
              </div>
            </div>

            {/* Feedback Breakdown */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Strong Performance Highlights
                </div>
                <ul className="text-slate-300 space-y-1 list-disc list-inside">
                  <li>Structured explanations with explicit consideration of concurrency and latency bottlenecks.</li>
                  <li>Mentioned industry-standard terminology correctly without hesitation.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Recommended Revisions
                </div>
                <ul className="text-slate-300 space-y-1 list-disc list-inside">
                  <li>Quantify benchmarks when possible (e.g. "reduced memory overhead from O(N) to O(1)").</li>
                  <li>Explicitly address edge cases before finalizing the architectural decision.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={handleStartInterview}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Practice Another Role
              </button>
              <GradientButton onClick={() => setShowReport(false)}>
                Return to Dashboard
              </GradientButton>
            </div>
          </GlassCard>
        )}
      </div>
    </AppShell>
  );
}
