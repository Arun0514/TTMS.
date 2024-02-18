import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTourPackagePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fromSource: '',
    toDestination: '',
    departureDate: '',
    departureTime: '',
    busName: '',
    price: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Validate form fields
      if (!formData.fromSource || !formData.toDestination || !formData.departureDate || !formData.departureTime || !formData.busName || !formData.price) {
        setError('All fields are mandatory');
        return;
      }
      // Format time before submitting
      const formattedTime = formatTime(formData.departureTime);
      // Make API call to add tour package
      await axios.post('http://localhost:7070/admin/register', {
        ...formData,
        departureTime: formattedTime
      });
      setSuccessMessage('Tour package added successfully.');
      // Clear form data
      setFormData({
        fromSource: '',
        toDestination: '',
        departureDate: '',
        departureTime: '',
        busName: '',
        price: ''
      });
    } catch (error) {
      setError('Failed to add tour package. Please try again.');
      console.error('Error adding tour package:', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
        {/* Header/navigation */}
        <header className="mb-4">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/view-records">View Records</Link>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </div>
          </nav>
        </header>

        <h2 className="text-center mb-4">Add Tour Package</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fromSource" className="form-label">From</label>
            <input type="text" className="form-control" id="fromSource" name="fromSource" value={formData.fromSource} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="toDestination" className="form-label">To</label>
            <input type="text" className="form-control" id="toDestination" name="toDestination" value={formData.toDestination} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="departureDate" className="form-label">Date</label>
            <input type="date" className="form-control" id="departureDate" name="departureDate" value={formData.departureDate} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="departureTime" className="form-label">Departure Time</label>
            <input type="time" className="form-control" id="departureTime" name="departureTime" value={formData.departureTime} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="busName" className="form-label">Bus Name</label>
            <input type="text" className="form-control" id="busName" name="busName" value={formData.busName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Bus</button>
        </form>
      </div>
    </div>
  );
};

export default AddTourPackagePage;
