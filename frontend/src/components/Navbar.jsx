import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink className="brand" to="/" aria-label="PlanEvent dashboard">
          <span className="brand-mark">P</span>
          <span>Plan<span className="brand-dot">Event</span></span>
        </NavLink>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/add-event" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Add Event
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
