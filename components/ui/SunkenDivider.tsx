"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   SUNKEN DIVIDER — "The Sunken Line"
   Signature design element referenced in the Implementation Plan:

   "a custom SVG section divider where faint ancient column
    silhouettes rise beneath a horizon-line wave as it scrolls
    into view, directly referencing Kekova's Sunken City."

   How it works:
   - The wave path at top is the waterline (Deep Sea fill).
   - Below the waterline: 7 Lycian column silhouettes, each with
     a slightly different height/opacity to look like ruins at
     varying depths.
   - On scroll-enter: columns animate up from y+16 to y=0 with
     staggered delays, fading in from 0 → target opacity.
   - The overall SVG fills the container width (preserveAspectRatio
     none) so it stretches edge-to-edge on any screen.

   fromColor / toColor allow the divider to work between any
   two sections (defaults: Deep Sea → Seaglass).
   ───────────────────────────────────────────────────────────────── */

interface SunkenDividerProps {
  /** Color of the section above (wave fill color) */
  fromColor?: string;
  /** Color of the section below (SVG background) */
  toColor?: string;
  className?: string;
  /** Flip vertically to reuse between light→dark transitions */
  flip?: boolean;
}

/* Column definitions: [x%, baseY%, width, height, opacity] */
const COLUMNS = [
  { x: 8,   baseY: 72, w: 8,  h: 48, opacity: 0.18 },
  { x: 18,  baseY: 68, w: 6,  h: 56, opacity: 0.12 },
  { x: 31,  baseY: 74, w: 10, h: 42, opacity: 0.20 },
  { x: 50,  baseY: 65, w: 7,  h: 62, opacity: 0.15 },
  { x: 63,  baseY: 70, w: 9,  h: 50, opacity: 0.22 },
  { x: 76,  baseY: 73, w: 6,  h: 44, opacity: 0.13 },
  { x: 88,  baseY: 69, w: 8,  h: 54, opacity: 0.17 },
] as const;

/* viewBox dimensions */
const VW = 1440;
const VH = 160;

/* Build a Doric column path (base + shaft + capital) */
function columnPath(xPct: number, yPct: number, w: number, h: number): string {
  const x = (xPct / 100) * VW;
  const y = (yPct / 100) * VH;
  const capH = Math.round(w * 0.6);
  const baseH = Math.round(w * 0.5);

  return [
    // Capital (top)
    `M${x - w * 0.8},${y} h${w * 1.6} v${-capH} h${-w * 1.6}Z`,
    // Shaft
    `M${x - w * 0.45},${y} v${h} h${w * 0.9} v${-h}Z`,
    // Base
    `M${x - w * 0.7},${y + h} h${w * 1.4} v${baseH} h${-w * 1.4}Z`,
  ].join(" ");
}

export function SunkenDivider({
  fromColor = "#0E3A45",
  toColor = "#EFF5F3",
  className,
  flip = false,
}: SunkenDividerProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div
      className={cn("relative w-full overflow-hidden leading-none", className)}
      style={{ backgroundColor: toColor }}
      aria-hidden="true"
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full", flip && "scale-y-[-1]")}
        style={{ display: "block", height: "clamp(80px, 10vw, 140px)" }}
      >
        {/* ── Column silhouettes (below waterline) ── */}
        {COLUMNS.map((col, i) => (
          <motion.path
            key={i}
            d={columnPath(col.x, col.baseY, col.w, col.h)}
            fill={fromColor}
            initial={{ opacity: 0, y: 16 }}
            animate={
              isInView
                ? { opacity: col.opacity, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{
              duration: 0.9,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* ── Waterline wave (fromColor fills above the wave) ── */}
        <motion.path
          d={`
            M0,0
            L0,${VH * 0.52}
            C${VW * 0.1},${VH * 0.38}
             ${VW * 0.2},${VH * 0.68}
             ${VW * 0.35},${VH * 0.5}
            C${VW * 0.48},${VH * 0.34}
             ${VW * 0.55},${VH * 0.65}
             ${VW * 0.68},${VH * 0.48}
            C${VW * 0.8},${VH * 0.32}
             ${VW * 0.9},${VH * 0.62}
             ${VW},${VH * 0.45}
            L${VW},0
            Z
          `}
          fill={fromColor}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
