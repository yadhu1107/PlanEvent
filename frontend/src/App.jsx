import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddEvent from './pages/AddEvent.jsx';
import EditEvent from './pages/EditEvent.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/edit/:id" element={<EditEvent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
