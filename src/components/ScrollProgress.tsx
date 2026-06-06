import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-gradient-to-r from-neon-purple via-neon-violet to-neon-cyan"
    />
  );
}
