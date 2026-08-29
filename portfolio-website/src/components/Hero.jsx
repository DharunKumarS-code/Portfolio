import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'

// Lazy load the 3D scene
const AICore3D = lazy(() => import('./AICore'))

const ROLES = ['AI/ML Engineer', 'Software Developer', 'Problem Solver', 'Builder']

function Typewriter({ words }) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    const speed = deleting ? 50 : 90
    const t = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length === 0) {
          setDeleting(false)
          setWordIdx(i => (i + 1) % words.length)
        }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, wordIdx, words])

  return (
    <span>
      <span>{text}</span>
      <span
        className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
        style={{ background: 'var(--cyan)' }}
      />
    </span>
  )
}

// CSS animated fallback for mobile / loading
function AICoreSimple() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${140 + i * 80}px`,
            height: `${140 + i * 80}px`,
            borderColor: i === 0 ? 'rgba(34,211,238,0.4)' : i === 1 ? 'rgba(129,140,248,0.25)' : 'rgba(167,139,250,0.15)',
            animation: `heroSpin ${8 + i * 4}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
          }}
        />
      ))}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center font-mono text-xs font-bold"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent)',
          border: '1px solid rgba(34,211,238,0.4)',
          color: 'var(--cyan)',
          boxShadow: '0 0 40px rgba(34,211,238,0.15)',
        }}
      >
        AI
      </div>
      <style>{`@keyframes heroSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function Hero() {
  const stagger = { visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } },
  }

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ paddingTop: 100 }}
      aria-label="Hero — Introduction"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Ambient glow blobs */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)',
          top: -100, left: -100,
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,140,248,0.06), transparent 70%)',
          bottom: -50, right: -100,
          zIndex: 0,
        }}
      />

      {/* LEFT: Text content */}
      <motion.div
        className="relative z-10 flex flex-col gap-6 lg:gap-8"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* System tag */}
        <motion.div variants={item}>
          <span
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(34,211,238,0.08)',
              border: '1px solid rgba(34,211,238,0.2)',
              color: 'var(--cyan)',
            }}
          >
            <span className="pulse-dot" />
            SYSTEM ONLINE — AI/ML ENGINEER
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={item}>
          <h1 className="heading-xl" style={{ lineHeight: 0.92 }}>
            <span style={{ color: 'var(--text-1)' }}>DHARUN</span>
            <br />
            <span className="text-gradient-cyan">KUMAR</span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div variants={item}>
          <p
            className="text-xl md:text-2xl font-medium h-8"
            style={{ color: 'var(--text-2)', fontFamily: 'Space Grotesk' }}
          >
            <Typewriter words={ROLES} />
          </p>
        </motion.div>

        {/* Headline */}
        <motion.p
          variants={item}
          className="text-lg leading-relaxed max-w-xl"
          style={{ color: 'var(--text-2)' }}
        >
          Building intelligent systems for real-world problems.
          <br />
          <span style={{ color: 'var(--text-3)' }}>
            From RAG pipelines to data dashboards — turning data into decisions.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap gap-3">
          <a href="#lab" className="btn-primary">
            View AI Lab
            <ArrowDown size={16} />
          </a>
          <a href="#connect" className="btn-outline">
            Get In Touch
          </a>
          <a
            href="https://drive.google.com/file/d/1L5wJqGGV-p30SEbZ7zgKj3hOGkRmj3At/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Download size={16} />
            Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="flex items-center gap-4">
          {[
            { href: 'https://github.com/DharunKumarS-code', icon: <Github size={20} />, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/dharun-kumar-8504a4290', icon: <Linkedin size={20} />, label: 'LinkedIn' },
            { href: 'mailto:sdharun7010@gmail.com', icon: <Mail size={20} />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="p-2.5 rounded-xl transition-all duration-200"
              style={{ border: '1px solid var(--border)', color: 'var(--text-3)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--cyan)'
                e.currentTarget.style.color = 'var(--cyan)'
                e.currentTarget.style.boxShadow = '0 0 15px rgba(34,211,238,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-3)'
                e.currentTarget.style.boxShadow = ''
              }}
            >
              {icon}
            </a>
          ))}
          <span
            className="h-px flex-1 max-w-16"
            style={{ background: 'var(--border)' }}
          />
          <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
            SKCET · CS · 2026
          </span>
        </motion.div>
      </motion.div>

      {/* RIGHT: 3D AI Core */}
      <motion.div
        className="relative w-full h-[400px] md:h-[520px] lg:h-[600px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        aria-hidden="true"
      >
        <Suspense fallback={<AICoreSimple />}>
          <AICore3D mode="hero" />
        </Suspense>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--text-3)' }}>SCROLL</span>
        <motion.div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, var(--cyan), transparent)' }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
