import { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Noise from './components/Noise';
import ScrollProgress from './components/ScrollProgress';
import SmoothScroll from './components/SmoothScroll';
import About from './sections/About';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [ready]);

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <Noise />
      <ScrollProgress />
      {ready && <SmoothScroll />}
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
