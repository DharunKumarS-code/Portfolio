import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { research } from '../data'

export default function Research() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="research"
      ref={ref}
      className="section"
      aria-label="Research — Experiments"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-label">07 — RESEARCH</div>
          <h2 className="heading-lg" style={{ color: 'var(--text-1)' }}>
            Experiments &{' '}
            <span className="text-gradient-cyan">Explorations</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--text-2)' }}>
            Active research areas and ongoing explorations. No fabricated publications —
            just genuine intellectual curiosity in progress.
          </p>
        </motion.div>

        {/* Research cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {research.map((item, idx) => (
            <motion.article
              key={item.id}
              className="research-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="badge badge-in-progress mb-1">
                      <span className="pulse-dot" />
                      IN PROGRESS
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-1)' }}>
                {item.topic}
              </h3>

              {/* Sections */}
              <div className="flex flex-col gap-3">
                {[
                  { label: 'HYPOTHESIS', content: item.hypothesis },
                  { label: 'APPROACH', content: item.approach },
                ].map(({ label, content }) => (
                  <div key={label}>
                    <p className="font-mono text-xs mb-1" style={{ color: 'var(--text-3)' }}>
                      {label}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      {content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      background: 'rgba(34,211,238,0.06)',
                      border: '1px solid rgba(34,211,238,0.12)',
                      color: 'var(--text-3)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          className="text-center mt-10 font-mono text-xs"
          style={{ color: 'var(--text-3)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          — All research is currently in progress. No publications to date —
        </motion.p>
      </div>
    </section>
  )
}
