/* Original
import React from 'react';


function Dashboard({ user }) {
  return (
    <div className="container mt-5">
      <h2>Hallo {user?.username || 'Gast'}!</h2>
      <p>Willkommen im Trainer-Dashboard</p>
      <a href="/course/create" className="btn btn-primary mt-3">
        Kurs anlegen
      </a>
    </div>
  );
}

export default Dashboard;
*/

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

      <button className="btn btn-secondary mt-3" onClick={handleLogout}>
        Logout
      </button>

      <a href="/course/create" className="btn btn-primary mt-3 ms-3">
        Kurs anlegen
      </a>
    </div>
  );
}

export default Dashboard;
