import { useState } from 'react'
import { ExternalLink, Award, Filter, BadgeCheck } from 'lucide-react'
import { certificates } from '../data'

const categories = ['All', 'AI/ML', 'Data Analytics', 'Cloud & DevOps', 'Professional Skills']

const categoryIcons = {
  'AI/ML': '🤖',
  'Data Analytics': '📊',
  'Cloud & DevOps': '☁️',
  'Professional Skills': '🎯',
  'Other': '📜',
}

export default function Certificates() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? certificates : certificates.filter((c) => c.category === active)

  return (
    <section id="certificates" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 reveal">
            <Award className="text-indigo-500" size={36} />
            <h2 className="text-4xl md:text-5xl font-bold">Certificates</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 reveal">Verified credentials and course completions</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 reveal">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 border border-gray-200 dark:border-gray-700'
              }`}>
              {cat === 'All' && <Filter size={14} />} {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {filtered.map((cert) => (
            <div key={cert.id} className="card overflow-hidden reveal group hover:-translate-y-1">
              {/* Top gradient banner */}
              <div className={`h-28 bg-gradient-to-br ${cert.color} flex items-center justify-center relative`}>
                <span className="text-5xl">{categoryIcons[cert.category] || '📜'}</span>
                <div className="absolute top-3 right-3">
                  <BadgeCheck className="text-white/80" size={22} />
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-base font-semibold mb-1 leading-snug">{cert.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cert.issuer} · {cert.date}</p>
                <a
                  href={cert.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all">
                  <ExternalLink size={14} /> View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-16">No certificates in this category.</p>
        )}
      </div>
    </section>
  )
}
