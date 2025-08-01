import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditCourse({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: '',
    description: '',
    trainer: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8082/api/course/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Kurs konnte nicht geladen werden');
        return res.json();
      })
      .then((data) => setCourse(data))
      .catch((err) => setMessage(err.message));
  }, [id]);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8082/api/course/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      });

      if (response.ok) {
        setMessage('Kurs erfolgreich aktualisiert.');
        navigate('/course/list');
      } else {
        const errorText = await response.text();
        setMessage('Fehler: ' + errorText);
      }
    } catch (error) {
      setMessage('Fehler: ' + error.message);
    }
  };

  const handleBack = () => {
    navigate('/course/list');
  };

  return (
    <div className="container mt-4">
      <h2>Kurs bearbeiten</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Titel</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Beschreibung</label>
          <textarea
            className="form-control"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Speichern</button>
      </form>

      <hr />
      <button className="btn btn-secondary mt-3" onClick={handleBack}>
        Zurück zur Kursübersicht
      </button>
    </div>
  );
}

export default EditCourse;
