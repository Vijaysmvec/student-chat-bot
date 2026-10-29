"use client";

import React, { useEffect, useState } from "react";
import { Mic, Volume2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface VoiceWaveProps {
  isActive: boolean;
  statusText?: string;
  mode?: "speaking" | "listening" | "idle";
  className?: string;
  barCount?: number;
}

export const VoiceWave: React.FC<VoiceWaveProps> = ({
  isActive,
  statusText,
  mode = "listening",
  className,
  barCount = 18,
}) => {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial randomized heights
    setHeights(Array.from({ length: barCount }, () => 15));

    if (!isActive) return;

    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: barCount }, (_, i) => {
          // Create wave-like harmonic motion with randomized peaks
          const wave = Math.sin(Date.now() / 200 + i * 0.4) * 0.5 + 0.5;
          const noise = Math.random() * 0.5;
          return Math.min(100, Math.max(15, Math.round((wave * 0.7 + noise * 0.3) * 100)));
        })
      );
    }, 80);

    return () => clearInterval(interval);
  }, [isActive, barCount]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center p-6 rounded-2xl glass-panel-elevated overflow-hidden border border-white/[0.08]",
        className
      )}
    >
      {/* Ambient background glow ring */}
      <div
        className={cn(
          "absolute -inset-10 opacity-30 blur-2xl transition-all duration-700 pointer-events-none rounded-full",
          isActive
            ? mode === "speaking"
              ? "bg-gradient-to-r from-cyan-500/40 via-violet-500/40 to-fuchsia-500/40 scale-110"
              : "bg-gradient-to-r from-emerald-500/40 via-cyan-500/40 to-violet-500/40 scale-105"
            : "bg-slate-800/20 scale-95"
        )}
      />

      {/* Central orb with concentric radar rings */}
      <div className="relative mb-5 flex items-center justify-center">
        {isActive && (
          <>
            <span className="absolute w-20 h-20 rounded-full border border-cyan-400/30 animate-ping pointer-events-none" />
            <span className="absolute w-24 h-24 rounded-full border border-violet-500/20 animate-pulse pointer-events-none" />
          </>
        )}
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl relative z-10",
            isActive
              ? mode === "speaking"
                ? "bg-gradient-to-tr from-cyan-500 to-violet-600 text-white shadow-cyan-500/30"
                : "bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 shadow-emerald-500/30"
              : "bg-slate-900 border border-slate-700/60 text-slate-400"
          )}
        >
          {mode === "speaking" ? (
            <Volume2 className={cn("w-6 h-6", isActive && "animate-pulse")} />
          ) : isActive ? (
            <Mic className="w-6 h-6 animate-pulse" />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
        </div>
      </div>

      {/* Dynamic Soundwave Equalizer Bars */}
      <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-sm px-4">
        {heights.map((h, idx) => {
          return (
            <div
              key={idx}
              className="flex-1 max-w-[6px] rounded-full transition-all duration-75"
              style={{
                height: isActive ? `${h}%` : "15%",
                background: isActive
                  ? mode === "speaking"
                    ? `linear-gradient(to top, #8B5CF6, #22D3EE)`
                    : `linear-gradient(to top, #10B981, #22D3EE)`
                  : "rgba(100, 116, 139, 0.25)",
                boxShadow: isActive
                  ? mode === "speaking"
                    ? "0 0 8px rgba(139, 92, 246, 0.4)"
                    : "0 0 8px rgba(34, 211, 238, 0.4)"
                  : "none",
              }}
            />
          );
        })}
      </div>

      {/* Status string */}
      <div className="mt-4 flex items-center gap-2 text-xs font-medium">
        <span
          className={cn(
            "w-2 h-2 rounded-full",
            isActive
              ? mode === "speaking"
                ? "bg-cyan-400 animate-ping"
                : "bg-emerald-400 animate-ping"
              : "bg-slate-600"
          )}
        />
        <span className={isActive ? "text-slate-200" : "text-slate-500"}>
          {statusText ||
            (isActive
              ? mode === "speaking"
                ? "AI Interviewer is speaking..."
                : "Listening to your voice input..."
              : "Voice input is paused. Click to speak.")}
        </span>
      </div>
    </div>
  );
};
