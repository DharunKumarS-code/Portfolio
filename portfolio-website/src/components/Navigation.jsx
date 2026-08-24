import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'INTRO', href: '#hero', num: '01' },
  { label: 'ORIGIN', href: '#about', num: '02' },
  { label: 'THINK', href: '#think', num: '03' },
  { label: 'STACK', href: '#stack', num: '04' },
  { label: 'LAB', href: '#lab', num: '05' },
  { label: 'SYSTEMS', href: '#systems', num: '06' },
  { label: 'RESEARCH', href: '#research', num: '07' },
  { label: 'CREDENTIALS', href: '#credentials', num: '08' },
  { label: 'CONNECT', href: '#connect', num: '09' },
]

export default function Navigation() {
  const [active, setActive] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentNum, setCurrentNum] = useState('01')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Section detection
      const sections = NAV_ITEMS.map(i => document.getElementById(i.href.slice(1)))
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec && sec.offsetTop <= scrollPos) {
          setActive(NAV_ITEMS[i].href.slice(1))
          setCurrentNum(NAV_ITEMS[i].num)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop Floating Nav */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="nav-float hidden lg:flex"
        aria-label="Main navigation"
      >
        {/* Section counter */}
        <span
          className="font-mono text-xs mr-4 pr-4 select-none"
          style={{
            color: 'var(--cyan)',
            borderRight: '1px solid var(--border)',
          }}
        >
          {currentNum} / 09
        </span>

        {NAV_ITEMS.map(item => (
          <a
            key={item.href}
            href={item.href}
            className={`nav-link ${active === item.href.slice(1) ? 'active' : ''}`}
            onClick={e => { e.preventDefault(); handleNavClick(item.href) }}
            aria-current={active === item.href.slice(1) ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </motion.nav>

      {/* Mobile Nav Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="lg:hidden fixed top-5 right-5 z-[1001] w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl"
        style={{ background: 'rgba(10,15,30,0.9)', border: '1px solid var(--border)' }}
        onClick={() => setMobileOpen(v => !v)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="block h-px w-5 rounded-full"
            style={{ background: 'var(--text-2)' }}
            animate={
              mobileOpen
                ? i === 0 ? { rotate: 45, y: 5 }
                : i === 1 ? { opacity: 0 }
                : { rotate: -45, y: -5 }
                : { rotate: 0, y: 0, opacity: 1 }
            }
          />
        ))}
      </motion.button>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav-overlay lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col items-center gap-8">
              {/* Section counter */}
              <p className="font-mono text-xs" style={{ color: 'var(--cyan)' }}>
                {currentNum} / 09
              </p>
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-link"
                  style={{ color: active === item.href.slice(1) ? 'var(--cyan)' : 'var(--text-2)' }}
                  onClick={e => { e.preventDefault(); handleNavClick(item.href) }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="font-mono text-sm mr-3" style={{ color: 'var(--text-3)' }}>
                    {item.num}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
