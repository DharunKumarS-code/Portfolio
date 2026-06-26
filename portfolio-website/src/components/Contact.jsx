import { Mail, Linkedin, Github, Send } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import API_URL from '../api'
import { useMouseTilt } from '../hooks/useMouseTilt'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
}

function SocialCard({ href, icon: Icon, label, value, iconBg, iconColor, ...props }) {
  const tiltRef = useMouseTilt({ maxTilt: 10, scale: 1.03, speed: 400 })

  return (
    <motion.a
      ref={tiltRef}
      href={href}
      className="flex items-center gap-4 p-4 card"
      variants={itemVariants}
      {...props}
    >
      <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
        <Icon className={iconColor} size={20} />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </motion.a>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Something went wrong')
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Open to internship opportunities in AI, Data Analytics & Software Development
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm actively looking for internship opportunities. Whether you have a project, a role, or just want to chat about AI and data — feel free to reach out!
              </p>
            </motion.div>

            <div className="space-y-4">
              <SocialCard
                href="mailto:sdharun7010@gmail.com"
                icon={Mail}
                label="Email"
                value="sdharun7010@gmail.com"
                iconBg="bg-indigo-100 dark:bg-indigo-900/30"
                iconColor="text-indigo-600 dark:text-indigo-400"
              />
              <SocialCard
                href="https://www.linkedin.com/in/dharun-kumar-8504a4290"
                target="_blank"
                rel="noopener noreferrer"
                icon={Linkedin}
                label="LinkedIn"
                value="linkedin.com/in/dharun-kumar-8504a4290"
                iconBg="bg-blue-100 dark:bg-blue-900/30"
                iconColor="text-blue-600 dark:text-blue-400"
              />
              <SocialCard
                href="https://github.com/DharunKumarS-code"
                target="_blank"
                rel="noopener noreferrer"
                icon={Github}
                label="GitHub"
                value="github.com/DharunKumarS-code"
                iconBg="bg-gray-100 dark:bg-gray-800"
                iconColor="text-gray-700 dark:text-gray-300"
              />
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow transition-all"
                placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow transition-all"
                placeholder="sdharun7010@gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow transition-all resize-none"
                placeholder="Tell me about the opportunity..." />
            </div>
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'loading' && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {status === 'success' ? '✓ Message Sent!' : status === 'loading' ? 'Sending...' : <><Send size={18} /> Send Message</>}
            </motion.button>
            {status === 'error' && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
            {status === 'success' && <p className="text-emerald-500 text-sm text-center">Thanks! I'll get back to you soon.</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
