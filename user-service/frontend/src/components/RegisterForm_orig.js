//Meine geänderte Version
import React, { useState } from 'react';
import axios from 'axios';

const pageStyle = {
	backgroundColor: '#f8f9fa',
	minHeight: '100vh',
	paddingTop: '40px'
};

function RegisterForm() {
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		termsAccepted: false,
		phone: '',
		birthDate: '',
		gender: '',
		street: '',
		postalCode: '',
		city: '',
		country: ''
	});

	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
		setErrors({ ...errors, [name]: null });
	};

	const validate = () => {
		const newErrors = {};
		if (!formData.firstname.trim()) newErrors.firstname = 'Vorname ist erforderlich';
		if (!formData.lastname.trim()) newErrors.lastname = 'Nachname ist erforderlich';
		if (!formData.username.trim()) newErrors.username = 'Benutzername ist erforderlich';
		if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich';
		if (!formData.password) newErrors.password = 'Passwort ist erforderlich';
		if (!formData.confirmPassword) newErrors.confirmPassword = 'Bitte Passwort wiederholen';
		if (formData.password !== formData.confirmPassword)
			newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
		if (!formData.termsAccepted) newErrors.termsAccepted = 'AGB müssen akzeptiert werden';
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			setMessage('');
			return;
		}

		const address = `${formData.street}, ${formData.postalCode} ${formData.city}`;
		const payload = {
			...formData,
			address
		};
		delete payload.confirmPassword;
		delete payload.street;
		delete payload.postalCode;
		delete payload.city;

		try {
			const res = await axios.post('http://localhost:8083/api/user/register', payload);
			setMessage(res.data);
			setErrors({});
		} catch (err) {
			setMessage(err.response?.data || 'Ein Fehler ist aufgetreten');
		}
	};

	const renderError = (field) =>
		errors[field] && <div className="invalid-feedback d-block">{errors[field]}</div>;

	const requiredFields = [
		{ name: 'firstname', label: 'Vorname' },
		{ name: 'lastname', label: 'Nachname' },
		{ name: 'username', label: 'Benutzername' },
		{ name: 'email', label: 'E-Mail', type: 'email' },
		{ name: 'password', label: 'Passwort', type: 'password' },
		{ name: 'confirmPassword', label: 'Passwort wiederholen', type: 'password' }
	];

	const optionalFields = [
		{ name: 'phone', label: 'Telefonnummer' },
		{ name: 'birthDate', label: 'Geburtsdatum', type: 'date' },
		{ name: 'gender', label: 'Geschlecht', type: 'select', options: ['', 'male', 'female', 'diverse'] },
		{ name: 'street', label: 'Straße und Hausnummer' },
		{ name: 'postalCode', label: 'PLZ' },
		{ name: 'city', label: 'Stadt' },
		{ name: 'country', label: 'Land', type: 'select', options: ['', 'deutschland', 'niederlande', 'belgien'] }
	];

	const renderInput = ({ name, label, type = 'text', options }) => (
		<div className="mb-3" key={name}>
			<label>
				{label}{requiredFields.find(f => f.name === name) && <span style={{ color: 'red' }}> *</span>}
			</label>
			{type === 'select' ? (
				<select
					name={name}
					className={`form-control ${errors[name] && 'is-invalid'}`}
					onChange={handleChange}
				>
					{options.map((opt, i) => (
						<option key={i} value={opt}>
							{opt === '' ? 'Bitte wählen' : opt}
						</option>
					))}
				</select>
			) : (
				<input
					type={type}
					name={name}
					className={`form-control ${errors[name] && 'is-invalid'}`}
					onChange={handleChange}
				/>
			)}
			{renderError(name)}
		</div>
	);

	return (
		<div style={pageStyle}>
			<div className="container mt-5">
				<div className="text-center mb-4">
					<img src="/logo.png" alt="FitConnect Logo" style={{ height: '80px' }} />
				</div>

				<h2>Registrierung</h2>
				{message && <div className="alert alert-info">{message}</div>}

				<form onSubmit={handleSubmit}>
					{requiredFields.map(renderInput)}
					{optionalFields.map(renderInput)}

					<div className="form-check mb-3">
						<input
							type="checkbox"
							name="termsAccepted"
							className={`form-check-input ${errors.termsAccepted && 'is-invalid'}`}
							onChange={handleChange}
						/>
						<label className="form-check-label">
							Ich akzeptiere die{' '}
							<a href="/agb.pdf" target="_blank" rel="noopener noreferrer">AGB</a>
							<span style={{ color: 'red' }}> *</span>
						</label>
						{renderError('termsAccepted')}
					</div>

					<button type="submit" className="btn btn-primary">Registrieren</button>
					<div className="mb-5" />
				</form>
			</div>
		</div>
	);
}

export default RegisterForm;
