import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Terminal, Coffee, Code2, Palette, Atom, Database, GitBranch, FileCode2, Server, FileText, MessageSquare, RefreshCw, Clock, Lightbulb } from 'lucide-react'
import { Section, Tilt } from './ui'
import { skills, soft } from '../data'

gsap.registerPlugin(ScrollTrigger)
const icons = { Python: Terminal, Java: Coffee, HTML: Code2, CSS: Palette, 'React.js': Atom, SQL: Database, Git: GitBranch, 'VS Code': FileCode2, XAMPP: Server, 'MS Office': FileText }
const softIcons = { Communication: MessageSquare, Adaptability: RefreshCw, 'Time Management': Clock, 'Problem Solving': Lightbulb }
const tech = skills.flatMap(([group, items]) => items.map(name => ({ name, group, Icon: icons[name] })))

const Card = ({ name, group, Icon, i }) => (
  <div className="skill-item">
    <div className="skill-float" style={{ animationDelay: `${(i % 5) * -1.1}s`, animationDuration: `${5 + (i % 3)}s` }}>
      <Tilt className="skill-card glass">
        <span className="skill-icon"><Icon size={26} strokeWidth={1.8} /></span>
        <h3 className="mt-4 text-lg font-black">{name}</h3>
        <p className="mt-1 text-[.65rem] font-bold uppercase tracking-[.25em] text-white/50">{group}</p>
      </Tilt>
    </div>
  </div>
)

export default function Skills() {
  const root = useRef()
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root)
    // desktop / tablet: staggered 3D rise-in
    mm.add('(min-width:768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.skill-item', { y: 70, opacity: 0, rotateX: -45, scale: .85, transformPerspective: 800, duration: .9, ease: 'power3.out', stagger: .08, scrollTrigger: { trigger: '.skill-grid', start: 'top 85%', once: true } })
      gsap.from('.soft-item', { y: 40, opacity: 0, duration: .7, ease: 'power3.out', stagger: .1, scrollTrigger: { trigger: '.soft-grid', start: 'top 90%', once: true } })
    })
    // mobile: lighter fade-up, no 3D
    mm.add('(max-width:767px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.skill-item, .soft-item', { y: 30, opacity: 0, duration: .5, ease: 'power2.out', stagger: .05, scrollTrigger: { trigger: '.skill-grid', start: 'top 90%', once: true } })
    })
    return () => mm.revert()
  }, [])
  return (
    <Section id="skills" eyebrow="Toolbox" title="Skills">
      <div ref={root}>
        <div className="skill-grid grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">{tech.map((t, i) => <Card key={t.name} {...t} i={i} />)}</div>
        <p className="mb-5 mt-14 text-center text-xs font-bold uppercase tracking-[.4em] text-neon">Soft Skills</p>
        <div className="soft-grid grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {soft.map(s => { const I = softIcons[s]; return (
            <div key={s} className="soft-item"><div className="glass skill-card flex items-center gap-3 !p-4 text-left"><span className="skill-icon !h-10 !w-10"><I size={20} /></span><span className="text-sm font-bold">{s}</span></div></div>) })}
        </div>
      </div>
    </Section>
  )
}
