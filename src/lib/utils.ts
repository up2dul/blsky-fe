import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Generates a formatted timestamp string combining date and time in Indonesian locale.
 * The date format includes the full weekday name, numeric year, full month name, and 2-digit day,
 * followed by the local time representation.
 *
 * @returns {string} A string containing the formatted date and time
 * @example
 * // Returns something like: "25 September 2023 - 10:30 PM"
 */
export function generateTimestamp(): string {
  return (
    new Date().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }) +
    " - " +
    new Date().toLocaleTimeString("id-ID", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );
}
