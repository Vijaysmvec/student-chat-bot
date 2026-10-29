import React from "react";
import { cn } from "@/lib/utils/cn";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glow";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  shimmer?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  shimmer = false,
  icon,
  className,
  children,
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-semibold rounded-xl gap-1.5",
    md: "px-5 py-2.5 text-sm font-semibold rounded-2xl gap-2",
    lg: "px-7 py-3.5 text-base font-bold rounded-2xl gap-2.5 tracking-tight",
  }[size];

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:brightness-110 active:scale-[0.98] border border-white/15",
    glow:
      "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] hover:brightness-110 active:scale-[0.98] border border-white/20",
    secondary:
      "bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 shadow-md active:scale-[0.98]",
    outline:
      "bg-transparent hover:bg-violet-500/10 text-violet-300 hover:text-white border border-violet-500/40 hover:border-violet-500/80 active:scale-[0.98]",
    ghost:
      "bg-transparent hover:bg-slate-800/70 text-slate-300 hover:text-white active:scale-[0.98]",
    danger:
      "bg-rose-600/85 hover:bg-rose-500 text-white border border-rose-500/30 active:scale-[0.98]",
  }[variant];

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden",
        sizeStyles,
        variantStyles,
        shimmer && "animate-shimmer",
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon && <span className="shrink-0 transition-transform group-hover:scale-110">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
