"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Target,
  Code2,
  Clock,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { useEduNovaStore } from "@/lib/store/appState";

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, updateProfile } = useEduNovaStore();

  const [step, setStep] = useState(1);
  const [academicYear, setAcademicYear] = useState(profile.academicYear || "3rd Year B.Tech");
  const [major, setMajor] = useState(profile.major || "Computer Science & Engineering");
  const [institution, setInstitution] = useState(profile.institution || "Apex Institute of Technology");
  const [targetRole, setTargetRole] = useState(profile.targetRole || "Full-Stack AI Engineer");
  const [targetCompany, setTargetCompany] = useState(profile.targetCompany || "Google / OpenAI");
  const [preferredLanguage, setPreferredLanguage] = useState(profile.preferredLanguage || "Python");
  const [weeklyHoursGoal, setWeeklyHoursGoal] = useState(profile.weeklyHoursGoal || 20);

  const handleFinish = () => {
    updateProfile({
      academicYear,
      major,
      institution,
      targetRole,
      targetCompany,
      preferredLanguage,
      weeklyHoursGoal,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#060816] text-slate-100 bg-mesh-grid flex flex-col justify-center items-center p-6 selection:bg-violet-600/40">
      <div className="w-full max-w-xl space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>Student Onboarding</span>
          <span className="text-cyan-400">Step {step} of 3</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <GlassCard elevated className="p-6 md:p-8 space-y-6">
          {/* Step 1: Academic Profile */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Your Academic Background</h2>
                  <p className="text-xs text-slate-400">Helps customize explanation depths and curriculum pace</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Academic Year</label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="1st Year B.Tech">1st Year Engineering</option>
                    <option value="2nd Year B.Tech">2nd Year Engineering</option>
                    <option value="3rd Year B.Tech">3rd Year Engineering</option>
                    <option value="4th Year / Final Year">4th / Final Year Engineering</option>
                    <option value="Self-Taught / Bootcamp">Self-Taught Developer / Bootcamp</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Major / Branch</label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">College / Institute</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Target Career */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Your Placement & Career Goals</h2>
                  <p className="text-xs text-slate-400">Sets benchmarks for mock interviews and DSA challenges</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Target Engineering Role</label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Full-Stack AI Engineer">Full-Stack AI Engineer</option>
                    <option value="Frontend Specialist (React/Next)">Frontend Specialist (React/Next)</option>
                    <option value="Backend Software Engineer">Backend Software Engineer</option>
                    <option value="Data Scientist / ML Engineer">Data Scientist / ML Engineer</option>
                    <option value="Systems / DevOps Engineer">Systems / DevOps Engineer</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Target Dream Company</label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="e.g. Google, Microsoft, Atlassian, Anthropic..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Study Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Learning Preferences & Schedule</h2>
                  <p className="text-xs text-slate-400">Configures daily tasks and timer targets</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Primary Programming Language</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Python", "JavaScript / TS", "C++", "Java", "Go", "Rust"].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setPreferredLanguage(lang)}
                        className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                          preferredLanguage === lang
                            ? "bg-violet-600/30 border-violet-500 text-white"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Weekly Study Goal Target:</span>
                    <span className="font-bold text-cyan-400">{weeklyHoursGoal} Hours / Week</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="1"
                    value={weeklyHoursGoal}
                    onChange={(e) => setWeeklyHoursGoal(Number(e.target.value))}
                    className="w-full accent-cyan-400 mt-1 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Skip for now
              </button>
            )}

            {step < 3 ? (
              <GradientButton
                type="button"
                size="sm"
                onClick={() => setStep(step + 1)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </GradientButton>
            ) : (
              <GradientButton
                type="button"
                size="sm"
                onClick={handleFinish}
                icon={<Sparkles className="w-4 h-4" />}
              >
                Launch Workspace
              </GradientButton>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
