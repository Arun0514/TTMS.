import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f0f0f0' }}>
      <h2>Welcome to Tours and Travel Management System.</h2>
      <div className="mt-3">
        <Link to="/login" className="btn btn-primary me-3">Login</Link>
        <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
}

export default HomePage;
