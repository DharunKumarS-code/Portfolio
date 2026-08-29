import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// --- Neural Node ---
function NeuralNode({ position, size = 0.08, color = '#22d3ee', pulseDelay = 0 }) {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + pulseDelay
    const pulse = 0.8 + 0.2 * Math.sin(t * 2)
    if (meshRef.current) {
      meshRef.current.scale.setScalar(pulse)
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.12 + 0.08 * Math.sin(t * 1.5)
    }
  })

  return (
    <group position={position}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 3, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>
      {/* Core node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 10, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          transparent
          opacity={0.95}
        />
      </mesh>
    </group>
  )
}

// --- Connection Line ---
function Connection({ start, end, color = '#22d3ee', opacity = 0.2 }) {
  const lineRef = useRef()
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [start, end])

  useFrame(({ clock }) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = opacity * (0.5 + 0.5 * Math.sin(clock.elapsedTime + start[0]))
    }
  })

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  )
}

// --- Mouse Tracker ---
function MouseTracker({ targetRef }) {
  const { size } = useThree()
  useEffect(() => {
    const handler = (e) => {
      if (!targetRef.current) return
      const x = (e.clientX / size.width - 0.5) * 2
      const y = -(e.clientY / size.height - 0.5) * 2
      targetRef.current.rotation.y += (x * 0.3 - targetRef.current.rotation.y) * 0.05
      targetRef.current.rotation.x += (y * 0.15 - targetRef.current.rotation.x) * 0.05
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [size, targetRef])
  return null
}

// --- Main AI Core Scene ---
function AICoreScene({ mode = 'hero' }) {
  const groupRef = useRef()

  // Generate nodes procedurally
  const nodes = useMemo(() => {
    const n = mode === 'hero' ? 28 : 16
    const pts = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = phi * i
      const radius = mode === 'hero' ? 1.6 : 1.2
      pts.push({
        id: i,
        pos: [r * Math.cos(theta) * radius, y * radius, r * Math.sin(theta) * radius],
        color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#818cf8' : '#a78bfa',
        size: 0.06 + Math.random() * 0.06,
        pulseDelay: Math.random() * Math.PI * 2,
      })
    }
    return pts
  }, [mode])

  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    const conns = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [ax, ay, az] = nodes[i].pos
        const [bx, by, bz] = nodes[j].pos
        const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2)
        if (dist < 1.2 && conns.length < 60) {
          conns.push({ start: nodes[i].pos, end: nodes[j].pos, color: nodes[i].color })
        }
      }
    }
    return conns
  }, [nodes])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
        <mesh>
          <icosahedronGeometry args={[0.25, 2]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={2}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Inner glow */}
        <mesh>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
        </mesh>
      </Float>

      {/* Rotating rings */}
      {[0.45, 0.75, 1.05].map((r, i) => (
        <mesh
          key={r}
          rotation={[Math.PI / 2 + i * 0.4, i * 0.5, i * 0.3]}
        >
          <torusGeometry args={[r, 0.005, 8, 64]} />
          <meshBasicMaterial
            color={['#22d3ee', '#818cf8', '#a78bfa'][i]}
            transparent
            opacity={0.25 - i * 0.05}
          />
        </mesh>
      ))}

      {/* Neural nodes */}
      {nodes.map(n => (
        <NeuralNode
          key={n.id}
          position={n.pos}
          size={n.size}
          color={n.color}
          pulseDelay={n.pulseDelay}
        />
      ))}

      {/* Connections */}
      {connections.map((c, i) => (
        <Connection key={i} start={c.start} end={c.end} color={c.color} opacity={0.18} />
      ))}

      {/* Floating sparkles / data particles */}
      <Sparkles
        count={mode === 'hero' ? 60 : 30}
        scale={4}
        size={0.5}
        speed={0.3}
        opacity={0.4}
        color="#22d3ee"
      />
    </group>
  )
}

export default function AICore({ mode = 'hero' }) {
  const coreRef = useRef()

  return (
    <Canvas
      className={mode === 'skills' ? 'r3f-canvas-interactive' : 'r3f-canvas'}
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-3, -2, -2]} intensity={0.8} color="#818cf8" />

      <MouseTracker targetRef={coreRef} />

      <group ref={coreRef}>
        <AICoreScene mode={mode} />
      </group>

      {mode === 'skills' && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      )}
    </Canvas>
  )
}
