import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DashboardPage from './components/DashboardPage';
import BookPage from './components/BookPage';
import MyBookingsPage from './components/MyBookingsPage';
import FeedBackPage from './components/FeedBackPage';
import AddTourPackagePage from './components/AddTourPackagePage';
import ViewRecordsPage from './components/ViewRecordsPage';
import EditPackagePage from './components/EditPackagePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/book" element={<BookPage/>} />
        <Route path="/my-bookings" element={<MyBookingsPage/>} />
        <Route path="/feedback" element={<FeedBackPage/>} />
        <Route path="/add-package" element={<AddTourPackagePage/>} />
        <Route path="/view-records" element={<ViewRecordsPage/>} />
        <Route path="/edit-package/:id" element={<EditPackagePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
