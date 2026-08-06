import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   SECTION HEADING
   Renders a consistent heading block used across all page sections.

   Structure:
     [eyebrow]   — small ALL-CAPS label in lagoon color (optional)
     <h2>        — main section title in Fraunces display font
     [subtitle]  — supporting paragraph in Work Sans (optional)

   align: "left" (default) | "center"
   ───────────────────────────────────────────────────────────────── */

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Override h2 with a different heading level (e.g. h3 for nested sections) */
  as?: "h2" | "h3";
  className?: string;
  /** Optional id for aria-labelledby on the parent section */
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {/* Eyebrow label */}
      {eyebrow && (
        <p
          className={cn(
            "font-mono text-xs font-medium tracking-widest uppercase",
            "text-lagoon"
          )}
        >
          {eyebrow}
        </p>
      )}

      {/* Main title */}
      <Tag
        id={id}
        className={cn(
          "font-display text-3xl font-semibold leading-tight",
          "sm:text-4xl lg:text-5xl",
          "text-ink"
        )}
      >
        {title}
      </Tag>

      {/* Supporting subtitle */}
      {subtitle && (
        <p
          className={cn(
            "font-body text-base font-light leading-relaxed",
            "text-ink/70",
            "max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
