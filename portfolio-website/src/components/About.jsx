import { GraduationCap, Target, Lightbulb } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 reveal">About Me</h2>
        
        <div className="grid md:grid-cols-3 gap-8 stagger">
          <div className="card p-8 text-center reveal">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="text-indigo-600 dark:text-indigo-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Education</h3>
            <p className="text-gray-600 dark:text-gray-400">Computer Science Student at Sri Krishna College of Engineering and Technology</p>
          </div>

          <div className="card p-8 text-center reveal">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="text-purple-600 dark:text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interests</h3>
            <p className="text-gray-600 dark:text-gray-400">AI, Data Analytics, Software Development, and Machine Learning</p>
          </div>

          <div className="card p-8 text-center reveal">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="text-emerald-600 dark:text-emerald-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Mission</h3>
            <p className="text-gray-600 dark:text-gray-400">Solving real-world problems through innovative technology solutions</p>
          </div>
        </div>

        <div className="mt-16 card p-8 reveal">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            I'm a Computer Science student with a strong passion for building intelligent systems that create real impact. 
            My expertise spans across AI/ML, data analytics, and full-stack development. I love transforming complex problems 
            into elegant, scalable solutions using cutting-edge technologies like RAG pipelines, NLP, and interactive dashboards.
          </p>
        </div>
      </div>
    </section>
  )
}
