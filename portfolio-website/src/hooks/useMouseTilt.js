import { useRef, useCallback, useEffect } from 'react'

/**
 * Custom hook for mouse-position-tracking 3D tilt effect.
 * Uses CSS perspective + rotateX/rotateY transforms.
 *
 * @param {Object} options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 15)
 * @param {number} options.scale - Scale factor on hover (default: 1.02)
 * @param {number} options.speed - Transition speed in ms (default: 400)
 * @param {boolean} options.glare - Enable shine/glare layer (default: false)
 * @returns {React.RefObject} - Attach this ref to the element you want to tilt
 */
export function useMouseTilt({ maxTilt = 15, scale = 1.02, speed = 400 } = {}) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return

    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
  }, [maxTilt, scale])

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
    el.style.transformStyle = 'preserve-3d'
    el.style.willChange = 'transform'

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave, speed])

  return ref
}
