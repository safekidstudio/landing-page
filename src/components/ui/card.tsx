"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "charcoal" | "violet" | "magenta" | "orange" | "coral";
  hoverEffect?: boolean;
}

export function Card({
  className = "",
  variant = "charcoal",
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const baseStyles =
    "relative overflow-hidden border transition-all duration-300";

  const radii = {
    charcoal: "rounded-xl",
    violet: "rounded-2xl",
    magenta: "rounded-2xl",
    orange: "rounded-2xl",
    coral: "rounded-2xl",
  };

  const variants = {
    charcoal:
      "bg-card border-border text-card-foreground hover:border-border/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
    violet:
      "bg-gradient-to-br from-card to-violet-500/10 border-violet-500/20 text-card-foreground shadow-[0_8px_30px_rgba(139,92,246,0.08)]",
    magenta:
      "bg-gradient-to-br from-card to-fuchsia-500/10 border-fuchsia-500/20 text-card-foreground shadow-[0_8px_30px_rgba(217,70,239,0.08)]",
    orange:
      "bg-gradient-to-br from-card to-orange-500/10 border-orange-500/20 text-card-foreground shadow-[0_8px_30px_rgba(249,115,22,0.08)]",
    coral:
      "bg-gradient-to-br from-card to-rose-500/10 border-rose-500/20 text-card-foreground shadow-[0_8px_30px_rgba(244,63,94,0.08)]",
  };

  const combinedClassName = `${baseStyles} ${radii[variant]} ${variants[variant]} ${className}`;

  // Glow color for interactive spotlight
  const glowColors = {
    charcoal: "rgba(120, 120, 120, 0.05)",
    violet: "rgba(139, 92, 246, 0.15)",
    magenta: "rgba(217, 70, 239, 0.15)",
    orange: "rgba(249, 115, 22, 0.15)",
    coral: "rgba(244, 63, 94, 0.15)",
  };

  const backgroundGlow = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      ${glowColors[variant]},
      transparent 80%
    )
  `;

  return (
    <div onMouseMove={handleMouseMove} className={combinedClassName} {...props}>
      {hoverEffect && (
        <motion.div
          className={`pointer-events-none absolute -inset-px ${radii[variant]} opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen`}
          style={{
            background: backgroundGlow,
          }}
          // Parent must have "group" class to trigger this
        />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
