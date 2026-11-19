import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduce } from '../data'

export const Section = ({ id, eyebrow, title, children }) => (
  <section id={id} className="mx-auto max-w-6xl px-5 py-20 md:py-28">
    <div data-reveal className="mb-12 text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[.4em] text-neon">{eyebrow}</p>
      <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">{title}.</h2>
      <div className="mx-auto mt-5 h-1.5 w-28 rounded-full bg-neon shadow-[0_0_18px_#ff263f]" />
    </div>
    {children}
  </section>
)

export function Tilt({ children, className = '' }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-.5, .5], [9, -9]), { stiffness: 140, damping: 16 })
  const ry = useSpring(useTransform(x, [-.5, .5], [-9, 9]), { stiffness: 140, damping: 16 })
  const move = e => { if (reduce) return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - .5); y.set((e.clientY - r.top) / r.height - .5) }
  const leave = () => { x.set(0); y.set(0) }
  return <motion.div onPointerMove={move} onPointerLeave={leave} whileHover={reduce ? {} : { scale: 1.02 }} className={className}
    style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}>{children}</motion.div>
}

export const Chip = ({ children }) => <span className="chip">{children}</span>

export function Counter({ n, d = 0, l }) {
  const el = useRef(), box = useRef()
  useEffect(() => {
    const fmt = v => v.toFixed(d)
    if (reduce) { el.current.textContent = fmt(n); return }
    const o = { v: 0 }
    let tw
    const run = () => {
      tw?.kill(); o.v = 0
      tw = gsap.to(o, { v: n, duration: 2, ease: 'power2.out', onUpdate: () => (el.current.textContent = fmt(o.v)), onComplete: () => (el.current.textContent = fmt(n)) })
    }
    const reset = () => { tw?.kill(); o.v = 0; el.current.textContent = fmt(0) }
    // replays every time the counter scrolls into view; resets only once fully off-screen
    const st = ScrollTrigger.create({ trigger: box.current, start: 'top 88%', end: 'bottom top', onEnter: run, onEnterBack: run, onLeave: reset, onLeaveBack: reset })
    return () => { tw?.kill(); st.kill() }
  }, [n, d])
  return (
    <div ref={box} className="p-6 text-center">
      <div className="text-5xl font-black sm:text-6xl"><span ref={el}>{n.toFixed(d)}</span></div>
      <div className="mx-auto my-3 h-1 w-12 rounded bg-neon" />
      <div className="text-xs font-bold uppercase tracking-[.25em] text-white/70">{l}</div>
    </div>
  )
}
