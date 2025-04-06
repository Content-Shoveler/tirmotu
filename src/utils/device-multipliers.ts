// Device-specific multipliers for focus point transformations
export const DEVICE_MULTIPLIERS = {
  MOBILE: {
    LANDSCAPE: {
      SCALE: 0.9,
      X: 1.0, // Default, no change needed
      Y: 1.0,  // Default, no change needed
      CENTER_OFFSET_X: 0, // No horizontal offset (percentage points)
      CENTER_OFFSET_Y: 0  // 5% downward offset for vertical center
    },
    PORTRAIT: {
      SCALE: 0.7,
      X: 2,
      Y: 0.6,
      CENTER_OFFSET_X: 0, // No horizontal offset (percentage points)
      CENTER_OFFSET_Y: -5 // 10% downward offset for vertical center in portrait mode
    }
  },
  // Default values for desktop
  DESKTOP: {
    SCALE: 1.0,
    X: 1.0,
    Y: 1.0,
    CENTER_OFFSET_X: 0, // No horizontal offset (percentage points)
    CENTER_OFFSET_Y: 0  // No vertical offset (percentage points)
  }
};
