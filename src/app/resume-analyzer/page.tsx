"use client";

import React, { useState } from "react";
import {
  FileCheck,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Target,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";

export default function ResumeAnalyzerPage() {
  const [targetRole, setTargetRole] = useState<string>("Full-Stack AI Engineer");
  const [resumeText, setResumeText] = useState<string>(
    `Alex Vance\nEmail: alex.vance@tech.edu | GitHub: github.com/alexvance\n\nEDUCATION\nB.Tech in Computer Science & Engineering - GPA: 8.8/10\n\nTECHNICAL SKILLS\nLanguages: Python, TypeScript, JavaScript, C++, SQL\nFrameworks: React, Next.js, Node.js, PyTorch, Tailwind CSS\nTools: Git, Docker, PostgreSQL, Redis, REST APIs\n\nPROJECTS\n1. EduNova AI - Intelligent Student Companion & Placement Assistant\n- Developed full-stack SaaS platform using Next.js App Router, TypeScript, and Google Gemini API.\n- Integrated real-time streaming LLM endpoints with KaTeX math rendering and Monaco-style code sandbox.\n- Designed interactive algorithm visualizers and mock interview simulators with rubric evaluation.\n\n2. High-Throughput Distributed Cache\n- Implemented in-memory key-value store in Python with LRU eviction and thread-safe locks.\n- Optimized memory layout, achieving sub-2ms query response times under high concurrency.`
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetRole }),
      });
      const data = await res.json();
      setAnalysisResult(data.analysis);
    } catch (e: any) {
      console.error("Resume analysis failed:", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AppShell
      title="AI Resume Analyzer & ATS Simulator"
      subtitle="Benchmark your resume against top tech standards and generate project interview questions"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Area (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <GlassCard elevated className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Resume Text & Target Role</h3>
                </div>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-violet-500"
                >
                  <option value="Full-Stack AI Engineer">Full-Stack AI Engineer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Software Engineer">Backend Software Engineer</option>
                  <option value="Data Scientist / ML Engineer">Data Scientist / ML Engineer</option>
                </select>
              </div>

              <textarea
                rows={14}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your plain text resume or project bullets here..."
                className="w-full bg-slate-950/80 border border-white/[0.1] rounded-2xl p-4 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/60 leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  {resumeText.split(/\s+/).filter(Boolean).length} words
                </span>
                <GradientButton
                  onClick={handleAnalyze}
                  loading={isAnalyzing}
                  disabled={!resumeText.trim()}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Run ATS Heuristic Scan
                </GradientButton>
              </div>
            </GlassCard>
          </div>

          {/* Results Area (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {!analysisResult && (
              <GlassCard className="p-8 text-center h-full flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <FileCheck className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white">Ready for ATS Evaluation</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Click "Run ATS Heuristic Scan" to inspect keywords, structure clarity, and generate customized project defense questions.
                </p>
              </GlassCard>
            )}

            {analysisResult && (
              <GlassCard elevated className="p-6 space-y-5 animate-in fade-in zoom-in-95">
                {/* Score Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Resume Compatibility Audit</h3>
                    <span className="text-xs text-slate-400">Targeting {analysisResult.targetRole}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-cyan-400">{analysisResult.overallScore} / 100</div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">ATS Heuristic Score</span>
                  </div>
                </div>

                {/* Skills Detected */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Detected Core Competencies ({analysisResult.detectedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.detectedSkills.map((skill: string, i: number) => (
                      <Badge key={i} variant="cyan" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Recommended Keywords to Add
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.missingKeywords.map((kw: string, i: number) => (
                      <Badge key={i} variant="amber" size="sm">
                        + {kw}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    High-Impact Enhancements
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {analysisResult.improvementRecommendations.map((rec: string, i: number) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>

                {/* Custom Interview Questions based on Projects */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2 text-xs">
                  <div className="font-bold text-violet-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-violet-400" /> Potential Technical Interview Probes:
                  </div>
                  <div className="space-y-1.5 text-slate-200 italic">
                    {analysisResult.customInterviewQuestions.map((q: string, i: number) => (
                      <p key={i}>• {q}</p>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
