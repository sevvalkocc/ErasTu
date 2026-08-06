import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/* ─────────────────────────────────────────────────────────────────
   CONTAINER COMPONENT
   Single source of truth for max-width and horizontal padding.
   Using this instead of repeating Tailwind classes everywhere means
   one change here updates the full-site layout consistently.

   size variants:
     default → max-w-6xl (1152px) — section content
     wide    → max-w-7xl (1280px) — hero, full-bleed sections
     narrow  → max-w-3xl (768px)  — FAQ, text-heavy content
   ───────────────────────────────────────────────────────────────── */

type ContainerSize = "default" | "wide" | "narrow";

const sizeMap: Record<ContainerSize, string> = {
  default: "max-w-6xl",
  wide:    "max-w-7xl",
  narrow:  "max-w-3xl",
};

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  /** Remove the default horizontal padding (useful inside full-bleed wrappers) */
  flush?: boolean;
}

export function Container({
  size = "default",
  flush = false,
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeMap[size],
        !flush && "px-5 sm:px-8 lg:px-10",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
