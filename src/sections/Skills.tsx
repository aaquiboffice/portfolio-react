import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import SectionHeading from '../components/SectionHeading';
import { skills } from '../data/content';

const SkillsOrb = lazy(() => import('../three/SkillsOrb'));

const groups = [
  { title: 'Frontend', items: skills.frontend },
  { title: 'Backend', items: skills.backend },
  { title: 'Languages', items: skills.languages },
  { title: 'Databases', items: skills.databases },
  { title: 'Tools', items: skills.tools },
];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <SectionHeading
        eyebrow="Skills & tools"
        title={
          <>
            The <span className="text-gradient">stack</span> I work in.
          </>
        }
      />

      <div className="mt-12 grid items-center gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
        <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] md:max-w-[520px]" data-cursor="hover">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-10 rounded-full bg-neon-purple/20 blur-3xl"
          />
          <Suspense fallback={<div className="grid h-full w-full place-items-center text-white/40">loading…</div>}>
            <SkillsOrb />
          </Suspense>
        </div>

        <div className="space-y-5">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: gi * 0.06 }}
              className="glass rounded-2xl p-4 sm:p-5"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon-cyan/85 sm:text-xs">{g.title}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/80 transition hover:border-neon-purple/60 hover:text-white sm:px-3 sm:text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
