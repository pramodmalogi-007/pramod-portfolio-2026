import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section, Tilt, Chip } from './ui'
import { projects } from '../data'
import { sampleProjects } from '../projectsExtra'

gsap.registerPlugin(ScrollTrigger)
const all = [...projects, ...sampleProjects]   // real projects first, then temporary samples

function ProjectCard({ p }) {
  return (
    <Tilt className="glass proj-card h-full p-7 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-neon">{p.tag}</p>
        {p.placeholder && <span className="chip shrink-0 !px-2 !py-0.5 !text-[.6rem] font-bold uppercase tracking-widest text-white/60">Sample</span>}
      </div>
      <h3 className="mt-2 text-2xl font-black sm:text-3xl">{p.title}</h3>
      <p className="mt-3 text-white/75">{p.desc}</p>
      <div className="my-5 flex flex-wrap gap-2">{p.tech.map(t => <Chip key={t}>{t}</Chip>)}</div>
      <ul className="space-y-2 text-sm text-white/85">{p.features.map(f => <li key={f} className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />{f}</li>)}</ul>
    </Tilt>
  )
}

export default function Projects() {
  const stage = useRef(), cards = useRef([]), reveal = useRef([]), bar = useRef(), fill = useRef()
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    // Scroll story (like a 3D carousel): tiny cards wait in a row -> each one grows big with a 3D tilt,
    // then shrinks back -> finally all cards land in the grid. A red progress bar tracks the scroll.
    const build = cols => () => {
      const els = cards.current, st = stage.current
      const W = () => st.offsetWidth, small = () => W() < 500
      const Y = () => 84 + document.getElementById('projects').firstElementChild.offsetHeight + 48   // stage pins just under the heading
      const cx = el => W() / 2 - (el.offsetLeft + el.offsetWidth / 2)
      const cy = el => (70 + window.innerHeight) / 2 - Y() - (el.offsetTop + el.offsetHeight / 2)    // middle of the screen
      const sc = el => Math.max(.55, Math.min(1, (window.innerHeight - 110) / el.offsetHeight))
      const tiny = (i, c) => ({ x: () => W() * .18 + i * (small() ? 32 : 56) - (c.offsetLeft + c.offsetWidth / 2), y: () => 64 - (c.offsetTop + c.offsetHeight / 2),
                                scale: () => (small() ? .09 : .1), rotateY: -62, rotateX: 0, z: 0, opacity: 1 })
      const big = c => ({ x: () => cx(c), y: () => cy(c), scale: () => sc(c), rotateY: -16, rotateX: 6, z: 0, opacity: 1 })
      gsap.set(els, { transformPerspective: 1400, willChange: 'transform' })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: st, pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true,
          start: () => `top ${Y()}px`, end: () => '+=' + Math.round(window.innerHeight * 3.6),
          onUpdate: self => gsap.set(fill.current, { scaleX: self.progress }),
          onToggle: self => gsap.to(bar.current, { opacity: self.isActive ? 1 : 0, duration: .3, overwrite: true }),
        },
      })
      let t = 0
      els.forEach((c, i) => {
        tl.set(c, { zIndex: 20 }, t)
          .fromTo(c, tiny(i, c), { ...big(c), duration: 1, ease: 'power3.out' }, t)                       // grows big, 3D tilted
          .to(c, { ...tiny(i, c), duration: .8, ease: 'power2.in', immediateRender: false }, t + 1.5)      // shrinks back into the row
          .set(c, { zIndex: 1, immediateRender: false }, t + 2.3)
        t += 1.6
      })
      const F = t + .9
      els.forEach((c, i) => {                                                                              // assemble into the grid
        if (i < cols) tl.to(c, { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, z: 0, opacity: 1, duration: 1, immediateRender: false }, F + i * .4)
        else tl.to(c, { opacity: 0, duration: .3, immediateRender: false }, F)
               .set(c, { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, z: 0, immediateRender: false }, F + .31)
               .to(c, { opacity: 1, duration: .4, immediateRender: false }, F + cols * .4 + .4)
      })
      // cards on later lines tilt in one by one as you keep scrolling after the pin
      reveal.current.slice(cols).forEach(r => gsap.fromTo(r,
        { rotateX: 28, z: -180, opacity: .15, transformPerspective: 900 },
        { rotateX: 0, z: 0, opacity: 1, ease: 'none', immediateRender: false, scrollTrigger: { trigger: r, start: 'top 98%', end: 'top 65%', scrub: true } }))
      return () => { gsap.set(cards.current, { clearProps: 'all' }); gsap.set(bar.current, { opacity: 0 }) }
    }
    const ok = '(prefers-reduced-motion: no-preference)'
    mm.add(`(min-width:1024px) and ${ok}`, build(3))
    mm.add(`(min-width:640px) and (max-width:1023px) and ${ok}`, build(2))
    mm.add(`(max-width:639px) and ${ok}`, build(1))
    return () => mm.revert()
  }, [])

  return (
    <Section id="projects" eyebrow="Featured works" title="Projects">
      <div ref={stage} className="relative flex flex-wrap justify-center gap-8" style={{ perspective: '1400px' }}>
        {all.map((p, i) => (
          <div key={p.title} ref={el => (cards.current[i] = el)} className="proj-wrap w-full sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]">
            <div ref={el => (reveal.current[i] = el)} className="h-full"><ProjectCard p={p} /></div>
          </div>
        ))}
      </div>
      <div ref={bar} className="proj-progress" aria-hidden="true"><span ref={fill} /></div>
    </Section>
  )
}
