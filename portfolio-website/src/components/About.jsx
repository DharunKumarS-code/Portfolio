import { motion } from 'framer-motion'
import { GraduationCap, Target, Lightbulb } from 'lucide-react'
import { useMouseTilt } from '../hooks/useMouseTilt'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
}

function AboutCard({ icon: Icon, title, description, iconBg, iconColor }) {
  const tiltRef = useMouseTilt({ maxTilt: 12, scale: 1.03, speed: 400 })

  return (
    <motion.div
      ref={tiltRef}
      className="card p-8 text-center glow-border"
      variants={itemVariants}
    >
      <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
        <Icon className={iconColor} size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <AboutCard
            icon={GraduationCap}
            title="Education"
            description="Computer Science Student at Sri Krishna College of Engineering and Technology"
            iconBg="bg-indigo-100 dark:bg-indigo-900/30"
            iconColor="text-indigo-600 dark:text-indigo-400"
          />
          <AboutCard
            icon={Target}
            title="Interests"
            description="AI, Data Analytics, Software Development, and Machine Learning"
            iconBg="bg-purple-100 dark:bg-purple-900/30"
            iconColor="text-purple-600 dark:text-purple-400"
          />
          <AboutCard
            icon={Lightbulb}
            title="Mission"
            description="Solving real-world problems through innovative technology solutions"
            iconBg="bg-emerald-100 dark:bg-emerald-900/30"
            iconColor="text-emerald-600 dark:text-emerald-400"
          />
        </motion.div>

        <motion.div
          className="mt-16 card p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            I'm a Computer Science student with a strong passion for building intelligent systems that create real impact. 
            My expertise spans across AI/ML, data analytics, and full-stack development. I love transforming complex problems 
            into elegant, scalable solutions using cutting-edge technologies like RAG pipelines, NLP, and interactive dashboards.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
