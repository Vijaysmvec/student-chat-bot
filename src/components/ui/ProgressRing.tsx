import React from "react";
import { cn } from "@/lib/utils/cn";

interface ProgressRingProps {
  progress: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  variant?: "violet" | "cyan" | "emerald" | "amber";
  label?: string;
  sublabel?: string;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 110,
  strokeWidth = 9,
  variant = "cyan",
  label,
  sublabel,
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, progress));
  const offset = circumference - (clamped / 100) * circumference;

  const gradientId = `ring-grad-${variant}-${size}`;

  const colors = {
    violet: { from: "#A78BFA", to: "#8B5CF6", glow: "rgba(139, 92, 246, 0.4)" },
    cyan: { from: "#67E8F9", to: "#06B6D4", glow: "rgba(34, 211, 238, 0.4)" },
    emerald: { from: "#6EE7B7", to: "#10B981", glow: "rgba(16, 185, 129, 0.4)" },
    amber: { from: "#FDE047", to: "#F59E0B", glow: "rgba(245, 158, 11, 0.4)" },
  }[variant];

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </linearGradient>
          <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={colors.glow} />
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="rgba(255, 255, 255, 0.08)"
          fill="none"
        />

        {/* Dynamic progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={`url(#${gradientId})`}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter={`url(#glow-${gradientId})`}
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="text-xl font-extrabold tracking-tight text-white font-mono">
          {label ?? `${Math.round(clamped)}%`}
        </span>
        {sublabel && (
          <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
