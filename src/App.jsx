import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Download, Mail, Menu, X, Github, Linkedin, Briefcase, GraduationCap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section, Counter } from './components/ui'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { links, nav, stats, exp, edu, reduce } from './data'

gsap.registerPlugin(ScrollTrigger)
const Bg = lazy(() => import('./components/three').then(m => ({ default: m.Bg })))
const HeroFrame = lazy(() => import('./components/three').then(m => ({ default: m.HeroFrame })))

function Nav({ active }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav aria-label="Primary" className="glass mx-auto flex max-w-6xl items-center justify-between px-5 py-3" style={{ borderRadius: '1.2rem' }}>
        <a href="#home" className="text-xl font-black tracking-tight"><span className="text-neon">P</span>RAMOD .M</a>
        <ul className="hidden gap-1 lg:flex">
          {nav.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} aria-current={active === id ? 'true' : undefined}
              className={`relative rounded-full px-3 py-2 text-xs font-bold uppercase tracking-widest transition ${active === id ? 'text-white' : 'text-white/60 hover:text-white'}`}>
              {label}{active === id && <motion.span layoutId="dot" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-neon shadow-[0_0_10px_#ff263f]" />}
            </a></li>))}
        </ul>
        <button className="p-2 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      <AnimatePresence>{open && (
        <motion.ul initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="glass mx-auto mt-2 max-w-6xl p-3 lg:hidden">
          {nav.map(([id, label]) => <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-widest ${active === id ? 'bg-neon/20 text-white' : 'text-white/70'}`}>{label}</a></li>)}
        </motion.ul>)}</AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="mx-auto grid min-h-screen max-w-6xl items-center gap-6 px-5 pb-12 pt-28 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .2 }}>
        <p className="mb-4 text-xs font-bold uppercase tracking-[.3em] text-neon sm:text-sm">Full Stack Developer • MCA Graduate | 2026</p>
        <h1 className="text-[2.6rem] font-black uppercase leading-[.95] tracking-tight sm:text-7xl">Pramod<br />Shrishail<br /><span className="text-neon [text-shadow:0_0_30px_rgba(255,38,63,.6)]">Maloji</span></h1>
        <p className="mt-6 max-w-md text-base text-white/75 sm:text-lg">Building secure, data-driven web applications with Python, Java, SQL and React.js.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary">View My Projects <ArrowRight size={16} /></a>
          <a href={links.resume} download="Pramod_Maloji_Resume.pdf" className="btn">Download Resume <Download size={16} /></a>
          <a href="#contact" className="btn">Contact Me</a>
        </div>
      </motion.div>
      <div className="relative h-[380px] sm:h-[500px]">
        <div className="absolute inset-8 rounded-full bg-neon/20 blur-[80px]" />
        <Suspense fallback={<p className="grid h-full place-items-center text-xs uppercase tracking-[.3em] text-white/50">Loading 3D…</p>}><HeroFrame /></Suspense>
        <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[.65rem] uppercase tracking-[.4em] text-white/40">Move or drag the frame</p>
      </div>
    </section>
  )
}


export default function App() {
  const [ready, setReady] = useState(false), [active, setActive] = useState('home')
  useEffect(() => { const t = setTimeout(() => setReady(true), 700); return () => clearTimeout(t) }, [])
  useEffect(() => {
    if (!ready) return
    const r = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(r); window.addEventListener('load', r)
    const t = setTimeout(r, 400)
    return () => { window.removeEventListener('load', r); clearTimeout(t) }
  }, [ready])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [ready])
  useLayoutEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => gsap.utils.toArray('[data-reveal]').forEach(el =>
      gsap.from(el, { y: 50, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })))
    return () => ctx.revert()
  }, [ready])

  return (
    <>
      <AnimatePresence>{!ready && <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center bg-[#050203]" role="status" aria-label="Loading">
        <div className="text-center"><div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-neon border-t-transparent" /><p className="text-xs uppercase tracking-[.4em]">Loading</p></div></motion.div>}</AnimatePresence>
      <Suspense fallback={null}><Bg /></Suspense>
      <Nav active={active} />
      <main>
        <Hero />

        <Section id="about" eyebrow="Who I am" title="About">
          <div data-reveal className="glass mx-auto max-w-3xl p-7 text-lg leading-relaxed text-white/80 sm:p-10">
            MCA graduate skilled in <b className="text-white">Python, Java, SQL</b> and full-stack web development (React.js, PHP, Django). I contributed to <b className="text-white">IAMVerse</b>, an enterprise Identity and Access Management platform, during my internship, and built academic projects including <b className="text-white">Smart City Analysis</b> and the <b className="text-white">E-Quiz Learning Platform</b>. I’m looking to apply problem-solving, adaptability and full-stack skills in an entry-level software development role.
          </div>
          <div data-reveal className="mx-auto mt-10 max-w-4xl"><p className="mb-4 text-center text-xs font-bold uppercase tracking-[.4em] text-white/50">At a glance</p>
            <div className="glass grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">{stats.map(s => <Counter key={s.l} {...s} />)}</div></div>
        </Section>

        <Skills />

        <Section id="experience" eyebrow="Internship" title="Experience">
          <div data-reveal className="glass mx-auto max-w-3xl p-7 sm:p-10">
            <div className="mb-4 flex items-start gap-4"><Briefcase className="mt-1 shrink-0 text-neon" />
              <div><h3 className="text-2xl font-black">{exp.org}</h3><p className="text-white/70">{exp.co}</p><p className="mt-1 text-sm font-bold uppercase tracking-widest text-neon">{exp.when}</p></div></div>
            <p className="mb-5 text-white/70">{exp.about}</p>
            <ul className="space-y-3">{exp.points.map(p => <li key={p} className="flex gap-3 text-white/85"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-neon shadow-[0_0_8px_#ff263f]" />{p}</li>)}</ul>
          </div>
        </Section>

        <Projects />

        <Section id="education" eyebrow="Academics" title="Education">
          <div className="grid gap-5 sm:grid-cols-2">
            {edu.map(([deg, inst, yr, score]) => <div key={deg} data-reveal className="glass flex items-start gap-4 p-6"><GraduationCap className="shrink-0 text-neon" />
              <div><h3 className="text-xl font-black">{deg} <span className="text-white/50">· {yr}</span></h3><p className="text-white/75">{inst}</p><p className="mt-1 font-bold text-neon">{score}</p></div></div>)}
          </div>
        </Section>

        <Contact />
      </main>
      <footer className="border-t border-neon/20 px-5 py-10 text-center text-sm text-white/60">
        <p className="text-lg font-black text-white"><span className="text-neon">P</span>RAMOD SHRISHAIL MALOJI</p>
        <p className="mt-1">Full Stack Developer · MCA 2026</p>
        <p className="mt-4 flex justify-center gap-5"><a className="hover:text-neon" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a><a className="hover:text-neon" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a><a className="hover:text-neon" href={`mailto:${links.email}`} aria-label="Email"><Mail /></a></p>
        <p className="mt-4 text-xs">© 2026 Pramod Shrishail Maloji</p>
      </footer>
    </>
  )
}
