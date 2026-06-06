import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/content';

function TiltCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rx = useSpring(useTransform(mvY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mvX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mvX, [-0.5, 0.5], ['10%', '90%']);
  const glowY = useTransform(mvY, [-0.5, 0.5], ['10%', '90%']);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className={`glass relative h-full overflow-hidden rounded-2xl p-6 transition-shadow duration-500 group-hover:neon-border sm:rounded-3xl sm:p-8`}>
        <motion.div
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${project.accent} opacity-60`}
          style={{
            background: `radial-gradient(600px circle at ${glowX.get()} ${glowY.get()}, rgba(176,38,255,0.18), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/55 sm:text-xs">
            <span>// project {String(index + 1).padStart(2, '0')}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="mt-5 font-display text-xl font-semibold leading-tight text-white sm:mt-6 sm:text-2xl md:text-3xl">
            {project.title}
          </h3>

          <p className="mt-3 text-sm text-white/70 sm:mt-4 sm:text-base">{project.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/75"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8 sm:gap-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-bg-base transition hover:bg-neon-cyan"
              >
                Live <FiArrowUpRight />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:border-neon-purple/60 hover:text-white"
              >
                <FiGithub /> Code
              </a>
            )}
            {!project.live && !project.repo && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
                Internal · work project
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Things I&apos;ve <span className="text-gradient">built</span>.
          </>
        }
      />

      <div className="mt-12 grid gap-6 sm:gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <TiltCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
