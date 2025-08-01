import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8082/api/course')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Fehler beim Laden der Kurse');
        }
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Willst du diesen Kurs wirklich löschen?')) return;

    try {
      const response = await fetch(`http://localhost:8082/api/course/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter((course) => course.id !== id));
      } else {
        const text = await response.text();
        alert('Fehler beim Löschen: ' + text);
      }
    } catch (err) {
      alert('Fehler: ' + err.message);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (loading) return <p>Lade Kurse...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Alle Kurse</h2>

      {courses.length === 0 ? (
        <p>Keine Kurse gefunden.</p>
      ) : (
        <ul className="list-group">
          {courses.map((course) => (
            <li key={course.id} className="list-group-item">
              <h5>{course.title}</h5>
              <p>{course.description}</p>
              <small className="text-muted">Trainer: {course.trainer}</small>
              <div className="mt-2">
                <a
                  href={`/course/edit/${course.id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Bearbeiten
                </a>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="btn btn-sm btn-danger"
                >
                  Löschen
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr />
      <button className="btn btn-secondary mt-4" onClick={handleBack}>
        Zurück zum Dashboard
      </button>
    </div>
  );
}

export default CourseList;
