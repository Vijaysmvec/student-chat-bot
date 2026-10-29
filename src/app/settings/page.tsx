"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Key,
  ShieldCheck,
  Save,
  Download,
  Trash2,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { useEduNovaStore } from "@/lib/store/appState";

export default function SettingsPage() {
  const { profile, updateProfile, conversations, tasks, quizzes } = useEduNovaStore();

  const [name, setName] = useState(profile.name);
  const [academicYear, setAcademicYear] = useState(profile.academicYear);
  const [institution, setInstitution] = useState(profile.institution);
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  const [targetCompany, setTargetCompany] = useState(profile.targetCompany);
  const [geminiApiKey, setGeminiApiKey] = useState(profile.geminiApiKey || "");
  const [weeklyGoal, setWeeklyGoal] = useState(profile.weeklyHoursGoal);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      academicYear,
      institution,
      targetRole,
      targetCompany,
      geminiApiKey: geminiApiKey.trim(),
      weeklyHoursGoal: Number(weeklyGoal),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const data = {
      profile,
      conversations,
      tasks,
      quizzes,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `edunova-ai-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell
      title="Settings & Personalization"
      subtitle="Manage your academic credentials, target roles, and Google Gemini API integration"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Profile Card */}
          <GlassCard elevated className="p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Student Academic Profile</h3>
                <p className="text-xs text-slate-400">Personalizes all AI tutors and mock interview evaluations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Academic Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">College / University</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target Engineering Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target Dream Company</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Weekly Study Target: {weeklyGoal} Hours</label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={weeklyGoal}
                  onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                  className="w-full accent-violet-500 mt-2"
                />
              </div>
            </div>
          </GlassCard>

          {/* AI Credentials Configuration Card */}
          <GlassCard elevated className="p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google Gemini AI Engine Configuration</h3>
                <p className="text-xs text-slate-400">Configure personal API key or use EduNova's high-fidelity intelligent simulator</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Custom Gemini API Key (Optional)
                </label>
                <input
                  type="password"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  placeholder="AIzaSy... (Leave empty to use server default or smart fallback)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Keys are stored exclusively in your local browser sandbox and never leaked publicly.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-200">AI Service Engine Status:</span>
                  <Badge variant={geminiApiKey ? "cyan" : "emerald"} size="sm">
                    {geminiApiKey ? "Custom Key Active" : "Smart Simulator & Offline Ready"}
                  </Badge>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
            >
              <Download className="w-4 h-4" /> Export All Workspace Data
            </button>

            <div className="flex items-center gap-3">
              {savedSuccess && (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Preferences saved!
                </span>
              )}
              <GradientButton type="submit" icon={<Save className="w-4 h-4" />}>
                Save Changes
              </GradientButton>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
