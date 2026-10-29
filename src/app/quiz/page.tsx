"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  Layers,
  RotateCw,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Shuffle,
  RotateCcw,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { useEduNovaStore } from "@/lib/store/appState";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const SAMPLE_FLASHCARDS: Flashcard[] = [
  {
    id: "fc-1",
    front: "What are the 4 Coffman conditions required for a Deadlock in Operating Systems?",
    back: "1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait",
    subject: "Operating Systems",
    difficulty: "Medium",
  },
  {
    id: "fc-2",
    front: "What is the Time and Space Complexity of QuickSort in the average and worst case?",
    back: "Average Time: O(N log N), Average Space: O(log N)\nWorst Time: O(N^2) (e.g., already sorted array with naive pivot), Worst Space: O(N)",
    subject: "Algorithms",
    difficulty: "Medium",
  },
  {
    id: "fc-3",
    front: "State the CAP Theorem for distributed data stores.",
    back: "A distributed system can guarantee at most TWO out of three properties simultaneously:\n- Consistency (C)\n- Availability (A)\n- Partition Tolerance (P)",
    subject: "System Design",
    difficulty: "Hard",
  },
  {
    id: "fc-4",
    front: "Why is the Softmax denominator necessary in Scaled Dot-Product Attention?",
    back: "It normalizes raw attention dot-product logit affinities across all tokens into a valid probability distribution that sums strictly to 1 across rows.",
    subject: "Machine Learning",
    difficulty: "Hard",
  },
];

