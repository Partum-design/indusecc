'use client';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';

let firstPaint = true;

/** Route transition: a wine curtain lifts off each new page (skipped on the very first load, where the preloader runs). */
export function Curtain({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  // Server renders and the first client paint never show the curtain. The
  // flag is read once per mount (StrictMode-safe) and cleared after mount.
  const [first] = useState(() => typeof window === 'undefined' || firstPaint);
  useEffect(() => {
    firstPaint = false;
  }, []);
  const skip = first || reduce;
  return (
    <>
      {!skip && (
        <motion.div
          className="curtain"
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.85, ease: [0.77, 0, 0.18, 1], delay: 0.05 }}
        />
      )}
      <motion.div initial={skip ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}>
        {children}
      </motion.div>
    </>
  );
}
