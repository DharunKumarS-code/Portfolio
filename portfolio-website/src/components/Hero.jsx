import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react'
import { useMouseTilt } from '../hooks/useMouseTilt'
import ParticleCanvas from './ParticleCanvas'

const taglines = [
  'AI Enthusiast',
  'Data Analytics',
  'Software Developer',
  'CS Student',
]

function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1))
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        setText(currentWord.slice(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return text
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

export default function Hero() {
  const typedText = useTypewriter(taglines)
  const profileTiltRef = useMouseTilt({ maxTilt: 20, scale: 1.05, speed: 300 })

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-32 overflow-hidden">
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Animated Gradient Blobs */}
      <div className="hero-blob hero-blob-1 animate-blob-1" aria-hidden="true" />
      <div className="hero-blob hero-blob-2 animate-blob-2" aria-hidden="true" />
      <div className="hero-blob hero-blob-3 animate-blob-3" aria-hidden="true" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Picture with 3D Tilt + Float */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <div
            ref={profileTiltRef}
            className="relative w-36 h-36 md:w-44 md:h-44 animate-float cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-lg opacity-50 scale-110 animate-glow-pulse" />
            <img
              src="/profile.jpg"
              alt="Dharun Kumar"
              className="relative w-full h-full rounded-full object-cover object-top border-4 border-white dark:border-gray-900 shadow-xl"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Hi, I'm <span className="gradient-text">Dharun Kumar</span>
          </h1>

          {/* Typewriter Tagline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 h-8">
            <span>{typedText}</span>
            <span className="typewriter-cursor" />
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Passionate about solving real-world problems using AI, data analytics, and modern software development.
          Building intelligent systems that make an impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
          <a href="#projects" className="btn-primary flex items-center gap-2">
            View My Work <ArrowDown size={18} />
          </a>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
          <a href="https://drive.google.com/file/d/1vl6BEhEU8iS9jXYiaOpBJUkydtBUjHlL/view?usp=sharing" download className="btn-outline flex items-center gap-2">
            <Download size={18} /> Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div className="flex justify-center gap-6 pt-4" variants={itemVariants}>
          <a href="https://github.com/DharunKumarS-code" target="_blank" rel="noopener noreferrer"
            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110 hover:shadow-glow">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/dharun-kumar-8504a4290" target="_blank" rel="noopener noreferrer"
            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110 hover:shadow-glow">
            <Linkedin size={24} />
          </a>
          <a href="mailto:sdharun7010@gmail.com"
            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110 hover:shadow-glow">
            <Mail size={24} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
