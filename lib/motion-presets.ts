/** Framer Motion presets — Rafiki landing + architecture/docs */
export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

/** Parent variants — use with `initial="initial"` `animate="animate"` */
export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.07 },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
};

export const cardHover = {
  whileHover: {
    y: -3,
    transition: { duration: 0.15 },
  },
};
