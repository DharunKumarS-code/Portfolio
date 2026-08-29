import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X, ArrowRight } from 'lucide-react'
import { projects } from '../data'

const PIPELINE_TYPES = {
  rag: {
    label: 'RAG PIPELINE',
    steps: ['PDF Input', 'Embeddings', 'FAISS Store', 'LLM Query', 'Answer'],
    colors: ['#22d3ee', '#818cf8', '#a78bfa', '#6ee7b7', '#22d3ee'],
  },
  analytics: {
    label: 'ANALYTICS PIPELINE',
    steps: ['Raw Data', 'Excel Clean', 'Data Model', 'DAX Calc', 'Dashboard'],
    colors: ['#6ee7b7', '#22d3ee', '#818cf8', '#a78bfa', '#6ee7b7'],
  },
  ml: {
    label: 'ML PIPELINE',
    steps: ['Data', 'Preprocess', 'Model', 'Train', 'Predict'],
    colors: ['#818cf8', '#22d3ee', '#a78bfa', '#6ee7b7', '#f472b6'],
  },
  software: {
    label: 'DEV PIPELINE',
    steps: ['Requirements', 'Design', 'Implement', 'Test', 'Deploy'],
    colors: ['#fb923c', '#22d3ee', '#818cf8', '#6ee7b7', '#a78bfa'],
  },
}

const CATEGORY_COLORS = {
  'AI/ML': '#818cf8',
  'Data Analytics': '#6ee7b7',
  'Software Dev': '#fb923c',
}

function Pipeline({ type }) {
  const pipeline = PIPELINE_TYPES[type] || PIPELINE_TYPES.ml
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {pipeline.steps.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              background: `${pipeline.colors[i]}12`,
              border: `1px solid ${pipeline.colors[i]}30`,
              color: pipeline.colors[i],
            }}
          >
            {step}
          </span>
          {i < pipeline.steps.length - 1 && (
            <ArrowRight size={10} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  )
}

function CaseStudyModal({ project, onClose }) {
  const sections = [
    { num: '01', title: 'PROBLEM', content: project.problem },
    { num: '02', title: 'SOLUTION', content: project.solution },
    { num: '03', title: 'ARCHITECTURE', content: project.architecture },
    { num: '04', title: 'IMPLEMENTATION', content: `Built using: ${project.tech.join(', ')}` },
    { num: '05', title: 'RESULT', content: project.result },
    { num: '06', title: 'LEARNINGS', content: project.learnings },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2,8,23,0.95)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: 'var(--deep)', border: '1px solid var(--border-bright)' }}
        initial={{ scale: 0.92, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 40 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-start justify-between p-6 pb-4"
          style={{ background: 'var(--deep)', borderBottom: '1px solid var(--border)', zIndex: 1 }}
        >
          <div>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded mb-2 inline-block"
              style={{
                background: `${CATEGORY_COLORS[project.category] || 'var(--cyan)'}15`,
                color: CATEGORY_COLORS[project.category] || 'var(--cyan)',
                border: `1px solid ${CATEGORY_COLORS[project.category] || 'var(--cyan)'}30`,
              }}
            >
              {project.category}
            </span>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl transition-all"
            style={{ color: 'var(--text-3)', border: '1px solid var(--border)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Pipeline visualization */}
          <div className="p-4 rounded-xl" style={{ background: 'var(--panel)', border: '1px solid var(--border)' }}>
            <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-3)' }}>
              {PIPELINE_TYPES[project.pipelineType]?.label || 'PIPELINE'}
            </p>
            <Pipeline type={project.pipelineType} />
          </div>

          {/* Case study sections */}
          {sections.map(({ num, title, content }) => (
            <div key={num} className="flex gap-4">
              <span className="font-mono text-sm font-bold mt-0.5 w-8 flex-shrink-0" style={{ color: 'var(--cyan)' }}>
                {num}
              </span>
              <div>
                <p className="font-mono text-xs mb-1" style={{ color: 'var(--text-3)' }}>{title}</p>
                <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>{content}</p>
              </div>
            </div>
          ))}

          {/* Tech stack */}
          <div className="flex gap-4">
            <span className="w-8" />
            <div>
              <p className="font-mono text-xs mb-2" style={{ color: 'var(--text-3)' }}>TECH STACK</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Github size={16} /> View Code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectLab() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section
      id="lab"
      ref={ref}
      className="section"
      aria-label="Projects — AI Lab"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="section-label">05 — LAB</div>
          <h2 className="heading-lg" style={{ color: 'var(--text-1)' }}>
            AI <span className="text-gradient-cyan">Laboratory</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--text-2)' }}>
            Production-grade experiments in AI, ML, and software engineering.
            Click any project to explore the full case study.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              className="project-card cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setSelectedProject(project)}
              aria-label={`View ${project.title} case study`}
            >
              {/* Card header gradient */}
              <div
                className="h-2 w-full"
                style={{
                  background: `linear-gradient(90deg, ${CATEGORY_COLORS[project.category] || 'var(--cyan)'}, transparent)`,
                }}
              />

              <div className="p-6">
                {/* Category + featured badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      background: `${CATEGORY_COLORS[project.category] || 'var(--cyan)'}12`,
                      color: CATEGORY_COLORS[project.category] || 'var(--cyan)',
                      border: `1px solid ${CATEGORY_COLORS[project.category] || 'var(--cyan)'}25`,
                    }}
                  >
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="badge badge-in-progress">★ FEATURED</span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
                  {project.title}
                </h3>

                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-2)' }}>
                  {project.problem}
                </p>

                {/* Pipeline preview */}
                <div className="mb-5">
                  <Pipeline type={project.pipelineType} />
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.slice(0, 4).map(t => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="tech-pill">+{project.tech.length - 4}</span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs transition-colors"
                      style={{ color: 'var(--text-3)' }}
                      onClick={e => e.stopPropagation()}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                    >
                      <Github size={14} /> GitHub
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs transition-colors"
                        style={{ color: 'var(--cyan)' }}
                        onClick={e => e.stopPropagation()}
                        onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--cyan)'}
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                  <span
                    className="font-mono text-xs flex items-center gap-1"
                    style={{ color: 'var(--cyan)' }}
                  >
                    CASE STUDY <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
