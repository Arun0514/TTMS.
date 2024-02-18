import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const FeedBackPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Make API call to submit feedback
      await axios.post('http://localhost:7070/feedback', {
        name,
        email,
        rating,
        comment,
      });
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError('An error occurred while submitting feedback. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '20px' }}>
        {/* Header/navigation */}
        <header className="mb-4">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto"></ul>
              </div>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Log Out</button>
            </div>
          </nav>
        </header>

        <h2 className="text-center mb-4">Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating</label>
            <input type="range" className="form-range" min="1" max="10" id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
            <div>{rating}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
            <textarea className="form-control" id="comment" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>Submit</button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">Feedback submitted successfully!</div>}
      </div>
    </div>
  );
};

export default FeedBackPage;
