// Device-specific multipliers for focus point transformations
export const DEVICE_MULTIPLIERS = {
  MOBILE: {
    LANDSCAPE: {
      SCALE: 1,
      X: 0.5,
      Y: 1
    },
    PORTRAIT: {
      SCALE: 0.8,
      X: 2.25,
      Y: 0.6
    }
  },
  // Default values for desktop
  DESKTOP: {
    SCALE: 1,
    X: 1.0,
    Y: 1.0
  }
};
