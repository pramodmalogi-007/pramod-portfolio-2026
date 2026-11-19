import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { base, mobile, reduce } from '../data'

function Particles() {
  const ref = useRef()
  const count = mobile ? 90 : 320
  const pos = useMemo(() => Float32Array.from({ length: count * 3 }, (_, i) => (Math.random() - 0.5) * (i % 3 === 2 ? 6 : 16)), [count])
  useFrame((_, dt) => {
    if (reduce) return
    ref.current.rotation.y += dt * 0.02
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, window.scrollY * 0.0015, 0.05)
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry>
      <pointsMaterial color="#ff263f" size={mobile ? 0.07 : 0.06} transparent opacity={0.75} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

export function Bg() {
  return (
    <Canvas aria-hidden="true" dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: false, powerPreference: 'low-power' }}
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <Particles />
    </Canvas>
  )
}

// Draws the frame artwork. Shows a placeholder first, then the real photo (public/images/pramod.png) once loaded.
function portraitTexture() {
  const c = document.createElement('canvas'); c.width = 768; c.height = 960
  const x = c.getContext('2d')
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4
  const paint = img => {
    const g = x.createRadialGradient(384, 330, 30, 384, 450, 690)
    g.addColorStop(0, '#c4112a'); g.addColorStop(0.55, '#4a0a14'); g.addColorStop(1, '#0a0304')
    x.fillStyle = g; x.fillRect(0, 0, 768, 960)
    if (img) { const w = 980, h = w * img.height / img.width; x.drawImage(img, (768 - w) / 2, 960 - h + 10, w, h) }
    else {
      x.fillStyle = '#120708'; x.beginPath(); x.ellipse(384, 320, 117, 138, 0, 0, 7); x.fill()
      x.beginPath(); x.moveTo(90, 960); x.quadraticCurveTo(105, 570, 384, 555); x.quadraticCurveTo(663, 570, 678, 960); x.fill()
    }
    const f = x.createLinearGradient(0, 690, 0, 960); f.addColorStop(0, 'rgba(10,3,4,0)'); f.addColorStop(1, 'rgba(10,3,4,.92)')
    x.fillStyle = f; x.fillRect(0, 690, 768, 270)
    x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '900 62px Inter,sans-serif'; x.fillText('PRAMOD', 384, 880)
    x.fillStyle = '#ff6b7d'; x.font = '700 28px Inter,sans-serif'; x.fillText('FULL STACK DEVELOPER', 384, 925)
    t.needsUpdate = true
  }
  paint()
  const img = new Image(); img.decoding = 'async'
  img.onload = () => paint(img)
  img.src = base + 'images/pramod.png'
  return t
}

function Frame() {
  const g = useRef()
  const tex = useMemo(portraitTexture, [])
  useFrame(({ pointer }, dt) => {
    if (reduce) return
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, pointer.x * 0.5 - 0.2, 4, dt)
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -pointer.y * 0.3 + 0.05, 4, dt)
  })
  return (
    <Float speed={reduce ? 0 : 1.6} floatIntensity={0.7} rotationIntensity={0.1}>
      <group ref={g} rotation={[0, 0, -0.1]}>
        <RoundedBox args={[2.7, 3.4, 0.22]} radius={0.14} smoothness={4}><meshStandardMaterial color="#1a0b0d" metalness={0.85} roughness={0.28} /></RoundedBox>
        <mesh position={[0, 0, 0.12]}><planeGeometry args={[2.35, 3.05]} /><meshBasicMaterial map={tex} /></mesh>
        <mesh position={[0, 0, -0.14]}><planeGeometry args={[3.1, 3.8]} /><meshBasicMaterial color="#ff263f" transparent opacity={0.18} /></mesh>
      </group>
    </Float>
  )
}

export function HeroFrame() {
  return (
    <Canvas dpr={[1, mobile ? 1.5 : 2]} camera={{ position: [0, 0, 6.2], fov: 42 }} style={{ touchAction: 'pan-y' }} aria-label="Floating 3D portrait frame">
      <ambientLight intensity={0.6} /><pointLight position={[3, 3, 4]} color="#ff263f" intensity={60} /><pointLight position={[-3, -2, 3]} intensity={25} />
      <Frame />
    </Canvas>
  )
}
