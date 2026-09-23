import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

const config = {
  id: 'analytics',
  name: 'Analytics',
  shortName: 'Analytics',
  description: 'Operational KPIs, trends and reporting.',
}

const css = `
.analytics-offer{font-family:Inter,system-ui,sans-serif;color:#edf4ff}
.analytics-offer .hero{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding:22px;border:1px solid #2a3a5a;border-radius:18px;background:linear-gradient(135deg,#1d2446,#10182f)}
.analytics-offer h2{margin:0 0 8px;font-size:28px}.analytics-offer p{margin:0;color:#9caed0}.analytics-offer .refresh{border:0;border-radius:10px;padding:10px 13px;background:#d7a7ff;color:#1b0928;font-weight:800;cursor:pointer}
.analytics-offer .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:16px 0}.analytics-offer .stat{padding:17px;border:1px solid #27395b;border-radius:15px;background:#0d1830}
.analytics-offer .stat span{display:block;color:#8093b4;font-size:12px}.analytics-offer .stat strong{display:block;font-size:23px;margin-top:8px}
.analytics-offer .panel{border:1px solid #27395b;border-radius:16px;background:#0b172b;padding:18px}.analytics-offer .bars{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;align-items:end;height:220px;margin-top:18px}
.analytics-offer .bar{display:flex;align-items:end;justify-content:center;height:100%}.analytics-offer .bar i{display:block;width:100%;max-width:48px;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,#b687ff,#6f8cff)}
.analytics-offer .labels{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;color:#7184a5;font-size:11px;text-align:center;margin-top:8px}
@media(max-width:760px){.analytics-offer .stats{grid-template-columns:repeat(2,1fr)}.analytics-offer .hero{flex-direction:column}}
`

function ensureStyle() {
  if (document.getElementById('analytics-offer-style')) return
  const style = document.createElement('style')
  style.id = 'analytics-offer-style'
  style.textContent = css
  document.head.appendChild(style)
}

function AnalyticsApp({ host }) {
  const [series, setSeries] = useState([42, 58, 49, 72, 66, 84, 78])

  const refresh = () => {
    setSeries((values) => values.map((value, index) => Math.max(20, Math.min(96, value + (index % 2 === 0 ? 4 : -3)))))
    host?.notify?.('Analytics refreshed', 'Dashboard KPIs were recalculated.')
  }

  return (
    <section className="analytics-offer">
      <div className="hero">
        <div>
          <h2>Analytics Center</h2>
          <p>This UI is running from the independent offer-analytics repository.</p>
        </div>
        <button className="refresh" onClick={refresh}>Refresh KPIs</button>
      </div>

      <div className="stats">
        <div className="stat"><span>Active users</span><strong>18.4K</strong></div>
        <div className="stat"><span>Conversion</span><strong>7.9%</strong></div>
        <div className="stat"><span>Revenue</span><strong>₹42.6L</strong></div>
        <div className="stat"><span>Retention</span><strong>81.2%</strong></div>
      </div>

      <div className="panel">
        <strong>Weekly engagement</strong>
        <div className="bars">
          {series.map((value, index) => (
            <div className="bar" key={index}>
              <i style={{ height: value + '%' }} title={String(value)} />
            </div>
          ))}
        </div>
        <div className="labels">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day) => <span key={day}>{day}</span>)}
        </div>
      </div>
    </section>
  )
}

const definition = {
  contractVersion: 1,
  config,
  mount({ element, host }) {
    if (!element) throw new Error('Analytics offer requires a mount element.')
    ensureStyle()
    const root = createRoot(element)
    root.render(<AnalyticsApp host={host} />)

    return {
      update() {},
      unmount() {
        root.unmount()
      },
    }
  },
}

window.__REMOTE_OFFERS__ = window.__REMOTE_OFFERS__ || {}
window.__REMOTE_OFFERS__[config.id] = definition
