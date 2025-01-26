import { type ClassValue, clsx } from "clsx";
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
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts an ISO timestamp string to a formatted date and time string in Indonesian locale
 * @param timestamp - The ISO 8601 timestamp string to convert
 * @returns A string containing the formatted date and time in "DD Month YYYY - HH:MM AM/PM" format
 * @example
 * timestampToText("2023-10-20T15:30:00Z")
 * // Returns "20 Oktober 2023 - 10:30 PM"
 */
export function timestampToText(timestamp: string) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  })} - ${date.toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
}
