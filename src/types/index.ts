export interface FocusPoint {
  x: number; // horizontal position (percentage)
  y: number; // vertical position (percentage)
  scale: number; // zoom level
  duration: number; // seconds to stay on this point
  description?: string; // optional caption
}

export interface ComicPage {
  id: number;
  filename: string;
  title?: string; // optional title
  cached: boolean; // track offline availability
  focusPoints: FocusPoint[];
}

export type ThemeMode = "light" | "dark";
