import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Star, Code2, Layers } from 'lucide-react'
import { projects } from '../data'
import { useMouseTilt } from '../hooks/useMouseTilt'

const categories = ['All', 'AI/ML', 'Data Analytics', 'Software Dev']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
}

function ProjectCard({ project }) {
  const tiltRef = useMouseTilt({ maxTilt: 10, scale: 1.02, speed: 400 })

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="h-[420px]"
    >
      <div ref={tiltRef} className="card-3d-container glow-border h-full">
        <div className="card-3d-inner">
          {/* Front Face */}
          <div className="card-3d-front bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-6 flex flex-col gap-3">
            <div className={`h-2 rounded-full bg-gradient-to-r ${project.color}`} />
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{project.category}</span>
                  {project.featured && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold">{project.title}</h3>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>

            <ul className="space-y-1">
              {project.features.map((f) => (
                <li key={f} className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />{f}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{t}</span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500">+{project.tech.length - 3}</span>
                )}
              </div>
              <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium flex items-center gap-1">
                <Layers size={12} /> Hover to flip
              </span>
            </div>
          </div>

          {/* Back Face */}
          <div className={`card-3d-back bg-gradient-to-br ${project.color} p-6 flex flex-col gap-4 text-white`}>
            <div className="flex items-center gap-2 mb-1">
              <Code2 size={20} />
              <h3 className="text-lg font-bold">{project.title}</h3>
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold mb-3 text-white/90 uppercase tracking-wider">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm font-medium">{t}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2 text-white/90 uppercase tracking-wider">Key Features</p>
              <ul className="space-y-1.5">
                {project.features.map((f) => (
                  <li key={f} className="text-xs text-white/85 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>

            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all text-sm font-semibold mt-auto">
              <Github size={16} /> View on GitHub <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = projects.filter((p) => {
    const matchCat = active === 'All' || p.category === active
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Real-world solutions built with modern tech
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${active === cat
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                }`}>
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow transition-all"
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            className="text-center text-gray-500 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects found. Try a different filter.
          </motion.p>
        )}
      </div>
    </section>
  )
}
