import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [availableBuses, setAvailableBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(false); // State to control table visibility

  // Function to handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;
    const date = e.target.elements.date.value;

    // Reset error state
    setError(null);

    try {
      setLoading(true);
      // Make request to fetch available buses
      const response = await axios.get(`http://localhost:7070/dashboard/records?from=${from}&to=${to}&date=${date}`);
      setAvailableBuses(response.data);
      setShowTable(true); // Show table after successful search
    } catch (error) {
      console.error('Error fetching available buses:', error);
      setError('An error occurred while fetching available buses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (bus) => {
    navigate('/book', { state: { bus } });
  };

  // Function to handle log out
  const handleLogout = () => {
    // Implement logic to log out user
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      <div className="container">
        {/* Header/navigation */}
        <header className="mb-4">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-bookings">My Bookings</Link>
                  </li>
                </ul>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          </nav>
        </header>

        {/* Search form */}
        <h2>Search for Available Buses</h2>
        <form onSubmit={handleSearch} className="mb-4">
          <div className="row">
            <div className="col-sm-3">
              <input type="text" className="form-control" placeholder="From" name="from" required/>
            </div>
            <div className="col-sm-3">
              <input type="text" className="form-control" placeholder="To" name="to" required/>
            </div>
            <div className="col-sm-3">
              <input type="date" className="form-control" placeholder="Date" name="date" required/>
            </div>
            <div className="col-sm-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Find'}
              </button>
            </div>
          </div>
        </form>

        {/* Error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Available buses table or no buses message */}
        {showTable ? (
          availableBuses.length > 0 ? (
            <>
              <h3>Available Buses</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Time</th>
                    <th scope="col">Bus Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {availableBuses.map(bus => (
                    <tr key={bus.id}>
                      <td>{bus.fromSource}</td>
                      <td>{bus.toDestination}</td>
                      <td>{bus.departureTime}</td>
                      <td>{bus.busName}</td>
                      <td>{bus.price}</td>
                      <td><button className="btn btn-primary" onClick={() => handleBook(bus)}>Book</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No buses available...</p>
          )
        ) : null}
      </div>
    </div>
  );
}

export default DashboardPage;