export default function QuizStudioPage() {
  const { recordQuizAttempt } = useEduNovaStore();
  const [activeTab, setActiveTab] = useState<"quiz" | "flashcards">("quiz");

  // Quiz state
  const [topic, setTopic] = useState<string>("Operating Systems & Memory Management");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Flashcard state
  const [cards, setCards] = useState<Flashcard[]>(SAMPLE_FLASHCARDS);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setQuizSubmitted(false);
    setUserAnswers({});
    setCurrentQIndex(0);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, count: 5, difficulty }),
      });
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err: any) {
      console.error("Failed to generate quiz:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const score = calculateScore();
    recordQuizAttempt({
      topic,
      score,
      totalQuestions: questions.length,
      timeSpentSeconds: 180,
    });
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCardIndex(0);
  };

  const currentQ = questions[currentQIndex];
  const activeCard = cards[cardIndex];

  return (
    <AppShell
      title="Quiz & Flashcard Studio"
      subtitle="Generate topic-specific assessments and master high-yield concepts with spaced repetition"
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-700/60 w-fit">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "quiz" ? "bg-violet-600 text-white shadow-md shadow-violet-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle className="w-4 h-4" /> AI Quiz Generator
          </button>
          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "flashcards" ? "bg-violet-600 text-white shadow-md shadow-violet-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" /> 3D Spaced Flashcards
          </button>
        </div>

        {/* Tab 1: Quiz Studio */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            {/* Quiz Setup Controls */}
            {questions.length === 0 && (
              <GlassCard elevated className="p-6 md:p-8 space-y-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Create Customized AI Quiz</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Target any academic subject, technical framework, or placement interview topic
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Quiz Topic or Notes Reference
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Computer Networks, React Hooks, Graph Algorithms..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Difficulty Level
                    </label>
                    <div className="flex gap-3">
                      {(["Easy", "Medium", "Hard"] as const).map((diff) => (
                        <button
                          key={diff}
                          type="button"
                          onClick={() => setDifficulty(diff)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${
                            difficulty === diff
                              ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex justify-end">
                  <GradientButton
                    onClick={handleGenerateQuiz}
                    loading={isGenerating}
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    Generate Quiz
                  </GradientButton>
                </div>
              </GlassCard>
            )}

            {/* Active Quiz Session */}
            {questions.length > 0 && currentQ && (
              <div className="max-w-3xl mx-auto space-y-5">
                {/* Scorecard Banner if Submitted */}
                {quizSubmitted && (
                  <GlassCard elevated className="p-6 flex items-center justify-between border-emerald-500/30 bg-emerald-950/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Quiz Completed!</h3>
                        <p className="text-xs text-slate-300">
                          You scored <strong>{calculateScore()}</strong> / <strong>{questions.length}</strong> (
                          {Math.round((calculateScore() / questions.length) * 100)}% accuracy).
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setQuestions([])}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200"
                    >
                      New Topic
                    </button>
                  </GlassCard>
                )}

                <GlassCard elevated className="p-6 md:p-8 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">{topic}</span>
                    <span className="text-xs font-mono text-slate-400">
                      Question {currentQIndex + 1} of {questions.length}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
                    {currentQ.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5 pt-2">
                    {currentQ.options.map((opt: string, optIdx: number) => {
                      const isSelected = userAnswers[currentQIndex] === optIdx;
                      const isCorrect = quizSubmitted && optIdx === currentQ.correctIndex;
                      const isWrong = quizSubmitted && isSelected && optIdx !== currentQ.correctIndex;

                      let optClass = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-violet-500/50";
                      if (isSelected && !quizSubmitted) optClass = "bg-violet-600/30 border-violet-500 text-white font-semibold";
                      if (isCorrect) optClass = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold";
                      if (isWrong) optClass = "bg-rose-950/40 border-rose-500 text-rose-200 font-bold";

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => setUserAnswers({ ...userAnswers, [currentQIndex]: optIdx })}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs md:text-sm text-left transition-all ${optClass}`}
                        >
                          <span>{opt}</span>
                          {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {isWrong && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submit */}
                  {quizSubmitted && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-white/[0.08] text-xs space-y-1">
                      <div className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                        Pedagogical Explanation:
                      </div>
                      <p className="text-slate-300">{currentQ.explanation}</p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                    <button
                      onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                      disabled={currentQIndex === 0}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-semibold text-slate-400 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    {!quizSubmitted ? (
                      currentQIndex + 1 === questions.length ? (
                        <GradientButton size="sm" onClick={handleSubmitQuiz}>
                          Submit Quiz
                        </GradientButton>
                      ) : (
                        <button
                          onClick={() => setCurrentQIndex(currentQIndex + 1)}
                          className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white"
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
                        disabled={currentQIndex === questions.length - 1}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-semibold text-slate-300 disabled:opacity-40"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 3D Animated Flashcards */}
        {activeTab === "flashcards" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">
                Card {cardIndex + 1} of {cards.length} • {activeCard.subject}
              </span>
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold"
              >
                <Shuffle className="w-3.5 h-3.5" /> Shuffle
              </button>
            </div>

            {/* 3D Flip Card Container */}
            <div
              onClick={handleFlipCard}
              className="perspective-1000 h-80 w-full cursor-pointer select-none group"
            >
              <div
                className={`relative w-full h-full rounded-3xl transition-transform duration-500 transform-style-preserve-3d shadow-2xl border border-white/[0.1] ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden rounded-3xl p-8 bg-gradient-to-br from-[#141A33] via-[#0F172E] to-[#121B35] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan" size="sm">
                      Question (Click to Flip)
                    </Badge>
                    <Badge variant="violet" size="sm">
                      {activeCard.difficulty}
                    </Badge>
                  </div>
                  <div className="text-center py-6">
                    <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                      {activeCard.front}
                    </h3>
                  </div>
                  <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" /> Click anywhere to reveal answer
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-8 bg-gradient-to-br from-[#1A1838] via-[#10142A] to-[#121E36] flex flex-col justify-between border border-violet-500/40">
                  <div className="flex items-center justify-between">
                    <Badge variant="emerald" size="sm">
                      Model Answer
                    </Badge>
                    <span className="text-xs text-slate-400">{activeCard.subject}</span>
                  </div>
                  <div className="py-4 text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {activeCard.back}
                  </div>
                  <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" /> Click to flip back
                  </div>
                </div>
              </div>
            </div>

            {/* Next / Prev Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevCard}
                className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextCard}
                className="p-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
