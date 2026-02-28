import { useState, useEffect } from 'react'

interface Props {
  name: string
  email: string
  webhookUrl: string
  onClose: () => void
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const NEEDS = [
  'Marketing Automation',
  'Lead Generation System',
  'CRM Integration',
  'Email Campaign Setup',
  'Full Funnel Build',
  'Something Else',
]

export function ContactModal({ name, email, webhookUrl, onClose }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', need: '', message: '' })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'business-card', timestamp: new Date().toISOString() }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" role="dialog" aria-modal="true" aria-label="Contact form">

        <div className="modal-header">
          <div>
            <h2 className="modal-title">Let's Talk</h2>
            <p className="modal-sub">I'll get back to you within one business day.</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === 'success' ? (
          <div className="form-success">
            <div className="success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3>Message sent!</h3>
            <p>Thanks for reaching out. You'll hear from me soon.</p>
            <button className="cta-primary" style={{ marginTop: '1.25rem' }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form" autoComplete="on">
            <div className="form-row">
              <div className="form-field">
                <label>Name *</label>
                <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" required />
              </div>
              <div className="form-field">
                <label>Email *</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" autoComplete="email" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Company</label>
                <input type="text" value={form.company} onChange={set('company')} placeholder="Your company" autoComplete="organization" />
              </div>
              <div className="form-field">
                <label>What do you need?</label>
                <select value={form.need} onChange={set('need')} autoComplete="off">
                  <option value="">Select a service</option>
                  {NEEDS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Message *</label>
              <textarea
                value={form.message}
                onChange={set('message')}
                placeholder="Tell me about your project or challenge…"
                autoComplete="off"
                rows={4}
                required
              />
            </div>

            {status === 'error' && (
              <p className="form-error">
                Submission failed. Email me directly at <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}

            <button type="submit" className="cta-primary" disabled={status === 'submitting'}>
              {status === 'submitting' ? (
                <><span className="spinner" /> Sending…</>
              ) : (
                <>Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg></>
              )}
            </button>

            <p className="form-note">
              Your message is routed directly into {name}'s automation system — no inbox lag.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
