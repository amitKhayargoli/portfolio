export const ANIMATION_DURATION = {
  micro: 0.2,
  ui: 0.4,
  section: 0.8,
  hero: 1.2,
} as const;

export const SPRING = {
  stiffness: 150,
  damping: 15,
  mass: 0.5,
} as const;

export const MAGNETIC = {
  maxDisplacement: 12,
  maxRotation: 5,
  maxScale: 1.05,
  strength: 0.15,
} as const;

export const BREAKPOINTS = {
  mobile: 390,
  tablet: 768,
  desktop: 1280,
  wide: 1440,
} as const;
