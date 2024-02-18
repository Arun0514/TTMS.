import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve userId from sessionStorage
  const userId = sessionStorage.getItem('userId');

  // Extract bus details from location state
  const { bus } = location.state;

  // State variable for number of persons
  const [noOfPersons, setNoOfPersons] = useState(1);

  // Calculate total amount based on number of persons and bus price
  const totalAmount = noOfPersons * bus.price;

  // Function to handle number of persons change
  const handleNoOfPersonsChange = (e) => {
    setNoOfPersons(parseInt(e.target.value));
  };

  const handleLogout = () => {
    // Implement logic to log out user
    sessionStorage.clear();
    navigate('/login');
  };

  // Function to handle payment
  const handlePayment = async () => {
    try {
      // Make API call to backend to complete booking
      await axios.post('http://localhost:7070/dashboard/book/payAndBook', {
        userId, // Include userId in the request body
        busId: bus.id,
        fromSource: bus.fromSource,
        toDestination: bus.toDestination,
        departureDate: bus.departureDate,
        departureTime: bus.departureTime,
        busName: bus.busName,
        price: bus.price,
        noOfPersons, 
        totalAmount,
      });
      // Show success message
      setBookingStatus('Ticket booked successfully. To download or cancel ticket, visit My Bookings.');
    } catch (error) {
      console.error('Error while making payment:', error);
      // Handle error
      setBookingStatus('An error occurred while booking. Please try again.');
    }
  };

  // State variable for booking status message
  const [bookingStatus, setBookingStatus] = useState(null);

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
              </div>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Log Out</button>
            </div>
          </nav>
        </header>

        {/* Book Bus form */}
        <h2>Book Bus</h2>
        <div className="row">
          <div className="col-md-6">
            <table className="table">
              <tbody>
                <tr>
                  <th>From:</th>
                  <td>{bus.fromSource}</td>
                </tr>
                <tr>
                  <th>Date:</th>
                  <td>{bus.departureDate}</td>
                </tr>
                <tr>
                  <th>No of Persons:</th>
                  <td><input type="number" className="form-control" value={noOfPersons} onChange={handleNoOfPersonsChange} /></td>
                </tr>
                <tr>
                  <th>Bus Name:</th>
                  <td>{bus.busName}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table">
              <tbody>
                <tr>
                  <th>To:</th>
                  <td>{bus.toDestination}</td>
                </tr>
                <tr>
                  <th>Price:</th>
                  <td>{bus.price}</td>
                </tr>
                <tr>
                  <th>Total Amount to be Paid:</th>
                  <td>{totalAmount}</td>
                </tr>
                <tr>
                  <th>Departure Time:</th>
                  <td>{bus.departureTime}</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-primary me-2" onClick={handlePayment}>Pay</button>
          </div>
        </div>
        {/* Booking status message */}
        {bookingStatus && (
          <div className="row mt-3">
            <div className="col-12 text-center">
              <p>{bookingStatus}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
