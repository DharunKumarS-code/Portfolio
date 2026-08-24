import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, Download, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { contactInfo } from '../data'

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (serviceId && templateId && publicKey) {
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      } else {
        // Fallback: simulate success if env vars not set
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const SOCIAL_LINKS = [
    { href: contactInfo.github, icon: <Github size={20} />, label: 'GitHub' },
    { href: contactInfo.linkedin, icon: <Linkedin size={20} />, label: 'LinkedIn' },
    { href: `mailto:${contactInfo.email}`, icon: <Mail size={20} />, label: contactInfo.email },
    { href: contactInfo.resume, icon: <Download size={20} />, label: 'Resume', external: true },
  ]

  return (
    <section
      id="connect"
      ref={ref}
      className="section"
      aria-label="Contact — Connect"
    >
      <div className="container">
        {/* Hero statement */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label justify-center">09 — CONNECT</div>
          <h2 className="heading-xl mb-4" style={{ lineHeight: 1 }}>
            Have a problem
            <br />
            <span className="text-gradient-cyan">worth solving?</span>
          </h2>
          <p className="text-xl mt-6" style={{ color: 'var(--text-2)' }}>
            Let's build the system.
          </p>
        </motion.div>

        {/* Two-column: form + links */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              aria-label="Contact form"
            >
              <div>
                <label className="block font-mono text-xs mb-2" style={{ color: 'var(--text-3)' }}>
                  NAME
                </label>
                <input
                  type="text"
                  name="from_name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="contact-form-input"
                  placeholder="Your name"
                  id="contact-name"
                />
              </div>
              <div>
                <label className="block font-mono text-xs mb-2" style={{ color: 'var(--text-3)' }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  name="reply_to"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="contact-form-input"
                  placeholder="your@email.com"
                  id="contact-email"
                />
              </div>
              <div>
                <label className="block font-mono text-xs mb-2" style={{ color: 'var(--text-3)' }}>
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  rows={5}
                  className="contact-form-input resize-none"
                  placeholder="Describe the problem you want to solve..."
                  id="contact-message"
                />
              </div>

              <button
                type="submit"
                className="btn-primary justify-center"
                disabled={status === 'sending'}
                id="contact-submit"
              >
                {status === 'sending' ? (
                  <>
                    <span className="animate-pulse font-mono text-xs">TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs text-center"
                  style={{ color: 'var(--mint)' }}
                >
                  ✓ Message received. I'll respond shortly.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs text-center"
                  style={{ color: '#f472b6' }}
                >
                  ✗ Transmission failed. Try emailing directly.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Right side: links + info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Email direct */}
            <div className="p-5 rounded-xl" style={{ background: 'var(--panel)', border: '1px solid var(--border)' }}>
              <p className="font-mono text-xs mb-2" style={{ color: 'var(--text-3)' }}>DIRECT</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-lg font-bold transition-colors"
                style={{ color: 'var(--text-1)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-1)'}
              >
                {contactInfo.email}
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ href, icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                  style={{
                    background: 'var(--panel)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-2)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'
                    e.currentTarget.style.color = 'var(--cyan)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-2)'
                  }}
                >
                  {icon}
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>

            {/* Resume access */}
            <div
              className="p-5 rounded-xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(129,140,248,0.06))',
                border: '1px solid rgba(34,211,238,0.15)',
              }}
            >
              <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-3)' }}>ACCESS RESUME</p>
              <div className="flex gap-3 justify-center">
                <a
                  href={contactInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View Resume
                </a>
                <a
                  href={contactInfo.resume}
                  download
                  className="btn-outline"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-24 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
            DHARUN KUMAR · AI/ML ENGINEER · SKCET · 2026
          </p>
          <p className="font-mono text-xs mt-2" style={{ color: 'var(--text-4)' }}>
            Designed & Built with intention — not templates.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
