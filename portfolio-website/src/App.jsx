import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import EngineeringMindset from './components/EngineeringMindset'
import SkillUniverse from './components/SkillUniverse'
import ProjectLab from './components/ProjectLab'
import Experience from './components/Experience'
import Research from './components/Research'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import AIChat from './components/AIChat'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen overflow-x-hidden"
          style={{ background: 'var(--void)' }}
        >
          {/* Scroll progress bar */}
          <motion.div
            className="scroll-progress"
            style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
          />

          <Navigation />

          <main>
            <Hero />
            <About />
            <EngineeringMindset />
            <SkillUniverse />
            <ProjectLab />
            <Experience />
            <Research />
            <Achievements />
            <Contact />
          </main>

          <AIChat />
        </motion.div>
      )}
    </>
  )
}
