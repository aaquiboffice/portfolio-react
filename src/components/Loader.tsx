import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1700;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setTimeout(() => {
          setHidden(true);
          onDone();
        }, 450);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-bg-base"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            className="absolute inset-0 grid-bg opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
          />
          <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-6 px-5 sm:gap-8 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan/80 sm:text-xs sm:tracking-[0.4em]"
            >
              Initializing experience
            </motion.div>
            <div className="relative h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-purple via-neon-violet to-neon-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex w-full items-center justify-between font-mono text-xs text-white/60">
              <span>aaquib.dev</span>
              <span className="text-gradient-anim font-semibold">{progress.toString().padStart(3, '0')}%</span>
            </div>
            <motion.div
              className="mt-2 break-words text-center font-display text-3xl font-bold leading-tight sm:mt-4 sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <span className="text-gradient-anim">Mohd Aaquib Rodde</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
