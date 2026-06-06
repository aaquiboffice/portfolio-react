import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      {/* Desktop pill nav */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        className="fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 md:block"
      >
        <div className="glass flex items-center gap-3 rounded-full px-2 py-2 pl-3">
          <a href="#hero" aria-label="Home" className="block">
            <Logo size="sm" />
          </a>
          <div className="mx-1 h-4 w-px bg-white/15" />
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative inline-flex items-center rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            data-cursor="hover"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-violet px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(176,38,255,0.45)] transition hover:shadow-[0_0_36px_rgba(176,38,255,0.75)]"
          >
            Let&apos;s talk
          </a>
        </div>
      </motion.nav>

      {/* Mobile top bar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        className="fixed inset-x-4 top-4 z-50 md:hidden"
      >
        <div className="glass flex items-center justify-between rounded-full px-3 py-2">
          <a href="#hero" aria-label="Home" className="flex items-center gap-2.5">
            <Logo size="md" />
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
              Aaquib
            </span>
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/85"
          >
            <FiMenu size={18} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <div className="flex items-center gap-2.5">
                <Logo size="md" />
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                  Aaquib
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-center font-display text-4xl font-semibold text-white/85 transition hover:text-gradient"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mx-6 mb-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-violet px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_36px_rgba(176,38,255,0.6)]"
            >
              Let&apos;s talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
