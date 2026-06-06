import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { personal } from '../data/content';

const stats = [
  { label: 'Years building', value: '1+' },
  { label: 'Projects shipped', value: '5+' },
  { label: 'Stack', value: 'MEAN' },
  { label: 'Coffee per day', value: '∞' },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32">
          <SectionHeading
            eyebrow="About me"
            title={
              <>
                Building <span className="text-gradient">interfaces</span>
                <br /> people actually <span className="text-gradient">enjoy</span>.
              </>
            }
          />
        </div>

        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-base leading-relaxed text-white/75 sm:text-lg"
          >
            {personal.summary}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Day to day I work as a MEAN Stack Developer at{' '}
            <span className="text-white">Dealmoney Commodities</span> in Thane — shipping production Angular UIs, REST APIs, and MongoDB queries.
            Off-hours, I sketch experiences in React, Three.js, and motion to keep the bar moving.
          </motion.p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-4 sm:p-5"
              >
                <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/55 sm:text-xs">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
