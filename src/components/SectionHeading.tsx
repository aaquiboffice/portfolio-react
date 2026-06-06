import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: ReactNode;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, align = 'left' }: Props) {
  return (
    <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-neon-cyan/80"
      >
        <span className="h-px w-8 bg-neon-cyan/60" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
