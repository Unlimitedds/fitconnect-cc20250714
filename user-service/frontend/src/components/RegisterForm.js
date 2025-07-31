// Original aus dem Kurs
import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
 
function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    country: '',
    termsAccepted: false
  });
 
  const [message, setMessage] = useState('');
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!formData.termsAccepted) {
      setMessage("Bitte akzeptiere die AGB.");
      return;
    }
 
    if (formData.password !== formData.confirmPassword) {
      setMessage("Die Passwörter stimmen nicht überein.");
      return;
    }
 
    try {
      const res = await axios.post('http://localhost:8083/api/user/register', formData);
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Ein Fehler ist aufgetreten.");
    }
  };
 
  return (
    <div className="container mt-4">
      <h2>Registrierung</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Vorname*</label>
            <input type="text" className="form-control" name="firstName" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Nachname*</label>
            <input type="text" className="form-control" name="lastName" onChange={handleChange} required />
          </div>
        </div>
 
        <div className="mb-3">
          <label>Benutzername*</label>
          <input type="text" className="form-control" name="username" onChange={handleChange} required />
        </div>
 
        <div className="mb-3">
          <label>E-Mail-Adresse*</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
 
        <div className="mb-3">
          <label>Passwort*</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
 
        <div className="mb-3">
          <label>Passwort wiederholen*</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} required />
        </div>
 
        <div className="mb-3">
          <label>Telefonnummer</label>
          <input type="tel" className="form-control" name="phone" onChange={handleChange} />
        </div>
 
        <div className="mb-3">
          <label>Geburtsdatum</label>
          <input type="date" className="form-control" name="birthDate" onChange={handleChange} />
        </div>
 
        <div className="mb-3">
          <label>Geschlecht</label>
          <select className="form-select" name="gender" onChange={handleChange}>
            <option value="">Bitte auswählen</option>
            <option value="männlich">Männlich</option>
            <option value="weiblich">Weiblich</option>
            <option value="divers">Divers</option>
          </select>
        </div>
 
        <div className="mb-3">
          <label>Adresse</label>
          <input type="text" className="form-control" name="address" onChange={handleChange} />
        </div>
 
        <div className="mb-3">
          <label>Land</label>
          <input type="text" className="form-control" name="country" onChange={handleChange} />
        </div>
 
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" name="termsAccepted" onChange={handleChange} />
          <label className="form-check-label">Ich akzeptiere die AGB*</label>
        </div>
 
        <button type="submit" className="btn btn-primary">Registrieren</button>
      </form>
	  <p className="mt-3">
	  Schon registriert? <Link to="/register">Jetzt einloggen</Link>
	  </p>
	  
    </div>
  );
}
 
export default RegisterForm;