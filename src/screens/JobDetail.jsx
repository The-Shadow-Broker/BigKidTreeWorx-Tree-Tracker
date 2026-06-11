import {
  ArrowLeft, Phone, MessageSquare, MapPin, Image,
  CalendarClock, CalendarDays, Inbox,
} from 'lucide-react';
import { sampleJob, WORK_TYPE_LABELS } from '../mock.js';

export default function JobDetail({ onBack }) {
  const j = sampleJob;
  return (
    <>
      <header className="topbar">
        <button className="topbar-back" onClick={onBack}>
          <ArrowLeft size={20} /> Schedule
        </button>
      </header>

      <div className="screen">
        <div className="detail-head">
          <span className="avatar">{j.initials}</span>
          <div>
            <div className="dh-name">{j.customer}</div>
            <div className="dh-sub">{j.scheduledLabel}</div>
          </div>
        </div>

        <div className="contact-row">
          <a className="contact-btn" href={`tel:${j.phone}`}><Phone /> Call</a>
          <a className="contact-btn" href={`sms:${j.phone}`}><MessageSquare /> Text</a>
          <a className="contact-btn" href="https://maps.apple.com" target="_blank" rel="noreferrer"><MapPin /> Map</a>
        </div>

        <div className="photo-strip">
          {Array.from({ length: j.photoCount }).map((_, i) => (
            <span className="photo" key={i}><Image size={26} /></span>
          ))}
        </div>

        <div className="tag-row" style={{ marginBottom: 14 }}>
          {j.work.map((w) => <span className="tag" key={w}>{WORK_TYPE_LABELS[w]}</span>)}
        </div>

        <div className="card" style={{ padding: '4px 16px', marginBottom: 16 }}>
          <div className="kv">
            <span className="k">Status</span>
            <span className="status-pill scheduled"><CalendarDays size={15} /> Scheduled</span>
          </div>
          <div className="kv">
            <span className="k">Quoted price</span>
            <span className="v">${j.price.toLocaleString()}</span>
          </div>
          <div className="kv">
            <span className="k">Address</span>
            <span className="v">{j.address}</span>
          </div>
        </div>

        <div className="section-label">Notes</div>
        <div className="notes">{j.notes}</div>

        <div className="pushback" style={{ marginTop: 18 }}>
          <h4>Push back this job</h4>
          <div className="pushback-grid">
            <button className="pushback-btn"><CalendarClock /> Tomorrow</button>
            <button className="pushback-btn"><CalendarClock /> +1 week</button>
            <button className="pushback-btn"><CalendarDays /> Pick a date</button>
            <button className="pushback-btn"><Inbox /> Back to pool</button>
          </div>
        </div>
      </div>
    </>
  );
}
