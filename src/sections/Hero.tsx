import { motion } from 'framer-motion';
import HeroScene from '../three/HeroScene';
import { personal } from '../data/content';
import { FiArrowDownRight, FiGithub, FiLinkedin } from 'react-icons/fi';

const nameLetters = personal.name.split('');

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] w-full items-center overflow-hidden">
      <HeroScene />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-base/0 via-bg-base/10 to-bg-base" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 md:px-10 md:py-24">
        <div className="flex flex-col gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan/85 sm:text-xs sm:tracking-[0.4em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            <span className="leading-tight">Available for freelance &amp; full-time</span>
          </motion.div>

          <h1 className="font-display text-[2.5rem] font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block text-white/80">Hi, I&apos;m</span>
            <span className="block">
              {nameLetters.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + i * 0.025,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  className="inline-block text-gradient-anim"
                  style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg"
          >
            {personal.tagline} {personal.role} based in {personal.location} — shipping production Angular &amp; Node apps, sketching new ideas in React, Three.js, and motion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4"
          >
            <a
              href="#projects"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-violet px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(176,38,255,0.45)] transition hover:shadow-[0_0_48px_rgba(176,38,255,0.8)] sm:px-6 sm:py-3 sm:text-sm"
            >
              See my work
              <FiArrowDownRight className="transition group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a
              href="#contact"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:border-neon-cyan/60 hover:text-white sm:px-6 sm:py-3 sm:text-sm"
            >
              Get in touch
            </a>
            <div className="flex items-center gap-3 sm:pl-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-neon-purple/60 hover:text-white"
              >
                <FiGithub />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-neon-cyan/60 hover:text-white"
              >
                <FiLinkedin />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-6 left-5 right-5 mx-auto flex max-w-7xl items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40 sm:bottom-8 sm:left-6 sm:right-6 sm:text-xs md:px-4"
        >
          <span className="font-mono">scroll ↓</span>
          <span className="font-mono hidden sm:inline">React · Three.js · GSAP · Framer</span>
        </motion.div>
      </div>
    </section>
  );
}
