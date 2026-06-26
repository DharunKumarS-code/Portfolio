import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { experience } from '../data'
import { useMouseTilt } from '../hooks/useMouseTilt'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
}

function ExperienceCard({ title, desc, icon, link }) {
  const tiltRef = useMouseTilt({ maxTilt: 8, scale: 1.02, speed: 400 })

  return (
    <motion.div ref={tiltRef} className="card p-6 flex gap-4" variants={cardVariants}>
      <div className="text-3xl flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            View Internship Letter <ExternalLink size={12} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          Experience & Learning
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hands-on expertise across domains
        </motion.p>

        <motion.div
          className="grid sm:grid-cols-2 gap-6 timeline-connector"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {experience.map(({ title, desc, icon, link }) => (
            <ExperienceCard key={title} title={title} desc={desc} icon={icon} link={link} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
