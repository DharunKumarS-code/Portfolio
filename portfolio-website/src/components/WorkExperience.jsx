import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Award, Bot, Briefcase, Calendar, ExternalLink, FileBadge, Lock, Mic, Ship, Workflow } from 'lucide-react'
import { workExperience } from '../data'

const ICONS = { ship: Ship, mic: Mic, bot: Bot, workflow: Workflow }

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function RoleCard({ data }) {
  return (
    <div className="panel p-6 md:p-8 h-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(125,211,252,0.08)', border: '1px solid rgba(125,211,252,0.2)', color: 'var(--cyan)' }}
        >
          <Briefcase size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="badge badge-in-progress mb-3">{data.type.toUpperCase()}</span>
          <h3 className="heading-md" style={{ color: 'var(--text-1)' }}>{data.role}</h3>
          <p className="text-lg font-semibold mt-1 text-gradient-cyan inline-block">{data.company}</p>
          <p className="font-mono text-xs mt-2 flex items-center gap-2" style={{ color: 'var(--text-3)' }}>
            <Calendar size={13} /> {data.duration}
          </p>
        </div>
      </div>

      <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>{data.description}</p>

      <div className="mt-auto">
        <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-3)' }}>FOCUS AREAS</p>
        <div className="flex flex-wrap gap-2">
          {data.domains.map(d => <span key={d} className="tech-pill">{d}</span>)}
        </div>
      </div>
    </div>
  )
}

function CertificateCard({ certificate }) {
  const { image, link } = certificate || {}
  const href = link || image
  const available = Boolean(href)

  return (
    <div className="panel p-6 h-full flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Award size={18} style={{ color: 'var(--electric)' }} />
        <h3 className="font-bold" style={{ color: 'var(--text-1)' }}>Internship Certificate</h3>
      </div>

      {image ? (
        <a
          href={image}
          target="_blank"
          rel="noopener noreferrer"
          title="Open full certificate"
          aria-label="Open full Synergy Maritime internship certificate"
          className="group flex-1 flex items-center justify-center rounded-xl p-4 transition-all duration-300 border border-[rgba(167,139,250,0.25)] hover:border-[rgba(167,139,250,0.6)] hover:shadow-[0_0_28px_rgba(167,139,250,0.18)]"
          style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.06) 0%, rgba(125,211,252,0.03) 100%)' }}
        >
          <img
            src={image}
            alt="Synergy Maritime internship certificate"
            width={500}
            height={705}
            loading="lazy"
            className="block w-auto h-auto max-w-full max-h-[440px] object-contain rounded-md shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </a>
      ) : (
        /* PLACEHOLDER — replaced automatically once workExperience.certificate is set in data.js */
        <div
          className="flex-1 min-h-[180px] rounded-xl flex flex-col items-center justify-center text-center gap-3 p-6"
          style={{
            border: '1px dashed rgba(167,139,250,0.35)',
            background: 'linear-gradient(135deg, rgba(167,139,250,0.05) 0%, rgba(125,211,252,0.03) 100%)',
          }}
          data-placeholder="internship-certificate"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', color: 'var(--electric)' }}
          >
            <FileBadge size={26} />
          </motion.div>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            {available ? 'Certificate available.' : 'Certificate will be added soon.'}
          </p>
        </div>
      )}

      {available ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-outline justify-center">
          <ExternalLink size={15} /> View Certificate
        </a>
      ) : (
        <span className="flex" style={{ cursor: 'not-allowed' }} title="Certificate will be added soon">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="btn-outline justify-center w-full"
            style={{ opacity: 0.45, pointerEvents: 'none' }}
          >
            <Lock size={15} /> View Certificate
          </button>
        </span>
      )}
    </div>
  )
}

function WorkstreamDetail({ stream }) {
  const Icon = ICONS[stream.icon] || Workflow
  const c = stream.color

  return (
    <motion.div
      key={stream.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="panel p-6 md:p-8 h-full"
      style={{ borderColor: `${c}30`, boxShadow: `0 0 40px ${c}0a` }}
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${c}12`, border: `1px solid ${c}30`, color: c }}
        >
          <Icon size={22} />
        </div>
        <div>
          <h4 className="font-bold text-xl" style={{ color: 'var(--text-1)' }}>{stream.title}</h4>
          <p className="font-mono text-xs mt-1" style={{ color: c }}>{stream.subtitle.toUpperCase()}</p>
        </div>
      </div>

      <p className="leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>{stream.summary}</p>

      <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-3)' }}>KEY CONTRIBUTIONS</p>
      <ul className="flex flex-col gap-2.5 mb-6">
        {stream.contributions.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i + 0.1 }}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: 'var(--text-2)' }}
          >
            <span className="mt-0.5 flex-shrink-0" style={{ color: c }}>▸</span>
            {item}
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {stream.tags.map(t => (
          <span
            key={t}
            className="font-mono text-xs px-3 py-1 rounded-full"
            style={{ background: `${c}0d`, border: `1px solid ${c}25`, color: c }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function WorkExperience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const streams = workExperience.workstreams
  const [activeId, setActiveId] = useState(streams[0]?.id)
  const active = streams.find(s => s.id === activeId) || streams[0]

  return (
    <section
      id="work"
      ref={ref}
      className="section"
      aria-label="Work Experience"
      style={{ background: 'var(--void)' }}
    >
      <motion.div
        className="container"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-12 md:mb-16">
          <div className="section-label">03 — WORK</div>
          <h2 className="heading-lg" style={{ color: 'var(--text-1)' }}>
            Work <span className="text-gradient-cyan">Experience</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--text-2)' }}>
            Professional software development across maritime systems, AI, and intelligent interaction.
          </p>
        </motion.div>

        {/* Role + certificate */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <RoleCard data={workExperience} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <CertificateCard certificate={workExperience.certificate} />
          </motion.div>
        </div>

        {/* Workstreams explorer */}
        <motion.div variants={fadeUp}>
          <p className="font-mono text-xs mb-4" style={{ color: 'var(--text-3)' }}>
            WORKSTREAMS &amp; PROJECTS — {String(streams.length).padStart(2, '0')}
          </p>

          <div className="grid lg:grid-cols-[minmax(260px,340px)_1fr] gap-6">
            {/* Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3" role="tablist" aria-label="Workstreams">
              {streams.map((s, idx) => {
                const Icon = ICONS[s.icon] || Workflow
                const isActive = s.id === active.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    id={`work-tab-${s.id}`}
                    aria-selected={isActive}
                    aria-controls="work-panel"
                    onClick={() => setActiveId(s.id)}
                    className="text-left rounded-xl p-4 flex items-center gap-4 transition-all duration-300"
                    style={{
                      background: isActive ? `${s.color}0d` : 'var(--panel)',
                      border: `1px solid ${isActive ? s.color + '40' : 'var(--border)'}`,
                      boxShadow: isActive ? `0 0 24px ${s.color}12` : 'none',
                      transform: isActive ? 'translateX(4px)' : 'none',
                    }}
                  >
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: 'var(--text-4)' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}12`, color: s.color }}
                    >
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-sm" style={{ color: isActive ? 'var(--text-1)' : 'var(--text-2)' }}>
                        {s.title}
                      </span>
                      <span className="block font-mono text-[0.65rem] mt-0.5 truncate" style={{ color: 'var(--text-3)' }}>
                        {s.subtitle}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Detail */}
            <div id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${active.id}`} className="min-h-[360px]">
              <AnimatePresence mode="wait">
                <WorkstreamDetail key={active.id} stream={active} />
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
