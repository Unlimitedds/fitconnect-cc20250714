// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import EditCourse from './components/EditCourse';


function App() {
  // Benutzer aus localStorage laden, wenn vorhanden
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Beim Benutzerwechsel: neuen Zustand speichern
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
	<BrowserRouter>
	  <Routes>
	    <Route path="/" element={<LoginForm setUser={setUser} />} />
	    <Route path="/register" element={<RegisterForm />} />
	    <Route
	      path="/dashboard"
	      element={
	        <ProtectedRoute user={user}>
	          <Dashboard user={user} setUser={setUser} />
	        </ProtectedRoute>
	      }
	    />
		<Route
		  path="/course/create"
		  element={
		    <ProtectedRoute user={user}>
		      <CourseForm user={user} />
		    </ProtectedRoute>
		  }
		/>
		<Route
		  path="/course/list"
		  element={
		    <ProtectedRoute user={user}>
		      <CourseList />
		    </ProtectedRoute>
		  }
		/>
		<Route
		  path="/course/edit/:id"
		  element={
		    <ProtectedRoute user={user}>
		      <EditCourse user={user} />
		    </ProtectedRoute>
		  }
		/>
	  </Routes>
	</BrowserRouter>
  );
}

export default App;
