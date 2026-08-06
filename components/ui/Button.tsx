"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { trackWhatsAppClick } from "@/lib/whatsapp";

/* ─────────────────────────────────────────────────────────────────
   BUTTON COMPONENT
   Polymorphic: renders <button> or <a> depending on props.
   Three variants aligned with the design system:
     primary   → Deep Sea background, white text — main actions
     secondary → transparent, Deep Sea border — secondary actions
     ghost     → no border, lagoon text — subtle / inline links

   Sizes: sm | md (default) | lg
   ───────────────────────────────────────────────────────────────── */

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-deep-sea text-white",
    "hover:bg-lagoon",
    "active:scale-[0.97]",
    "shadow-sm hover:shadow-md",
  ].join(" "),
  secondary: [
    "bg-transparent text-deep-sea",
    "border border-deep-sea/40",
    "hover:border-lagoon hover:text-lagoon",
    "active:scale-[0.97]",
  ].join(" "),
  ghost: [
    "bg-transparent text-lagoon",
    "hover:text-deep-sea",
    "underline-offset-4 hover:underline",
    "active:opacity-70",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

const baseStyles = [
  "inline-flex items-center justify-center",
  "font-body font-semibold",
  "rounded-md",
  "transition-all duration-[250ms] ease-[var(--ease-out-expo)]",
  "cursor-pointer select-none",
  "focus-visible:outline-2 focus-visible:outline-lagoon focus-visible:outline-offset-3",
  "whitespace-nowrap",
].join(" ");

/* ── Types ──────────────────────────────────────────────────────── */

interface SharedProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton
  extends SharedProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: never;
  external?: never;
}

interface ButtonAsAnchor
  extends SharedProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  href: string;
  /** Set true for external / non-Next.js links (renders plain <a>) */
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/* ── Component ──────────────────────────────────────────────────── */

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  ...rest
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    // External links (WhatsApp, Instagram, etc.)
    if (external) {
      const handleExternalClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href.includes("wa.me")) {
          trackWhatsAppClick(`Button: ${children?.toString() || "WhatsApp"}`);
        }
        if (rest.onClick) {
          (rest.onClick as React.MouseEventHandler<HTMLAnchorElement>)(e);
        }
      };

      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
          onClick={handleExternalClick}
        >
          {children}
        </a>
      );
    }
    // Internal Next.js navigation
    return (
      <Link
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  // Plain button
  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
