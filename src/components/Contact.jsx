import { useState } from 'react'
import { Mail, Github, Linkedin, MapPin, Send, Copy, Check, Download } from 'lucide-react'
import { Section } from './ui'
import { links } from '../data'

const channels = [
  { Icon: Mail, label: 'Email', text: links.email, href: `mailto:${links.email}` },
  { Icon: Linkedin, label: 'LinkedIn', text: 'pramod-maloji', href: links.linkedin },
  { Icon: Github, label: 'GitHub', text: 'pramodmalogi-007', href: links.github },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('')

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(links.email); setCopied(true); setTimeout(() => setCopied(false), 2000) }
    catch { setStatus(`Copy failed. My email is ${links.email}`) }
  }

  // No backend: the form opens the visitor's email app with the message filled in.
  const submit = e => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Portfolio message from ${f.get('name')}`
    const body = `${f.get('message')}\n\nFrom: ${f.get('name')} (${f.get('email')})`
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('Opening your email app. If nothing opens, email me directly at ' + links.email)
  }

  return (
    <Section id="contact" eyebrow="Get in touch" title="Contact">
      <div className="grid items-start gap-6 lg:grid-cols-5">
        <div data-reveal className="glass p-7 sm:p-9 lg:col-span-2">
          <h3 className="text-3xl font-black leading-tight">Let’s build something together.</h3>
          <p className="mt-4 text-white/75">I’m looking for an entry-level Python, Django or full-stack role, in Bengaluru or remote. Send a message and I’ll reply as soon as I can.</p>

          <ul className="mt-7 space-y-3">
            {channels.map(({ Icon, label, text, href }) => (
              <li key={label}>
                <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-neon hover:shadow-[0_0_28px_rgba(255,38,63,.35)] focus-visible:border-neon focus-visible:outline-none">
                  <span className="skill-icon !h-11 !w-11 shrink-0"><Icon size={20} /></span>
                  <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[.25em] text-white/55">{label}</span>
                    <span className="block break-all font-bold">{text}</span></span>
                </a>
              </li>))}
            <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
              <span className="skill-icon !h-11 !w-11 shrink-0"><MapPin size={20} /></span>
              <span><span className="block text-xs font-bold uppercase tracking-[.25em] text-white/55">Location</span>
                <span className="block font-bold">Karnataka, India · open to remote</span></span>
            </li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={copyEmail} className="btn">{copied ? <>Copied <Check size={16} /></> : <>Copy email <Copy size={16} /></>}</button>
            <a href={links.resume} download="Pramod_Maloji_Resume.pdf" className="btn">Resume <Download size={16} /></a>
          </div>
        </div>

        <form data-reveal onSubmit={submit} className="glass p-7 sm:p-9 lg:col-span-3" aria-describedby="form-status">
          <h3 className="mb-6 text-2xl font-black">Send me a message</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block"><span className="field-label">Your name</span>
              <input className="field" name="name" type="text" autoComplete="name" required placeholder="Jane Doe" /></label>
            <label className="block"><span className="field-label">Your email</span>
              <input className="field" name="email" type="email" autoComplete="email" required placeholder="jane@company.com" /></label>
          </div>
          <label className="mt-5 block"><span className="field-label">Message</span>
            <textarea className="field min-h-[170px] resize-y" name="message" required minLength={10} placeholder="Tell me about the role or project…" /></label>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn btn-primary">Send message <Send size={16} /></button>
            <p id="form-status" role="status" aria-live="polite" className="text-sm text-white/65">{status}</p>
          </div>
        </form>
      </div>
    </Section>
  )
}
