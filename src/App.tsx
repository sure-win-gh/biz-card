import { useState, useEffect } from 'react'
import { ContactModal } from './components/ContactModal'
import { QRModal } from './components/QRModal'
import avatarSrc from './assets/avatar.png'
import './App.css'

// ─── Config — replace with your details ──────────────────────────────────────
const card = {
  initials: '',
  name: 'Ben Sherwin',
  title: 'Automation & Marketing Expert',
  company: 'Sure Win Solutions',
  tagline: "You don't have a time problem; you have a systems problem. Let's fix the messy middle of your business.",
  email: 'ben@thesurewinagency.com',
  phone: '+44 7450 644 124',
  website: 'thesurewinagency.com',
  linkedin: 'www.linkedin.com/in/thesurewin',
  twitter: '',
  skills: ['Automations', 'Ai Solutions', 'HubSpot', 'Meta Ads', 'Email Flows', 'Lead Gen', 'Zapier', 'AI Agents'],
  stats: [
    { value: 200, suffix: '+', label: 'Automations Built' },
    { value: 50,  prefix: '£', suffix: 'M+', label: 'Emails Delivered' },
    { value: 3,   suffix: 'x',  label: 'Avg. ROI' },
  ],
  // Replace with your actual n8n webhook URL
  n8nWebhookUrl: 'https://your-n8n.com/webhook/YOUR_WEBHOOK_ID',
}

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        setValue(Math.round((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [target, duration, delay])
  return value
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatItem({ value, prefix = '', suffix, label, delay }: { value: number; prefix?: string; suffix: string; label: string; delay: number }) {
  const count = useCountUp(value, 1800, delay)
  return (
    <div className="stat-item">
      <span className="stat-value">{prefix}{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const MailIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
const PhoneIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.02-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const GlobeIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
const CopyIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
const CheckIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
const DownloadIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
const ShareIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
const QRIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v3a2 2 0 0 1-2 2H7M3 12h.01M12 3h.01M12 16v.01M16 12h1M21 12v.01M12 21v-1"/></svg>
const LinkedInIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
const XIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [showContact, setShowContact] = useState(false)
  const [showQR, setShowQR]           = useState(false)
  const [copied, setCopied]           = useState(false)
  const [shared, setShared]           = useState(false)
  const [tilt, setTilt]               = useState({ x: 0, y: 0 })
  const [hovering, setHovering]       = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 8,
      y: ((e.clientY - r.top)  / r.height - 0.5) * 8,
    })
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(card.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveContact = () => {
    const vcf = ['BEGIN:VCARD','VERSION:3.0',`FN:${card.name}`,`TITLE:${card.title}`,`ORG:${card.company}`,`EMAIL;TYPE=WORK:${card.email}`,`TEL;TYPE=WORK:${card.phone}`,`URL:https://${card.website}`,'END:VCARD'].join('\n')
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([vcf], { type: 'text/vcard' })), download: `${card.name.replace(' ','_')}.vcf` })
    a.click()
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `${card.name} — ${card.title}`, text: card.tagline, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  return (
    <div className="page">
      {/* Ambient background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div
        className="card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }) }}
        style={{ transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`, transition: hovering ? 'transform 0.08s ease' : 'transform 0.6s ease' }}
      >
        {/* Header */}
        <div className="card-header">
          <div className="avatar">
            <img
              src={avatarSrc}
              alt={card.name}
              className="avatar-img"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
            <span className="avatar-fallback">{card.initials}</span>
          </div>
          <div className="identity">
            <h1 className="name">{card.name}</h1>
            <p className="role">
              <span>{card.title}</span>
              <span className="dot">&middot;</span>
              <span className="company">{card.company}</span>
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="tagline">&ldquo;{card.tagline}&rdquo;</p>

        {/* Stats */}
        <div className="stats-row">
          {card.stats.map((s, i) => <StatItem key={s.label} {...s} delay={300 + i * 150} />)}
        </div>

        {/* Skills */}
        <div className="skills-row">
          {card.skills.map((skill, i) => (
            <span key={skill} className="skill-tag" style={{ animationDelay: `${0.5 + i * 0.06}s` }}>{skill}</span>
          ))}
        </div>

        <div className="divider" />

        {/* Primary CTAs */}
        <div className="cta-group">
          <button className="cta-primary" onClick={() => setShowContact(true)}>
            Get in Touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
          <button className="cta-secondary" onClick={handleSaveContact}>
            Save Contact <DownloadIcon />
          </button>
        </div>

        {/* Contact */}
        <div className="contact-list">
          <div className="contact-item">
            <span className="contact-icon"><MailIcon /></span>
            <a href={`mailto:${card.email}`} className="contact-link">{card.email}</a>
            <button className="copy-btn" onClick={handleCopyEmail} title={copied ? 'Copied!' : 'Copy email'}>
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
          <div className="contact-item">
            <span className="contact-icon"><PhoneIcon /></span>
            <a href={`tel:${card.phone}`} className="contact-link">{card.phone}</a>
          </div>
          <div className="contact-item">
            <span className="contact-icon"><GlobeIcon /></span>
            <a href={`https://${card.website}`} className="contact-link" target="_blank" rel="noopener noreferrer">{card.website}</a>
          </div>
        </div>

        {/* Share row */}
        <div className="share-row">
          <button className="share-btn" onClick={handleShare}>
            {shared ? <><CheckIcon /> Copied!</> : <><ShareIcon /> Share</>}
          </button>
          <button className="share-btn" onClick={() => setShowQR(true)}>
            <QRIcon /> QR Code
          </button>
        </div>

        {/* Social */}
        <div className="social-row">
          <a href={card.linkedin} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href={card.twitter}  className="social-link" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"><XIcon /></a>
        </div>
      </div>

      {showContact && <ContactModal name={card.name} email={card.email} webhookUrl={card.n8nWebhookUrl} onClose={() => setShowContact(false)} />}
      {showQR      && <QRModal name={card.name} onClose={() => setShowQR(false)} />}
    </div>
  )
}
