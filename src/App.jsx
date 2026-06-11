import { useState } from 'react';
import { CalendarDays, Inbox, Users, Plus, Leaf } from 'lucide-react';
import Schedule from './screens/Schedule.jsx';
import Pool from './screens/Pool.jsx';
import Customers from './screens/Customers.jsx';
import JobDetail from './screens/JobDetail.jsx';
import NewJob from './screens/NewJob.jsx';
import {poolJobs} from "./mock.js";

/* Presentational navigation only — no router, no data.
   `tab` = the bottom-tab section; `pushed` = a detail/form view on top. */
export default function App() {
  const [tab, setTab] = useState('schedule');
  const [pushed, setPushed] = useState(null); // 'detail' | 'newjob' | null

  const goTab = (t) => { setPushed(null); setTab(t); };
  const openJob = () => setPushed('detail');
  const openNew = () => setPushed('newjob');
  const back = () => setPushed(null);

  let view;
  if (pushed === 'detail') view = <JobDetail onBack={back} />;
  else if (pushed === 'newjob') view = <NewJob onBack={back} />;
  else if (tab === 'schedule') view = <Schedule onOpenJob={openJob} onOpenPool={() => goTab('pool')} onAdd={openNew} />;
  else if (tab === 'pool') view = <Pool onOpenJob={openJob} />;
  else view = <Customers />;

  const navItems = [
    { id: 'schedule', label: 'Schedule', icon: CalendarDays },
    { id: 'pool', label: 'Waiting', icon: Inbox },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  return (
    <div className="app">
      {/* tablet rail */}
      <aside className="rail">
        <div className="rail-brand">
          <span className="rb-mark"><Leaf size={22} /></span>
          <span className="rb-name">TreeTracker</span>
        </div>
        <button className="btn btn-primary btn-block rail-add" onClick={openNew}>
          <Plus size={20} /> New job
        </button>
        <nav className="rail-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={'rail-item' + (!pushed && tab === id ? ' active' : '')}
              onClick={() => goTab(id)}
            >
              <Icon /> {label} {id === "pool" ? <span className="sidebar-waiting">{poolJobs.length <= 10 ? poolJobs.length: "10+"}</span>: ""}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">{view}</main>

      {/* phone bottom tab bar */}
      <nav className="tabbar">
        <button className={'tab' + (!pushed && tab === 'schedule' ? ' active' : '')} onClick={() => goTab('schedule')}>
          <CalendarDays /> <span>Schedule</span>
        </button>
        <button className={'tab' + (!pushed && tab === 'pool' ? ' active' : '')} onClick={() => goTab('pool')}>
          <Inbox /> <span>Waiting</span>
        </button>
        <button className="tab tab-add" onClick={openNew}>
          <span className="tab-add-bubble"><Plus /></span>
          <span>Add</span>
        </button>
        <button className={'tab' + (!pushed && tab === 'customers' ? ' active' : '')} onClick={() => goTab('customers')}>
          <Users /> <span>Customers</span>
        </button>
      </nav>
    </div>
  );
}
