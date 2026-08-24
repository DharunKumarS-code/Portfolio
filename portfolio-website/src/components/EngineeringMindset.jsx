import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { engineeringPipeline } from '../data'

export default function EngineeringMindset() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeStage, setActiveStage] = useState(-1)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%'])

  return (
    <section
      id="think"
      ref={ref}
      className="section"
      aria-label="Engineering Mindset — How I Think"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Header */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="section-label">03 — THINK</div>
              <h2 className="heading-lg mb-6" style={{ color: 'var(--text-1)' }}>
                How I<br />
                <span className="text-gradient-cyan">Approach</span><br />
                Problems
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-2)' }}>
                Engineering isn't about writing code — it's about structured thinking.
                Every solution I build follows a disciplined process from problem to production.
              </p>

              {/* Active stage detail */}
              <motion.div
                className="p-5 rounded-xl"
                style={{ background: 'var(--panel)', border: '1px solid var(--border)' }}
                animate={{ opacity: activeStage >= 0 ? 1 : 0.4 }}
              >
                {activeStage >= 0 ? (
                  <>
                    <p className="font-mono text-xs mb-2" style={{ color: 'var(--cyan)' }}>
                      STAGE {String(activeStage + 1).padStart(2, '0')} / {engineeringPipeline.length.toString().padStart(2, '0')}
                    </p>
                    <p className="text-lg font-bold mb-1" style={{ color: 'var(--text-1)' }}>
                      {engineeringPipeline[activeStage].stage}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-2)' }}>
                      {engineeringPipeline[activeStage].desc}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-mono" style={{ color: 'var(--text-3)' }}>
                    — Hover a stage to explore —
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT: Pipeline */}
          <div className="relative">
            {/* Animated connector line */}
            <div
              className="absolute left-8 top-8 bottom-8 w-px"
              style={{ background: 'rgba(34,211,238,0.1)' }}
            >
              <motion.div
                className="w-full origin-top"
                style={{
                  height: lineHeight,
                  background: 'linear-gradient(to bottom, var(--cyan), var(--electric))',
                }}
              />
            </div>

            {/* Stages */}
            <div className="flex flex-col gap-3">
              {engineeringPipeline.map((stage, idx) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="flex items-start gap-4 cursor-pointer group"
                  onMouseEnter={() => setActiveStage(idx)}
                  onMouseLeave={() => setActiveStage(-1)}
                >
                  {/* Node */}
                  <div className="relative flex-shrink-0 z-10">
                    <motion.div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        background: 'var(--panel)',
                        border: '1px solid',
                        borderColor: activeStage === idx ? 'var(--cyan)' : 'var(--border)',
                        boxShadow: activeStage === idx ? '0 0 20px rgba(34,211,238,0.2)' : 'none',
                        transition: 'all 0.3s ease',
                      }}
                      animate={activeStage === idx ? { scale: 1.08 } : { scale: 1 }}
                    >
                      {stage.icon}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 pt-3 pb-4 px-4 rounded-xl transition-all duration-300"
                    style={{
                      background: activeStage === idx ? 'rgba(34,211,238,0.04)' : 'transparent',
                      border: '1px solid',
                      borderColor: activeStage === idx ? 'rgba(34,211,238,0.15)' : 'transparent',
                    }}
                  >
                    <p
                      className="font-mono text-xs mb-0.5"
                      style={{ color: activeStage === idx ? 'var(--cyan)' : 'var(--text-3)' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <p
                      className="font-bold"
                      style={{ color: activeStage === idx ? 'var(--text-1)' : 'var(--text-2)' }}
                    >
                      {stage.stage}
                    </p>
                    <motion.p
                      className="text-sm mt-1"
                      style={{ color: 'var(--text-3)' }}
                      animate={{ opacity: activeStage === idx ? 1 : 0, height: activeStage === idx ? 'auto' : 0 }}
                    >
                      {stage.desc}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
