import { experience } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 reveal">Experience & Learning</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16 reveal">Hands-on expertise across domains</p>

        <div className="grid sm:grid-cols-2 gap-6 stagger">
          {experience.map(({ title, desc, icon }) => (
            <div key={title} className="card p-6 flex gap-4 reveal hover:-translate-y-1">
              <div className="text-3xl flex-shrink-0">{icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
