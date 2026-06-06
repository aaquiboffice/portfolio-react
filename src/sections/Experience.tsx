import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <SectionHeading
        eyebrow="Where I've worked"
        title={
          <>
            <span className="text-gradient">Experience</span> &amp; impact
          </>
        }
      />

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12 md:gap-10">
        <div className="relative md:col-span-1">
          <div className="sticky top-32 hidden md:block">
            <div className="h-[480px] w-px bg-gradient-to-b from-neon-purple via-neon-violet to-transparent" />
          </div>
        </div>
        <div className="md:col-span-11">
          {experience.map((job, idx) => (
            <motion.article
              key={job.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="glass relative overflow-hidden rounded-2xl p-6 sm:rounded-3xl sm:p-8 md:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-neon-purple/20 blur-3xl"
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
                    {job.role}{' '}
                    <span className="text-gradient">@ {job.company}</span>
                  </h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55 sm:text-xs">
                    {job.location}
                  </p>
                </div>
                <div className="self-start rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-neon-cyan sm:text-xs">
                  {job.period}
                </div>
              </div>

              <ul className="mt-6 space-y-3 sm:mt-8">
                {job.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
                    className="flex gap-3 text-sm text-white/75 sm:text-base"
                  >
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan" />
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
