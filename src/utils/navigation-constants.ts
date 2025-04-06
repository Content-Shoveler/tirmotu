// Constants for timeline and navigation
export const NAVIGATION_CONSTANTS = {
  // Special page indices
  HOME_INDEX: 0,
  SEPARATOR_INDEX: 1,
  COMIC_START_INDEX: 2, // Offset for Home (0) and separator (1)
  
  // Navigation types
  FORWARD: 'forward',
  BACKWARD: 'backward',
  
  // Local storage keys
  AUTOPLAY_STORAGE_KEY: 'comic-autoplay',
  LAST_FOCUS_POINTS_STORAGE_KEY: 'comic-last-focus-points',
  
  // Default navigation options
  DEFAULT_TRANSITION_SPEED: 0.8, // seconds
};

// Type for tracking last viewed focus points per page
export interface LastFocusPoints {
  [pageId: number]: number;
}
