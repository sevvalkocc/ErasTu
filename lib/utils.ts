/**
 * Minimal className merger — no external dependency needed.
 * Joins truthy class strings and handles conditional classes cleanly.
 * If the project grows to need complex merge logic (e.g., Tailwind
 * conflict resolution), drop in `clsx` + `tailwind-merge` here.
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}
