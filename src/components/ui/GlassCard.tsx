import React from "react";
import { cn } from "@/lib/utils/cn";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  interactive?: boolean;
  glow?: boolean;
  variant?: "default" | "elevated" | "interactive" | "bento" | "glow-violet" | "glow-cyan";
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  elevated = false,
  interactive = false,
  glow = false,
  variant,
  className,
  children,
  ...props
}) => {
  const isInteractive = interactive || variant === "interactive";
  const isElevated = elevated || variant === "elevated";

  const variantClass = {
    "glow-violet": "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    "glow-cyan": "border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)]",
    bento: "rounded-3xl border-white/[0.09] bg-gradient-to-b from-[#12182E]/90 to-[#0C1224]/90 backdrop-blur-2xl shadow-xl",
    default: "",
    elevated: "",
    interactive: "",
  }[variant || "default"];

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300 relative overflow-hidden",
        isElevated ? "glass-panel-elevated" : "glass-panel",
        isInteractive && "glass-card-interactive cursor-pointer",
        glow && "glow-accent",
        variantClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
