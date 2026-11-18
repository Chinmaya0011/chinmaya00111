// Centralized Reusable Animation Variants for Framer Motion & GSAP
// Optimized for performance (transforms & opacity only), 0.25-0.5s ease-out

export const easeOutQuad = [0.21, 0.47, 0.32, 0.98];
export const easeOutExpo = [0.16, 1, 0.3, 1];

// Standard Scroll Reveal Config
export const defaultViewport = {
  once: true,
  margin: "-60px"
};

// Container Stagger for Children
export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0.04) => ({
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
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutExpo
    }
  }
};

// Subtle Fade
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOutExpo
    }
  }
};

// Scale in
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: easeOutExpo
    }
  }
};

// Card Hover Lift (-4px translateY) & subtle shadow
export const cardHoverProps = {
  whileHover: {
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

// Button Interactions: 1.02 scale hover, 0.98 tap
export const buttonMotionProps = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.98 },
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
      ease: easeOutExpo
    }
  }
};
