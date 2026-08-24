import { useRef, useState } from 'react'
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

// 2D force-layout simulation for skill nodes (works on all devices)
function SkillNode({ skill, catColor, index, total, active, onHover }) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const radius = 180 + Math.sin(index * 1.3) * 30
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius

  return (
    <motion.div
      className="absolute flex items-center justify-center cursor-pointer"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        zIndex: active ? 10 : 1,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 120 }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.15 }}
    >
      {/* Connection line to center */}
      <svg
        className="absolute pointer-events-none"
        style={{
          width: Math.abs(x) + 40,
          height: Math.abs(y) + 40,
          left: x < 0 ? x - 20 : -20,
          top: y < 0 ? y - 20 : -20,
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <line
          x1={x < 0 ? Math.abs(x) + 20 : 20}
          y1={y < 0 ? Math.abs(y) + 20 : 20}
          x2={x < 0 ? 20 : Math.abs(x) + 20}
          y2={y < 0 ? 20 : Math.abs(y) + 20}
          stroke={catColor}
          strokeWidth="0.8"
          strokeOpacity={active ? 0.6 : 0.15}
        />
      </svg>

      {/* Node pill */}
      <div
        className="px-3 py-1.5 rounded-full font-mono text-xs font-medium whitespace-nowrap transition-all duration-200"
        style={{
          background: active ? `${catColor}18` : 'var(--panel)',
          border: `1px solid ${active ? catColor : 'var(--border)'}`,
          color: active ? catColor : 'var(--text-3)',
          boxShadow: active ? `0 0 15px ${catColor}30` : 'none',
        }}
      >
        {skill}
      </div>
    </motion.div>
  )
}

export default function SkillUniverse() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  // Flatten all skills with category info
  const allSkills = skills.flatMap(cat =>
    cat.items.map(item => ({
      name: item,
      category: cat.category,
      color: COLOR_MAP[cat.category] || '#22d3ee',
    }))
  )

  const displayedSkills = activeCategory
    ? allSkills.filter(s => s.category === activeCategory)
    : allSkills

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
          className="text-center mb-16"
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
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
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

        {/* Node visualization */}
        <div className="relative w-full h-[520px] flex items-center justify-center overflow-hidden">
          {/* Center node */}
          <motion.div
            className="absolute z-20 flex items-center justify-center rounded-full font-bold"
            style={{
              width: 80,
              height: 80,
              background: 'radial-gradient(circle, rgba(34,211,238,0.15), var(--panel))',
              border: '2px solid rgba(34,211,238,0.4)',
              color: 'var(--cyan)',
              boxShadow: '0 0 40px rgba(34,211,238,0.2)',
              fontFamily: 'Space Grotesk',
              fontSize: '0.8rem',
            }}
            animate={{ boxShadow: ['0 0 30px rgba(34,211,238,0.15)', '0 0 50px rgba(34,211,238,0.3)', '0 0 30px rgba(34,211,238,0.15)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            DHARUN
          </motion.div>

          {/* Skill nodes */}
          {displayedSkills.map((skill, idx) => (
            <SkillNode
              key={skill.name + idx}
              skill={skill.name}
              catColor={skill.color}
              index={idx}
              total={displayedSkills.length}
              active={hoveredSkill === skill.name}
              onHover={setHoveredSkill}
            />
          ))}
        </div>

        {/* Hovered skill detail */}
        <motion.div
          className="text-center mt-4 h-8"
          animate={{ opacity: hoveredSkill ? 1 : 0 }}
        >
          <p className="font-mono text-sm" style={{ color: 'var(--cyan)' }}>
            {hoveredSkill && `> ${hoveredSkill}`}
          </p>
        </motion.div>

        {/* Skill grid (accessible fallback / additional detail) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              className="p-4 rounded-xl"
              style={{ background: 'var(--panel)', border: '1px solid var(--border)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + idx * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span>{cat.icon}</span>
                <p
                  className="font-mono text-xs font-bold"
                  style={{ color: COLOR_MAP[cat.category] }}
                >
                  {cat.category.toUpperCase()}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map(item => (
                  <span key={item} className="tech-pill">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
