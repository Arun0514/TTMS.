import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPackagePage = () => {
  const navigate = useNavigate(); // Define navigate
  const { id } = useParams(); // Get the package ID from the URL
  const [packageData, setPackageData] = useState({
    fromSource: '',
    toDestination: '',
    departureDate: '',
    departureTime: '',
    busName: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:7070/admin/records/${id}`);
        setPackageData(response.data);
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching package data. Please try again.');
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update package data
      await axios.put(`http://localhost:7070/admin/records/${id}`, packageData);
      // Redirect to View Records page after successful update
      navigate('/view-records');
    } catch (error) {
      console.error('Error while updating package:', error);
    }
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <div className="container">
        <h2 className="text-center">Edit Package</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fromSource" className="form-label">From</label>
              <input type="text" className="form-control" id="fromSource" name="fromSource" value={packageData.fromSource} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="toDestination" className="form-label">To</label>
              <input type="text" className="form-control" id="toDestination" name="toDestination" value={packageData.toDestination} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="departureDate" className="form-label">Departure Date</label>
              <input type="date" className="form-control" id="departureDate" name="departureDate" value={packageData.departureDate} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="departureTime" className="form-label">Departure Time</label>
              <input type="time" className="form-control" id="departureTime" name="departureTime" value={packageData.departureTime} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="busName" className="form-label">Bus Name</label>
              <input type="text" className="form-control" id="busName" name="busName" value={packageData.busName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="number" className="form-control" id="price" name="price" value={packageData.price} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Update Package</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPackagePage;
