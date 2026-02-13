import { motion } from 'framer-motion';

interface GlitchTextProps {
  children: string;
  className?: string;
}

const GlitchText = ({ children, className = '' }: GlitchTextProps) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover="glitch"
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute top-0 left-0 text-primary opacity-0 z-0"
        variants={{
          glitch: {
            opacity: [0, 0.8, 0, 0.6, 0],
            x: [0, -3, 3, -2, 0],
            y: [0, 2, -1, 1, 0],
            transition: { duration: 0.4, repeat: Infinity, repeatDelay: 2 },
          },
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-secondary opacity-0 z-0"
        variants={{
          glitch: {
            opacity: [0, 0.6, 0, 0.8, 0],
            x: [0, 3, -3, 2, 0],
            y: [0, -2, 1, -1, 0],
            transition: { duration: 0.4, repeat: Infinity, repeatDelay: 2, delay: 0.05 },
          },
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </motion.span>
  );
};

export default GlitchText;
