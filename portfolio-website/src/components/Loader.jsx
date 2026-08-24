import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  { label: 'SYSTEM INITIALIZING', detail: 'Booting neural architecture...' },
  { label: 'LOADING KNOWLEDGE BASE', detail: 'Indexing projects, skills & experience...' },
  { label: 'CONNECTING PATHWAYS', detail: 'Establishing neural connections...' },
  { label: 'SYSTEM ONLINE', detail: 'Dharun Kumar — Ready.' },
]

export default function Loader({ onComplete }) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [chars, setChars] = useState('')
  const timerRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    // Animate progress bar
    let prog = 0
    progressRef.current = setInterval(() => {
      prog += 1.2
      setProgress(Math.min(prog, 100))
      if (prog >= 100) clearInterval(progressRef.current)
    }, 25)

    // Step progression
    const stepTimings = [0, 700, 1400, 2100]
    stepTimings.forEach((delay, idx) => {
      setTimeout(() => setStep(idx), delay)
    })

    // Exit after 2.8s
    timerRef.current = setTimeout(onComplete, 2800)

    return () => {
      clearInterval(progressRef.current)
      clearTimeout(timerRef.current)
    }
  }, [onComplete])

  // Typewriter for current step label
  useEffect(() => {
    const target = STEPS[step].label
    let idx = 0
    setChars('')
    const t = setInterval(() => {
      idx++
      setChars(target.slice(0, idx))
      if (idx >= target.length) clearInterval(t)
    }, 30)
    return () => clearInterval(t)
  }, [step])

  return (
    <motion.div
      className="loader-overlay"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 grid-bg opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Animated nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: i % 2 === 0 ? 'var(--cyan)' : 'var(--electric)' }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Core Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-lg">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-2xl border border-cyan-500/30 flex items-center justify-center"
               style={{ background: 'rgba(34,211,238,0.06)' }}>
            <span className="text-2xl font-bold font-mono" style={{ color: 'var(--cyan)' }}>DK</span>
          </div>
          <div className="absolute inset-0 rounded-2xl"
               style={{ boxShadow: '0 0 30px rgba(34,211,238,0.2)' }} />
        </motion.div>

        {/* Step text */}
        <div className="min-h-[72px] flex flex-col items-center gap-2">
          <p
            className="font-mono text-sm tracking-widest"
            style={{ color: 'var(--cyan)' }}
          >
            {chars}<span className="animate-pulse">_</span>
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-mono"
              style={{ color: 'var(--text-3)' }}
            >
              {STEPS[step].detail}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="loader-bar-track w-72">
          <motion.div
            className="loader-bar-fill"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        {/* Progress % */}
        <p className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
          {Math.round(progress)}%
        </p>
      </div>

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 font-mono text-xs tracking-widest transition-colors"
        style={{ color: 'var(--text-3)' }}
        onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
        onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
        aria-label="Skip loader"
      >
        [ SKIP ]
      </button>
    </motion.div>
  )
}
