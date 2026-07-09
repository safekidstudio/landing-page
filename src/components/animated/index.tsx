"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { type ReactNode, useRef } from "react";

type AnimationType = "fade" | "slide" | "zoom";

type AnimatedProps = {
  children: ReactNode;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
};

const animationVariants: Record<AnimationType, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    hidden: (direction: string) => ({
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      opacity: 0,
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
      opacity: 0,
    }),
  },
  zoom: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
};

// Smooth transition configuration
const smoothTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

export const AnimatedComponent = ({
  children,
  type = "fade",
  duration = 0.6,
  delay = 0,
  direction = "up",
  className,
}: AnimatedProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={animationVariants[type]}
      custom={direction}
      transition={{
        ...smoothTransition,
        duration,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollAnimatedContainer = ({
  children,
  type = "fade",
  duration = 0.5,
  delay = 0,
  direction = "up",
  className,
}: AnimatedProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -50px 0px",
    amount: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit="exit"
      variants={animationVariants[type]}
      custom={direction}
      transition={{
        ...smoothTransition,
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
};
