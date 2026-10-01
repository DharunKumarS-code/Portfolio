import { useRef, useState, useLayoutEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../data'

const COLOR_MAP = {
  'Programming': '#22d3ee',
  'AI / ML': '#818cf8',
  'Data Tools': '#6ee7b7',
  'Dev Tools': '#fb923c',
  'Databases': '#f472b6',
  'Concepts': '#a78bfa',
}

// Fixed, deterministic slot assignment — never random coordinates.
const SLOT_MAP = {
  'AI / ML': 'aiml',
  'Programming': 'prog',
  'Data Tools': 'data',
  'Databases': 'db',
  'Concepts': 'concepts',
  'Dev Tools': 'dev',
}

function CoreNode({ compact }) {
  return (
    <motion.div
      className={`skill-core-circle ${compact ? 'skill-core-circle-sm' : ''}`}
      animate={{
        boxShadow: [
          '0 0 30px rgba(34,211,238,0.15)',
          '0 0 55px rgba(34,211,238,0.35)',
          '0 0 30px rgba(34,211,238,0.15)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span>DHARUN</span>
      <span className="font-mono text-[9px] font-normal tracking-wider" style={{ color: 'var(--text-3)' }}>
        CORE
      </span>
    </motion.div>
  )
}

function SkillPill({ name, color, isHovered, onHover }) {
  return (
    <button
      type="button"
      className="skill-pill"
      aria-label={name}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(name)}
      onBlur={() => onHover(null)}
      style={{
        background: isHovered ? `${color}22` : 'var(--panel)',
        borderColor: isHovered ? color : `${color}35`,
        color: isHovered ? 'var(--text-1)' : color,
        boxShadow: isHovered ? `0 0 16px ${color}40` : 'none',
      }}
    >
      <span className="skill-pill-dot" style={{ background: color }} />
      {name}
    </button>
  )
}

function SkillCluster({ cat, color, activeCategory, hoveredSkill, setHoveredSkill, slotClass, clusterRef, inView, delay }) {
  const isDimmed = Boolean(activeCategory) && activeCategory !== cat.category

  return (
    <motion.div
      ref={clusterRef}
      className={`skill-cluster ${slotClass || ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: isDimmed ? 0.35 : 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      style={{
        borderColor: activeCategory === cat.category ? color : 'var(--border)',
        boxShadow: activeCategory === cat.category ? `0 0 24px ${color}22` : 'none',
      }}
    >
      <div className="skill-cluster-heading" style={{ color }}>
        <span>{cat.icon}</span>
        <span>{cat.category.toUpperCase()}</span>
      </div>
      <div className="skill-cluster-pills">
        {cat.items.map(item => (
          <SkillPill
            key={item}
            name={item}
            color={color}
            isHovered={hoveredSkill === item}
            onHover={setHoveredSkill}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillUniverse() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  const mapRef = useRef(null)
  const coreRef = useRef(null)
  const clusterRefs = useRef({})
  const [lines, setLines] = useState([])

  // Measure the actual rendered positions of the core and each cluster so the
  // connecting lines always land on real geometry — never guessed coordinates.
  useLayoutEffect(() => {
    function measure() {
      const containerEl = mapRef.current
      const coreEl = coreRef.current
      if (!containerEl || !coreEl) return

      const containerRect = containerEl.getBoundingClientRect()
      // The desktop/tablet map is display:none on mobile — skip measuring then.
      if (containerRect.width === 0 || containerRect.height === 0) {
        setLines([])
        return
      }

      const coreRect = coreEl.getBoundingClientRect()
      const coreCenter = {
        x: coreRect.left + coreRect.width / 2 - containerRect.left,
        y: coreRect.top + coreRect.height / 2 - containerRect.top,
      }

      const nextLines = skills
        .map(cat => {
          const el = clusterRefs.current[cat.category]
          if (!el) return null
          const r = el.getBoundingClientRect()
          return {
            category: cat.category,
            x1: coreCenter.x,
            y1: coreCenter.y,
            x2: r.left + r.width / 2 - containerRect.left,
            y2: r.top + r.height / 2 - containerRect.top,
          }
        })
        .filter(Boolean)

      setLines(nextLines)
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (mapRef.current) ro.observe(mapRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section
      id="stack"
      ref={ref}
      className="section"
      aria-label="Skills — Technology Stack"
      style={{ background: 'var(--deep)' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label justify-center">04 — STACK</div>
          <h2 className="heading-lg" style={{ color: 'var(--text-1)' }}>
            Technology{' '}
            <span className="text-gradient-cyan">Ecosystem</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-2)' }}>
            An interconnected universe of technologies I use to build intelligent systems.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className="font-mono text-xs px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: !activeCategory ? 'rgba(34,211,238,0.12)' : 'var(--panel)',
              border: `1px solid ${!activeCategory ? 'rgba(34,211,238,0.4)' : 'var(--border)'}`,
              color: !activeCategory ? 'var(--cyan)' : 'var(--text-3)',
            }}
          >
            ALL
          </button>
          {skills.map(cat => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category === activeCategory ? null : cat.category)}
              className="font-mono text-xs px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: activeCategory === cat.category ? `${COLOR_MAP[cat.category]}18` : 'var(--panel)',
                border: `1px solid ${activeCategory === cat.category ? COLOR_MAP[cat.category] : 'var(--border)'}`,
                color: activeCategory === cat.category ? COLOR_MAP[cat.category] : 'var(--text-3)',
              }}
            >
              {cat.icon} {cat.category}
            </button>
          ))}
        </motion.div>

        {/* Desktop / tablet skill map — fixed grid slots, zero random positioning */}
        <div className="skill-map" ref={mapRef}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
            {lines.map(line => {
              const isActiveCat = !activeCategory || activeCategory === line.category
              const isHoveredCat = Boolean(
                hoveredSkill && skills.find(c => c.category === line.category)?.items.includes(hoveredSkill)
              )
              return (
                <line
                  key={line.category}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={COLOR_MAP[line.category]}
                  strokeWidth={isHoveredCat ? 1.8 : 1}
                  strokeDasharray="4 6"
                  strokeOpacity={isHoveredCat ? 0.7 : isActiveCat ? 0.3 : 0.08}
                  style={{ transition: 'stroke-opacity 0.3s ease, stroke-width 0.3s ease' }}
                />
              )
            })}
          </svg>

          <div className="skill-core" ref={coreRef}>
            <div className="skill-core-ring ring-1" />
            <div className="skill-core-ring ring-2" />
            <CoreNode />
          </div>

          {skills.map((cat, idx) => (
            <SkillCluster
              key={cat.category}
              cat={cat}
              color={COLOR_MAP[cat.category]}
              activeCategory={activeCategory}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              slotClass={`skill-slot-${SLOT_MAP[cat.category]}`}
              clusterRef={el => { clusterRefs.current[cat.category] = el }}
              inView={inView}
              delay={0.1 + idx * 0.05}
            />
          ))}
        </div>

        {/* Mobile — structured stacked clusters, no orbital layout */}
        <div className="skill-map-mobile">
          <div className="skill-core-mobile">
            <CoreNode compact />
          </div>
          {skills.map((cat, idx) => (
            <SkillCluster
              key={cat.category}
              cat={cat}
              color={COLOR_MAP[cat.category]}
              activeCategory={activeCategory}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              inView={inView}
              delay={0.1 + idx * 0.05}
            />
          ))}
        </div>

        {/* Hovered Skill Context Banner */}
        <div className="text-center mt-8 h-8 flex items-center justify-center">
          {hoveredSkill ? (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-sm"
              style={{ color: 'var(--cyan)' }}
            >
              {`> ${hoveredSkill} [${
                skills.find(c => c.items.includes(hoveredSkill))?.category || 'Skill'
              }]`}
            </motion.p>
          ) : (
            <p className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
              — Hover over any technology to inspect details —
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
