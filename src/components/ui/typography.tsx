import * as React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Tag = "h2", ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-foreground text-center max-w-3xl leading-tight mb-4",
          className,
        )}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";
