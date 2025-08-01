import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseForm({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const course = {
      title,
      description,
      trainer: user.username, // oder user.firstName + " " + user.lastName
    };

    try {
      const response = await fetch('http://localhost:8082/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        setMessage('Kurs erfolgreich angelegt');
        setTitle('');
        setDescription('');
      } else {
        const errorText = await response.text();
        setMessage('Fehler: ' + errorText);
      }
    } catch (error) {
      setMessage('Fehler: ' + error.message);
    }
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };
  return (
    <div className="container mt-4">
      <h2>Kurs anlegen</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Titel</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Beschreibung</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Speichern
        </button>
	</form>
				<hr />
		<button className="btn btn-secondary mt-4" onClick={() => navigate('/dashboard')}>
		  Zurück zum Dashboard
		</button>

    </div>
  );
}

export default CourseForm;
