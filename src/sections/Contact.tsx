import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi';
import SectionHeading from '../components/SectionHeading';
import { useMagnetic } from '../hooks/useMagnetic';
import { personal } from '../data/content';

export default function Contact() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <section id="contact" className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%] opacity-30" />

      <div className="text-center">
        <SectionHeading
          eyebrow="Let's connect"
          align="center"
          title={
            <>
              Have an idea?
              <br /> Let&apos;s <span className="text-gradient">build</span> it.
            </>
          }
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-white/65"
        >
          I&apos;m open to interesting frontend gigs, full-time roles, and side projects. The fastest way to reach me is over email — I usually reply within a day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <a
            ref={ctaRef}
            href={`mailto:${personal.email}?subject=Let's%20build%20something`}
            data-cursor="hover"
            className="group relative inline-flex max-w-full items-center gap-3 rounded-full bg-gradient-to-r from-neon-purple via-neon-violet to-neon-cyan p-[1.5px] text-xs font-semibold uppercase tracking-[0.2em] text-white animate-pulse-glow sm:text-sm md:text-base"
          >
            <span className="flex max-w-full items-center gap-2 truncate rounded-full bg-bg-base px-5 py-3.5 transition group-hover:bg-transparent sm:gap-3 sm:px-8 sm:py-4 md:px-10 md:py-5">
              <span className="truncate">{personal.email}</span>
              <FiArrowUpRight className="flex-shrink-0 transition group-hover:rotate-45" />
            </span>
          </a>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:border-neon-purple/60 hover:text-white"
            >
              <FiGithub /> github.com/aaquiboffice
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:border-neon-cyan/60 hover:text-white"
            >
              <FiLinkedin /> LinkedIn
            </a>
            <a
              href={`mailto:${personal.email}`}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:border-neon-purple/60 hover:text-white"
            >
              <FiMail /> {personal.email}
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-[10px] uppercase tracking-[0.25em] text-white/45 sm:mt-32 sm:flex-row sm:text-xs">
        <span className="font-mono">© {new Date().getFullYear()} Mohd Aaquib Rodde</span>
        <span className="font-mono">Designed &amp; coded with care.</span>
      </footer>
    </section>
  );
}
