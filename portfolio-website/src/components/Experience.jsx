import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { experience } from '../data'

const TYPE_COLORS = {
  internship: '#22d3ee',
  project: '#818cf8',
  education: '#6ee7b7',
}

const TYPE_LABELS = {
  internship: 'INTERNSHIP',
  project: 'PROJECT',
  education: 'EDUCATION',
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState(experience[0]?.id)

  return (
    <section
      id="systems"
      ref={ref}
      className="section"
      aria-label="Experience — Systems"
      style={{ background: 'var(--deep)' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-label">06 — SYSTEMS</div>
          <h2 className="heading-lg" style={{ color: 'var(--text-1)' }}>
            Engineering{' '}
            <span className="text-gradient-cyan">Journey</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--text-2)' }}>
            Professional experience, impactful projects, and academic foundations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative timeline-track pl-12 flex flex-col gap-4">
          {experience.map((item, idx) => {
            const isExpanded = expanded === item.id
            const color = TYPE_COLORS[item.type] || 'var(--cyan)'

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Timeline node dot */}
                <div
                  className="absolute left-[15px] timeline-node"
                  style={{
                    background: color,
                    boxShadow: `0 0 12px ${color}60`,
                    top: `calc(${idx * 100}% / ${experience.length} + 24px)`,
                    marginTop: idx === 0 ? 0 : idx * 4,
                  }}
                />

                {/* Card */}
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'var(--panel)',
                    border: `1px solid ${isExpanded ? color + '30' : 'var(--border)'}`,
                    boxShadow: isExpanded ? `0 0 30px ${color}08` : 'none',
                  }}
                  onClick={() => setExpanded(isExpanded ? null : item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setExpanded(isExpanded ? null : item.id)}
                  aria-expanded={isExpanded}
                >
                  {/* Card header */}
                  <div className="p-5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                      >
                        {item.icon}
                      </div>

                      <div>
                        {/* Type badge */}
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded mb-1 inline-block"
                          style={{
                            background: `${color}12`,
                            color,
                            border: `1px solid ${color}25`,
                          }}
                        >
                          {TYPE_LABELS[item.type]}
                        </span>
                        <h3 className="font-bold text-lg" style={{ color: 'var(--text-1)' }}>
                          {item.title}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--text-2)' }}>
                          {item.org}
                        </p>
                        <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                          {item.duration}
                        </p>
                      </div>
                    </div>

                    {/* Expand toggle */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="font-mono text-xs mt-1 flex-shrink-0"
                      style={{ color: 'var(--text-3)' }}
                    >
                      ▾
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 pb-5 flex flex-col gap-4" style={{ borderTop: '1px solid var(--border)' }}>
                      <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                        {item.description}
                      </p>

                      {/* Responsibilities */}
                      <ul className="flex flex-col gap-1.5">
                        {item.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                            <span className="mt-1 flex-shrink-0" style={{ color }}>▸</span>
                            {r}
                          </li>
                        ))}
                      </ul>

                      {/* Tech pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.tech.map(t => (
                          <span
                            key={t}
                            className="font-mono text-xs px-2 py-0.5 rounded"
                            style={{
                              background: `${color}08`,
                              border: `1px solid ${color}20`,
                              color,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Certificate link */}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-xs transition-colors"
                          style={{ color: 'var(--text-3)' }}
                          onClick={e => e.stopPropagation()}
                          onMouseEnter={e => e.currentTarget.style.color = color}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                        >
                          <ExternalLink size={12} /> View Certificate
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
