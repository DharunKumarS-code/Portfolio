import { useState } from 'react'
import { ExternalLink, Award, Filter } from 'lucide-react'
import { certificates } from '../data'

const categories = ['All', 'AI/ML', 'Data Analytics', 'Cloud', 'Development', 'Other']

export default function Certificates() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? certificates : certificates.filter((c) => c.category === active)

  // Convert Google Drive view link to embeddable preview link
  const getPreviewUrl = (driveLink) => {
    const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (!match) return null
    return `https://drive.google.com/file/d/${match[1]}/preview`
  }

  return (
    <section id="certificates" className="section-padding">
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
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
              }`}>
              {cat === 'All' && <Filter size={14} />} {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
          {filtered.map((cert) => (
            <div key={cert.id} className="card overflow-hidden reveal group hover:-translate-y-1">
              {/* PDF Preview */}
              <div className="relative w-full h-52 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <iframe
                  src={getPreviewUrl(cert.driveLink)}
                  className="w-full h-full border-0 pointer-events-none"
                  title={cert.title}
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <a href={cert.driveLink} target="_blank" rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium">
                  <ExternalLink size={20} /> View Certificate
                </a>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${cert.color} mb-4`} />
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  {cert.category}
                </span>
                <h3 className="text-lg font-semibold mt-3 mb-1">{cert.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">{cert.date}</span>
                  <a href={cert.driveLink} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                    View <ExternalLink size={12} />
                  </a>
                </div>
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
