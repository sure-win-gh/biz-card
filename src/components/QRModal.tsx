import { useEffect, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

interface Props {
  name: string
  onClose: () => void
}

export function QRModal({ name, onClose }: Props) {
  const url = window.location.href
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const downloadQR = () => {
    const canvas = wrapRef.current?.querySelector('canvas')
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `${name.replace(' ', '_')}_QR.png`
    a.click()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel qr-panel" role="dialog" aria-modal="true" aria-label="QR code">

        <div className="modal-header">
          <div>
            <h2 className="modal-title">Scan to Connect</h2>
            <p className="modal-sub">Point your camera to open this card.</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="qr-wrap" ref={wrapRef}>
          <QRCodeCanvas
            value={url}
            size={200}
            bgColor="#ffffff"
            fgColor="#111827"
            level="M"
          />
        </div>

        <p className="qr-url">{url}</p>

        <div className="cta-group" style={{ marginTop: '1.25rem' }}>
          <button className="cta-primary" onClick={downloadQR}>
            Download QR
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
          </button>
          <button className="cta-secondary" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  )
}
