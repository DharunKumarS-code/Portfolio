import { useState } from 'react'
import { Github, ExternalLink, Star } from 'lucide-react'
import { projects } from '../data'

const categories = ['All', 'AI/ML', 'Data Analytics', 'Software Dev']

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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 reveal">Projects</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 reveal">Real-world solutions built with modern tech</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 reveal">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${active === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'}`}>
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {filtered.map((project) => (
            <div key={project.id} className="card p-6 flex flex-col gap-4 reveal group">
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

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{t}</span>
                ))}
              </div>

              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-auto">
                <Github size={16} /> View on GitHub <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-16">No projects found. Try a different filter.</p>
        )}
      </div>
    </section>
  )
}
