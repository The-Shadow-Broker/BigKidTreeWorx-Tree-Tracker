import { useState } from 'react';
import { ArrowLeft, Search, Check, Camera, Mic, Image } from 'lucide-react';
import { WORK_TYPE_ORDER, WORK_TYPE_LABELS } from '../mock.js';

export default function NewJob({ onBack }) {
  // local-only toggle so the chips feel alive in the skeleton
  const [picked, setPicked] = useState(() => new Set(['removal']));
  const toggle = (w) => setPicked((prev) => {
    const next = new Set(prev);
    next.has(w) ? next.delete(w) : next.add(w);
    return next;
  });

  return (
    <>
      <header className="topbar">
        <button className="topbar-back" onClick={onBack}>
          <ArrowLeft size={20} /> Cancel
        </button>
        <span className="topbar-spacer" />
        <h1 className="topbar-title" style={{ fontSize: 18 }}>New job</h1>
      </header>

      <div className="screen">
        <div className="field">
          <label className="field-label">Customer</label>
          <div className="input-search">
            <Search />
            <input className="input" placeholder="Search or add a name…" />
          </div>
        </div>

        <div className="field">
          <label className="field-label">Type of work</label>
          <div className="chip-wrap">
            {WORK_TYPE_ORDER.map((w) => (
              <button
                key={w}
                className={'chip' + (picked.has(w) ? ' on' : '')}
                onClick={() => toggle(w)}
                type="button"
              >
                <Check /> {WORK_TYPE_LABELS[w]}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field-label">Photos</label>
          <div className="photo-grid">
            <button className="photo-add" type="button"><Camera /> Add photo</button>
            <span className="photo"><Image size={26} /></span>
            <span className="photo"><Image size={26} /></span>
          </div>
        </div>

        <div className="field">
          <label className="field-label">Address</label>
          <input className="input" placeholder="Job site address" />
        </div>

        <div className="field">
          <label className="field-label">Price (optional)</label>
          <input className="input" inputMode="numeric" placeholder="$" />
        </div>

        <div className="field">
          <label className="field-label">Notes</label>
          <div className="input-mic">
            <textarea className="textarea" placeholder="Tap the mic to dictate…" />
            <button className="mic" type="button" aria-label="Dictate"><Mic /></button>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary btn-block btn-lg" onClick={onBack}>
            Save to waiting list
          </button>
        </div>
      </div>
    </>
  );
}
