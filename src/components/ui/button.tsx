"use client";

import { motion } from "framer-motion";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "translucent" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-accent-blue/40 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:opacity-90 active:scale-98 shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
      secondary:
        "bg-surface-1 text-ink border border-hairline hover:bg-surface-2",
      translucent:
        "bg-surface-2/60 backdrop-blur-md text-ink hover:bg-surface-2 border border-hairline-soft",
      icon: "bg-surface-1 text-ink hover:bg-surface-2 border border-hairline rounded-full",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-pill",
      md: "text-sm px-4 py-2 rounded-pill",
      lg: "text-base px-6 py-3 rounded-pill",
      icon: "h-10 w-10 items-center justify-center rounded-full",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={combinedClassName}
        {...(props as any)}
      />
    );
  },
);

Button.displayName = "Button";
