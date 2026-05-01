import { Mail, Linkedin, Github, Send } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:sdharun7010@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`
    window.location.href = mailto
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 reveal">Get In Touch</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16 reveal">Open to internship opportunities in AI, Data Analytics & Software Development</p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 reveal">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm actively looking for internship opportunities. Whether you have a project, a role, or just want to chat about AI and data — feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:sdharun7010@gmail.com" className="flex items-center gap-4 p-4 card hover:-translate-y-0.5">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                  <Mail className="text-indigo-600 dark:text-indigo-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Email</p>
                  <p className="font-medium">sdharun7010@gmail.com</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/dharun-kumar-8504a4290" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 card hover:-translate-y-0.5">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Linkedin className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">LinkedIn</p>
                  <p className="font-medium">linkedin.com/in/dharun-kumar-8504a4290</p>
                </div>
              </a>

              <a href="https://github.com/DharunKumarS-code" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 card hover:-translate-y-0.5">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <Github className="text-gray-700 dark:text-gray-300" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">GitHub</p>
                  <p className="font-medium">github.com/DharunKumarS-code</p>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 reveal">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="sdharun7010@gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                placeholder="Tell me about the opportunity..." />
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              {sent ? '✓ Message Sent!' : <><Send size={18} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
