"use client";

import React, { useState, useEffect } from "react";
import {
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Award,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { SAMPLE_APTITUDE_QUESTIONS, AptitudeQuestion } from "@/lib/data/mockData";

export default function AptitudeCenterPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes

  const filteredQuestions = categoryFilter === "All"
    ? SAMPLE_APTITUDE_QUESTIONS
    : SAMPLE_APTITUDE_QUESTIONS.filter((q) => q.category === categoryFilter);

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];

  useEffect(() => {
    let timer: any = null;
    if (!isSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx });
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setTimeLeft(600);
  };

  return (
    <AppShell
      title="Aptitude & Reasoning Assessment Center"
      subtitle="Practice verified quantitative, logical, and verbal questions with deterministic solutions"
    >
      <div className="space-y-6">
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <div className="flex items-center gap-2">
              {["All", "Quantitative", "Logical", "Verbal"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategoryFilter(cat);
                    setCurrentIdx(0);
                    setSelectedAnswers({});
                    setIsSubmitted(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    categoryFilter === cat
                      ? "bg-violet-600 text-white shadow-md"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono font-bold text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            {!isSubmitted ? (
              <GradientButton
                size="sm"
                onClick={() => setIsSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
              >
                Submit Assessment
              </GradientButton>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retry Test
              </button>
            )}
          </div>
        </div>

        {/* Scorecard Banner when submitted */}
        {isSubmitted && (
          <GlassCard elevated className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-emerald-500/30 bg-emerald-950/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Assessment Submitted!</h3>
                <p className="text-xs text-slate-300">
                  You scored <strong>{calculateScore()}</strong> out of <strong>{filteredQuestions.length}</strong> questions (
                  {Math.round((calculateScore() / filteredQuestions.length) * 100)}% accuracy).
                </p>
              </div>
            </div>
            <Badge variant="emerald" size="md">
              Verified Score: {Math.round((calculateScore() / filteredQuestions.length) * 100)}%
            </Badge>
          </GlassCard>
        )}

        {/* Question Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <GlassCard elevated className="p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <Badge variant="violet" size="sm">
                  {currentQ.category}
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  Question {currentIdx + 1} of {filteredQuestions.length}
                </span>
              </div>

              <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  const isCorrect = isSubmitted && optIdx === currentQ.correctIndex;
                  const isWrong = isSubmitted && isSelected && optIdx !== currentQ.correctIndex;

                  let optClass = "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-violet-500/50";
                  if (isSelected && !isSubmitted) optClass = "bg-violet-600/30 border-violet-500 text-white font-semibold";
                  if (isCorrect) optClass = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold";
                  if (isWrong) optClass = "bg-rose-950/40 border-rose-500 text-rose-200 font-bold";

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs md:text-sm text-left transition-all ${optClass}`}
                    >
                      <span>{opt}</span>
                      {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {isWrong && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Visible after submit) */}
              {isSubmitted && (
                <div className="p-4 rounded-xl bg-slate-950 border border-white/[0.08] text-xs space-y-1">
                  <div className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                    Step-by-step Mathematical Solution:
                  </div>
                  <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-semibold text-slate-400 disabled:opacity-40 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={() => setCurrentIdx(Math.min(filteredQuestions.length - 1, currentIdx + 1))}
                  disabled={currentIdx === filteredQuestions.length - 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-semibold text-slate-400 disabled:opacity-40 hover:text-white"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Question Palette (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <GlassCard className="p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Question Palette
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {filteredQuestions.map((_, idx) => {
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isCurrent = currentIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-9 rounded-xl font-mono text-xs font-bold transition-all ${
                        isCurrent
                          ? "ring-2 ring-violet-400 bg-violet-600 text-white"
                          : isAnswered
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/[0.08] text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span>Answered: {Object.keys(selectedAnswers).length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span>Unanswered: {filteredQuestions.length - Object.keys(selectedAnswers).length}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
