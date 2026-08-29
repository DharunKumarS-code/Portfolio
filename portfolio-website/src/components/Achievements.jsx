import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Award } from 'lucide-react'
import { certificates } from '../data'

const CATEGORIES = ['All', 'AI/ML', 'Data Analytics', 'Cloud & DevOps', 'Professional Skills', 'Development']

const ACCENT_MAP = {
  'AI/ML': '#818cf8',
  'Data Analytics': '#22d3ee',
  'Cloud & DevOps': '#fb923c',
  'Professional Skills': '#f472b6',
  'Development': '#a78bfa',
}

export default function Achievements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? certificates
    : certificates.filter(c => c.category === activeFilter)

  return (
    <section
      id="credentials"
      ref={ref}
      className="section"
      aria-label="Certifications — Credentials"
      style={{ background: 'var(--deep)' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-label">08 — CREDENTIALS</div>
          <h2 className="heading-lg" style={{ color: 'var(--text-1)' }}>
            Verified{' '}
            <span className="text-gradient-cyan">Achievements</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--text-2)' }}>
            Verified credentials from leading organizations and learning platforms.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="font-mono text-xs px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: activeFilter === cat ? 'rgba(34,211,238,0.12)' : 'var(--panel)',
                border: `1px solid ${activeFilter === cat ? 'rgba(34,211,238,0.4)' : 'var(--border)'}`,
                color: activeFilter === cat ? 'var(--cyan)' : 'var(--text-3)',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cert, idx) => {
            const accent = ACCENT_MAP[cert.category] || '#22d3ee'
            return (
              <motion.article
                key={cert.id}
                className="cert-card shine-effect"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.07 }}
              >
                {/* Top banner */}
                <div
                  className="h-24 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${accent}20, ${accent}08)` }}
                >
                  <Award size={32} style={{ color: accent, opacity: 0.7 }} />
                  {/* Category tag */}
                  <div className="absolute bottom-3 left-4">
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: `${accent}15`,
                        border: `1px solid ${accent}30`,
                        color: accent,
                      }}
                    >
                      {cert.category}
                    </span>
                  </div>
                  {/* Year */}
                  <div className="absolute top-3 right-4">
                    <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-bold mb-1 leading-snug" style={{ color: 'var(--text-1)' }}>
                    {cert.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>
                    {cert.issuer}
                  </p>

                  <a
                    href={cert.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-xl font-mono text-xs transition-all duration-200"
                    style={{
                      border: `1px solid ${accent}25`,
                      color: accent,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${accent}10`
                      e.currentTarget.style.borderColor = `${accent}50`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = `${accent}25`
                    }}
                  >
                    <ExternalLink size={12} /> VIEW CERTIFICATE
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
