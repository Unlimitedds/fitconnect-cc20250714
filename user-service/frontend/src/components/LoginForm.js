import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
 
function LoginForm({ setUser }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
 /* Original 
 	const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/api/user/login', formData);
      setUser(res.data); // Speichert Benutzer im App-State
      navigate('/dashboard'); // Weiterleitung
    } catch (err) {
      setMessage('Login fehlgeschlagen');
    }
  };
  */
 
  // geänderte Version
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/api/user/login', formData);
      setUser(res.data); 
      localStorage.setItem("user", JSON.stringify(res.data)); // Username in den Speicher schreiben
      navigate('/dashboard');
    } catch (err) {
      setMessage('Login fehlgeschlagen');
    }
  };

 
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {message && <div className="alert alert-danger">{message}</div>}
	  
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Benutzername</label>
          <input name="username" onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Passwort</label>
          <input name="password" type="password" onChange={handleChange} className="form-control" required />
        </div>
        <button className="btn btn-primary">Login</button>
		
      </form>
	  
	  <p className="mt-3">
	  	Noch kein Konto? <Link to="/register">Jetzt registrieren</Link>
	  </p>
    </div>
  );
}
 
export default LoginForm;