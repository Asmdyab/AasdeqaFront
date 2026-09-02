import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate
} from 'motion/react';

/** Signature easing — shared across every animation */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Site-wide motion override — owner requested full motion regardless of the
 * OS reduced-motion preference (Windows/RDP often report `reduce` falsely).
 * Flip this to respect the media query again if ever needed.
 */
export const useForceMotion = (): boolean => false;

/* ---------------------------------- Reveal --------------------------------- */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, y = 28 }) => {
  const reduce = useForceMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------- WordReveal ------------------------------- */

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

/** Splits text into words and reveals them bottom-up, masked per word */
export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className,
  delay = 0,
  stagger = 0.06
}) => {
  const reduce = useForceMotion();
  const words = text.split(' ');

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

/* --------------------------------- Counter --------------------------------- */

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/** Counts up when scrolled into view */
export const Counter: React.FC<CounterProps> = ({
  to,
  suffix = '',
  prefix = '',
  duration = 1.6,
  className
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useForceMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE as unknown as [number, number, number, number],
      onUpdate: (v) => setValue(v)
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(value).toLocaleString('en-US')}
      {suffix}
    </span>
  );
};

/* --------------------------------- Magnetic -------------------------------- */

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/** Cursor-following pull with springy return — for primary CTAs */
export const Magnetic: React.FC<MagneticProps> = ({ children, className, strength = 0.25 }) => {
  const reduce = useForceMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 200, damping: 15, mass: 0.4 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`inline-block ${className ?? ''}`}
      style={{ x, y }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        rawX.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        rawY.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};
