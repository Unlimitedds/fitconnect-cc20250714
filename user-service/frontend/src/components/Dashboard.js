import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Hallo {user?.username || 'Gast'}!</h2>
      <p>Willkommen im Trainer-Dashboard</p>

      <a href="/course/list" className="btn btn-info mt-3 d-block">
        Kurse anzeigen
      </a>

      <a href="/course/create" className="btn btn-primary mt-2 d-block">
        Kurs anlegen
      </a>

      <button className="btn btn-secondary mt-2 d-block" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
