// Centralized Reusable Animation Variants for Framer Motion
// Optimized for performance (transforms & opacity only), 0.3-0.5s ease-out

export const easeOutQuad = [0.21, 0.47, 0.32, 0.98];

// Standard Scroll Reveal Config
export const defaultViewport = {
  once: true,
  margin: "-80px"
};

// Container Stagger for Staggered Children
export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren
    }
  }
});

// Fade Up (20px slide up + fade)
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeOutQuad
    }
  }
};

// Simple Fade
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOutQuad
    }
  }
};

// Card Hover Lift (-4px translateY) & Accent Glow
export const cardHoverProps = {
  whileHover: {
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

// Button Interactions: 1.03 scale hover, 0.97 tap
export const buttonMotionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.15, ease: "easeOut" }
};

// Timeline Item Reveal
export const timelineItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: easeOutQuad
    }
  }
};

