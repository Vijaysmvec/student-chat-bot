"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { useEduNovaStore } from "@/lib/store/appState";

export default function LoginPage() {
  const router = useRouter();
  const { updateProfile } = useEduNovaStore();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("Alex Vance");
  const [email, setEmail] = useState("alex.vance@tech.edu");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (mode === "signup") {
        updateProfile({ name, email });
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    }, 600);
  };

  const handleGuestDemo = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#060816] text-slate-100 bg-mesh-grid flex flex-col justify-center items-center p-6 selection:bg-violet-600/40">
      <Link href="/" className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
          EduNova <span className="text-xs px-2 py-0.5 rounded-md bg-violet-500/20 text-cyan-300 border border-violet-500/30">AI</span>
        </span>
      </Link>

      <GlassCard elevated className="w-full max-w-md p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === "signin" ? "Welcome Back" : "Create Student Account"}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === "signin"
              ? "Access your personalized learning companion & placement records"
              : "Start practicing coding, AI, and technical interviews today"}
          </p>
        </div>

        {/* Guest Demo Instant Login CTA */}
        <button
          type="button"
          onClick={handleGuestDemo}
          className="w-full p-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Instant Guest Access (One-Click Demo Mode)</span>
        </button>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex-1 h-px bg-white/[0.08]" />
          <span>OR CONTINUE WITH EMAIL</span>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === "signup" && (
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Alex Vance"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <GradientButton type="submit" loading={loading} className="w-full py-3 mt-2">
            {mode === "signin" ? "Sign In to Dashboard" : "Register Free"}
          </GradientButton>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/[0.08]">
          {mode === "signin" ? (
            <span>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-cyan-400 font-bold hover:underline"
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-cyan-400 font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
