import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../data'

const categoryColors = {
  'Programming': { ring: '#6366f1', bg: 'from-indigo-500 to-indigo-600' },
  'AI / ML': { ring: '#a855f7', bg: 'from-purple-500 to-purple-600' },
  'Data Tools': { ring: '#10b981', bg: 'from-emerald-500 to-emerald-600' },
  'Dev Tools': { ring: '#f59e0b', bg: 'from-amber-500 to-amber-600' },
  'Databases': { ring: '#3b82f6', bg: 'from-blue-500 to-blue-600' },
  'Concepts': { ring: '#ec4899', bg: 'from-pink-500 to-pink-600' },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
      delay: i * 0.05,
    },
  }),
}

function RadialProgress({ color, category }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  // Decorative progress — varies by category for visual interest
  const progressMap = {
    'Programming': 78,
    'AI / ML': 85,
    'Data Tools': 80,
    'Dev Tools': 72,
    'Databases': 65,
    'Concepts': 88,
  }
  const progress = progressMap[category] || 75
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div ref={ref} className="relative w-16 h-16 flex-shrink-0">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
        {/* Background ring */}
        <circle cx="32" cy="32" r={radius} fill="none"
          stroke="currentColor" strokeWidth="4"
          className="text-gray-200 dark:text-gray-800" />
        {/* Progress ring */}
        <circle cx="32" cy="32" r={radius} fill="none"
          stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isInView ? offset : circumference}
          className="progress-ring-circle" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300">
        {isInView ? `${progress}%` : '0%'}
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Technologies and tools I work with
        </motion.p>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skills.map(({ category, items }) => {
            const colors = categoryColors[category] || { ring: '#6366f1', bg: 'from-indigo-500 to-indigo-600' }
            return (
              <motion.div key={category} className="card p-6" variants={cardVariants}>
                <div className="flex items-center gap-4 mb-5">
                  <RadialProgress color={colors.ring} category={category} />
                  <div>
                    <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{category}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{items.length} skills</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2" style={{ perspective: '600px' }}>
                  {items.map((item, i) => (
                    <motion.span
                      key={item}
                      custom={i}
                      variants={tagVariants}
                      className="skill-tag-3d px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-default select-none"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
