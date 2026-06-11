import { Inbox, ChevronRight, Image, CloudUpload } from 'lucide-react';
import { scheduledDays, poolJobs } from '../mock.js';

const toneClass = { green: 'green-soft', blue: 'blue', amber: 'amber' };

function JobCard({ job, onOpen }) {
  return (
    <button className="job-card" onClick={onOpen}>
      <span className="job-thumb"><Image size={22} /></span>
      <span className="job-main">
        <span className="job-name">{job.customer}</span>
        <span className="job-sub">{" " + job.work}</span>
      </span>
      <span className="job-chevron"><ChevronRight /></span>
    </button>
  );
}

export default function Schedule({ onOpenJob, onOpenPool, onAdd }) {
  return (
    <>
      <header className="topbar">
        <h1 className="topbar-title">This week</h1>
        <span className="topbar-spacer" />
        <span className="flag" title="Backups"><CloudUpload size={16} /> Backed up 2d ago</span>
      </header>

      <div className="screen">
        <button className="pool-banner" onClick={onOpenPool}>
          <span className="pb-ico"><Inbox size={22} /></span>
          <span className="pb-main">
            <span className="pb-title">Waiting on customer</span>
            <span className="pb-sub"> Jobs with no date yet — tap to schedule</span>
          </span>
          <span className="pb-count">{poolJobs.length}</span>
        </button>

        {scheduledDays.map((day) => (
          <section key={day.date}>
            <div className="day-head">
              <span className="d-date">{day.date}</span>
              <span className={'d-count' + (day.over ? ' over' : '')}>· {day.count} jobs</span>
            </div>
            {day.jobs.map((job) => (
              <JobCard key={job.id} job={job} onOpen={onOpenJob} />
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
