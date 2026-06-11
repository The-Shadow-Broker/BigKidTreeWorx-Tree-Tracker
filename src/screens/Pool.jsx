import { CalendarPlus, RotateCcw, Image } from 'lucide-react';
import { poolJobs } from '../mock.js';

export default function Pool({ onOpenJob }) {
  return (
    <>
      <header className="topbar">
        <h1 className="topbar-title">Waiting on customer</h1>
      </header>

      <div className="screen">
        <p className="muted" style={{ margin: '0 2px 16px' }}>
          {poolJobs.length < 100 ? poolJobs.length: "99+"} jobs with no date yet. Tap one to see details, or schedule it.
        </p>

        {poolJobs.map((job) => (
          <button className="job-card" key={job.id} onClick={onOpenJob}>
            <span className="job-thumb"><Image size={22} /></span>
            <span className="job-main">
              <span className="job-name">{job.customer}</span>
              <span className="job-sub">{" " + job.work}</span>
              {job.reschedules >= 3 && (
                <span className="flag" style={{ marginTop: 4 }}>
                  <RotateCcw size={15} /> Rescheduled {job.reschedules}×
                </span>
              )}
            </span>
            <span className="status-pill scheduled" style={{ pointerEvents: 'none' }}>
              <CalendarPlus size={15} /> Schedule
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
