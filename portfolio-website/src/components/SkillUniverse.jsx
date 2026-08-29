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

export default function SkillUniverse() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  // Flatten all skills with category info in structured order
  const allSkills = skills.flatMap(cat =>
    cat.items.map(item => ({
      name: item,
      category: cat.category,
      color: COLOR_MAP[cat.category] || '#22d3ee',
    }))
  )

  const totalSkills = allSkills.length

  // Calculate 2-ring staggered layout coordinates for perfect spacing and zero overlap
  const nodeData = allSkills.map((skill, idx) => {
    // Distribute angles evenly around 360 degrees, starting from top (-PI/2)
    const angle = (idx / totalSkills) * Math.PI * 2 - Math.PI / 2
    // Alternate between Inner Ring (155px) and Outer Ring (255px)
    const radius = idx % 2 === 0 ? 155 : 255
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return {
      ...skill,
      idx,
      x,
      y,
      radius,
      angle,
    }
  })

  const isVisible = (skill) => {
    if (!activeCategory) return true
    return skill.category === activeCategory
  }

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

        {/* 2D Orbital Radar Map */}
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden my-4">

          {/* SVG Overlay: Central Orbital Rings & Radiant Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            <g transform="translate(50% 50%)">
              {/* Inner Orbit Circle (155px) */}
              <circle
                r="155"
                fill="none"
                stroke="rgba(34,211,238,0.12)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              {/* Outer Orbit Circle (255px) */}
              <circle
                r="255"
                fill="none"
                stroke="rgba(129,140,248,0.1)"
                strokeWidth="1"
                strokeDasharray="6 8"
              />

              {/* Radiant lines connecting center (0,0) to each node (x,y) */}
              {nodeData.map(node => {
                const active = isVisible(node)
                const isHovered = hoveredSkill === node.name
                return (
                  <line
                    key={`line-${node.name}-${node.idx}`}
                    x1="0"
                    y1="0"
                    x2={node.x}
                    y2={node.y}
                    stroke={node.color}
                    strokeWidth={isHovered ? 1.8 : 1}
                    strokeOpacity={isHovered ? 0.8 : active ? (activeCategory ? 0.4 : 0.18) : 0.05}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                )
              })}
            </g>
          </svg>

          {/* Central DHARUN Node */}
          <motion.div
            className="absolute z-20 flex flex-col items-center justify-center rounded-full font-bold select-none cursor-pointer"
            style={{
              width: 86,
              height: 86,
              background: 'radial-gradient(circle, rgba(34,211,238,0.18), var(--panel))',
              border: '2px solid rgba(34,211,238,0.5)',
              color: 'var(--cyan)',
              boxShadow: '0 0 40px rgba(34,211,238,0.25)',
              fontFamily: 'Space Grotesk',
              fontSize: '0.85rem',
            }}
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

          {/* Skill Node Pills */}
          {nodeData.map(node => {
            const active = isVisible(node)
            const isHovered = hoveredSkill === node.name

            return (
              <motion.div
                key={`node-${node.name}-${node.idx}`}
                className="absolute flex items-center justify-center cursor-pointer select-none"
                style={{
                  left: `calc(50% + ${node.x}px)`,
                  top: `calc(50% + ${node.y}px)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered ? 30 : active ? 10 : 1,
                  opacity: active ? 1 : 0.25,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: active ? 1 : 0.25, scale: 1 }}
                transition={{ delay: node.idx * 0.02, type: 'spring', stiffness: 120 }}
                onMouseEnter={() => setHoveredSkill(node.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.12 }}
              >
                <div
                  className="px-3.5 py-1.5 rounded-full font-mono text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5"
                  style={{
                    background: isHovered
                      ? `${node.color}25`
                      : active
                      ? 'var(--panel)'
                      : 'rgba(15,22,41,0.5)',
                    border: `1px solid ${
                      isHovered
                        ? node.color
                        : active
                        ? `${node.color}40`
                        : 'var(--border)'
                    }`,
                    color: isHovered ? 'var(--text-1)' : active ? node.color : 'var(--text-3)',
                    boxShadow: isHovered ? `0 0 20px ${node.color}40` : 'none',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background: node.color }}
                  />
                  {node.name}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Hovered Skill Context Banner */}
        <div className="text-center mt-2 h-8 flex items-center justify-center">
          {hoveredSkill ? (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-sm"
              style={{ color: 'var(--cyan)' }}
            >
              {`> ${hoveredSkill} [${
                allSkills.find(s => s.name === hoveredSkill)?.category || 'Skill'
              }]`}
            </motion.p>
          ) : (
            <p className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
              — Hover over any technology node to inspect details —
            </p>
          )}
        </div>

        {/* Skill grid (categorized fallback list) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              className="p-4 rounded-xl transition-all duration-200"
              style={{
                background: 'var(--panel)',
                border: `1px solid ${
                  activeCategory === cat.category
                    ? COLOR_MAP[cat.category]
                    : 'var(--border)'
                }`,
                boxShadow:
                  activeCategory === cat.category
                    ? `0 0 20px ${COLOR_MAP[cat.category]}20`
                    : 'none',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span>{cat.icon}</span>
                <p
                  className="font-mono text-xs font-bold tracking-wider"
                  style={{ color: COLOR_MAP[cat.category] }}
                >
                  {cat.category.toUpperCase()}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map(item => (
                  <span
                    key={item}
                    className="tech-pill cursor-pointer transition-transform hover:scale-105"
                    style={{
                      borderColor:
                        hoveredSkill === item
                          ? COLOR_MAP[cat.category]
                          : undefined,
                      color:
                        hoveredSkill === item
                          ? 'var(--text-1)'
                          : COLOR_MAP[cat.category],
                    }}
                    onMouseEnter={() => setHoveredSkill(item)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
