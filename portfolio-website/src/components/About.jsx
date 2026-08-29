import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const META_TAGS = ['CS STUDENT', 'SKCET', 'AI/ML', 'DATA', 'NLP', 'RAG', 'BUILDER', '2026']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredTag, setHoveredTag] = useState(null)

  const stagger = {
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="about"
      ref={ref}
      className="section"
      aria-label="About — Origin"
      style={{ background: 'var(--deep)' }}
    >
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* LEFT: Identity card with profile photo */}
          <motion.div variants={fadeUp} className="relative flex justify-center lg:justify-start">
            {/* 3D layered card effect */}
            <div className="relative w-72 md:w-80">
              {/* Background layers */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'var(--panel)',
                  border: '1px solid rgba(129,140,248,0.2)',
                  transform: 'translate(12px, 12px)',
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'var(--panel)',
                  border: '1px solid rgba(34,211,238,0.15)',
                  transform: 'translate(6px, 6px)',
                }}
              />

              {/* Main card */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--border-bright)' }}
              >
                {/* Photo */}
                <div className="relative h-64 overflow-hidden" style={{ background: 'var(--panel)' }}>
                  <img
                    src="/profile.jpg"
                    alt="Dharun Kumar"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 50%, var(--deep) 100%)',
                    }}
                  />
                </div>

                {/* Card body */}
                <div className="p-5" style={{ background: 'var(--panel)' }}>
                  <p className="font-mono text-xs mb-1" style={{ color: 'var(--cyan)' }}>
                    IDENTITY.CARD
                  </p>
                  <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>
                    Dharun Kumar
                  </h2>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>
                    AI/ML Engineer · Software Developer
                  </p>

                  {/* Hoverable metadata tags */}
                  <div className="flex flex-wrap gap-2">
                    {META_TAGS.map(tag => (
                      <span
                        key={tag}
                        onMouseEnter={() => setHoveredTag(tag)}
                        onMouseLeave={() => setHoveredTag(null)}
                        className="font-mono text-xs px-2 py-1 rounded cursor-default transition-all duration-200"
                        style={{
                          background: hoveredTag === tag ? 'rgba(34,211,238,0.12)' : 'rgba(34,211,238,0.05)',
                          border: '1px solid',
                          borderColor: hoveredTag === tag ? 'rgba(34,211,238,0.4)' : 'rgba(34,211,238,0.1)',
                          color: hoveredTag === tag ? 'var(--cyan)' : 'var(--text-3)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 font-mono text-xs px-3 py-2 rounded-xl"
                style={{
                  background: 'rgba(34,211,238,0.1)',
                  border: '1px solid rgba(34,211,238,0.3)',
                  color: 'var(--cyan)',
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                ONLINE ✦
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Story content */}
          <div className="flex flex-col gap-8">
            <motion.div variants={fadeUp}>
              <div className="section-label">02 — ORIGIN</div>
              <h2 className="heading-lg" style={{ color: 'var(--text-1)' }}>
                Who I Am
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-5">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
                I'm <strong style={{ color: 'var(--text-1)' }}>Dharun Kumar</strong>, a Computer Science student at SKCET
                (graduating 2026), specializing in building intelligent systems at the intersection of
                AI, data, and software engineering.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
                My approach is engineering-first: every system I build starts with a well-defined problem,
                a structured approach, and ends with something that genuinely works in the real world.
                I'm drawn to AI because it transforms raw data into decisions — and decisions create impact.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Currently focused on <span style={{ color: 'var(--cyan)' }}>RAG pipelines</span>,{' '}
                <span style={{ color: 'var(--electric)' }}>NLP systems</span>, and{' '}
                <span style={{ color: 'var(--mint)' }}>data analytics</span> —
                bridging the gap between research and production.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
              {[
                { num: '4+', label: 'Projects Built', color: 'var(--cyan)' },
                { num: '7', label: 'Certifications', color: 'var(--electric)' },
                { num: '1', label: 'Internship', color: 'var(--mint)' },
              ].map(({ num, label, color }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 p-4 rounded-xl text-center"
                  style={{
                    background: 'var(--panel)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span className="text-2xl font-bold font-mono" style={{ color }}>
                    {num}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
