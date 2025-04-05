// Focus point definition
export interface FocusPoint {
  x: number;        // Horizontal position as percentage (0-100)
  y: number;        // Vertical position as percentage (0-100)
  scale: number;    // Zoom level (e.g., 1.0 = 100%, 2.0 = 200%)
  duration: number; // Seconds to stay on this point
  description?: string; // Optional caption
}

// Comic page definition
export interface ComicPage {
  id: number;           // Unique identifier for the page
  imageUrl: string;     // URL to the image
  focusPoints: FocusPoint[]; // Array of focus points for this page
  title?: string;       // Optional title for the page
}

// Comic data definition
export interface ComicData {
  title: string;        // Comic title
  description: string;  // Comic description
  pages: ComicPage[];   // Array of pages
}

// App context types
export interface AppContextType {
  isOffline: boolean;
  setIsOffline: (value: boolean) => void;
  hasVisitedPages: number[];
  addVisitedPage: (pageId: number) => void;
  currentPageId: number | null;
  setCurrentPageId: (pageId: number | null) => void;
  currentFocusPointIndex: number;
  setCurrentFocusPointIndex: (index: number) => void;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (value: boolean) => void;
}
