import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { aiKnowledgeBase } from '../data'

const INITIAL_MESSAGES = [
  {
    id: 0,
    from: 'ai',
    text: "Hey! I'm Dharun's portfolio assistant. Ask me about his projects, skills, experience, or how to contact him.",
  },
]

const QUICK_QUESTIONS = [
  'What AI projects has Dharun built?',
  'What technologies does he use?',
  'How can I contact him?',
  'What research is he doing?',
]

function findResponse(query) {
  const q = query.toLowerCase()
  for (const entry of aiKnowledgeBase) {
    if (entry.patterns.some(p => q.includes(p))) {
      return entry.response
    }
  }
  return "I don't have specific information about that, but you can reach Dharun directly at sdharun7010@gmail.com or on LinkedIn at linkedin.com/in/dharun-kumar-8504a4290."
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async (text) => {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)

    await new Promise(r => setTimeout(r, 600 + Math.random() * 400))

    const response = findResponse(text)
    setMessages(m => [...m, { id: Date.now() + 1, from: 'ai', text: response }])
    setTyping(false)
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="ai-chat-btn"
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        aria-label={open ? 'Close AI assistant' : 'Ask Dharun — AI assistant'}
        aria-expanded={open}
      >
        {open ? <X size={16} /> : <MessageCircle size={16} />}
        {open ? 'CLOSE' : 'ASK DHARUN'}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="ai-chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            role="dialog"
            aria-label="AI Portfolio Assistant"
            aria-live="polite"
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold"
                style={{
                  background: 'rgba(34,211,238,0.12)',
                  border: '1px solid rgba(34,211,238,0.3)',
                  color: 'var(--cyan)',
                }}
              >
                DK
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>Ask Dharun</p>
                <p className="font-mono text-xs flex items-center gap-1" style={{ color: 'var(--mint)' }}>
                  <span className="pulse-dot" style={{ width: 4, height: 4, background: 'var(--mint)' }} />
                  ONLINE
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                    style={
                      msg.from === 'user'
                        ? { background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.2)', color: 'var(--text-1)' }
                        : { background: 'var(--panel)', border: '1px solid var(--border)', color: 'var(--text-2)' }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div
                    className="px-3 py-2 rounded-xl"
                    style={{ background: 'var(--panel)', border: '1px solid var(--border)' }}
                  >
                    <span className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: 'var(--text-3)' }}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-col gap-1.5">
                {QUICK_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs px-3 py-1.5 rounded-lg transition-all"
                    style={{
                      background: 'rgba(34,211,238,0.04)',
                      border: '1px solid rgba(34,211,238,0.1)',
                      color: 'var(--text-3)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="p-3 flex gap-2"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about my work..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--text-1)' }}
                aria-label="Type a question"
              />
              <button
                onClick={() => sendMessage(input)}
                className="p-1.5 rounded-lg transition-all"
                style={{ color: 'var(--cyan)' }}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
