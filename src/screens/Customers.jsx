import { Search, ChevronRight } from 'lucide-react';
import { customers } from '../mock.js';

export default function Customers() {
  return (
    <>
      <header className="topbar">
        <h1 className="topbar-title">Customers</h1>
      </header>

      <div className="screen">
        <div className="field input-search">
          <Search />
          <input className="input" placeholder="Search customers…" />
        </div>

        {customers.map((c) => (
          <button className="list-row" key={c.id}>
            <span className="avatar sm">{c.initials}</span>
            <span className="lr-main">
              <span className="lr-name">{c.name}</span>
              <span className="lr-sub">{c.address} · {c.phone}</span>
            </span>
            <span className="job-chevron"><ChevronRight /></span>
          </button>
        ))}
      </div>
    </>
  );
}
