import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges CSS class names using twMerge and clsx utilities.
 * 
 * @param inputs - An array of class values that can include strings, objects, arrays, or undefined values
 * @returns A string of merged and deduplicated class names
 * 
 * @example
 * ```ts
 * cn('px-2', 'py-1', { 'bg-red': true, 'bg-blue': false })
 * // Returns: "px-2 py-1 bg-red"
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
