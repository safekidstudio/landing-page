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
    violet: "rounded-xxl",
    magenta: "rounded-xxl",
    orange: "rounded-xxl",
    coral: "rounded-xxl",
  };

  const variants = {
    charcoal:
      "bg-surface-1 border-hairline text-ink hover:border-hairline/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
    violet:
      "bg-gradient-to-br from-surface-2 to-gradient-violet/20 border-gradient-violet/30 text-ink shadow-[0_8px_30px_rgba(106,76,245,0.15)]",
    magenta:
      "bg-gradient-to-br from-surface-2 to-gradient-magenta/20 border-gradient-magenta/30 text-ink shadow-[0_8px_30px_rgba(212,77,240,0.15)]",
    orange:
      "bg-gradient-to-br from-surface-2 to-gradient-orange/20 border-gradient-orange/30 text-ink shadow-[0_8px_30px_rgba(255,122,61,0.15)]",
    coral:
      "bg-gradient-to-br from-surface-2 to-gradient-coral/20 border-gradient-coral/30 text-ink shadow-[0_8px_30px_rgba(255,85,119,0.15)]",
  };

  const combinedClassName = `${baseStyles} ${radii[variant]} ${variants[variant]} ${className}`;

  // Glow color for interactive spotlight
  const glowColors = {
    charcoal: "rgba(255, 255, 255, 0.05)",
    violet: "rgba(106, 76, 245, 0.25)",
    magenta: "rgba(212, 77, 240, 0.25)",
    orange: "rgba(255, 122, 61, 0.25)",
    coral: "rgba(255, 85, 119, 0.25)",
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
