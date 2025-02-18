// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import TravelCommunity from "./components/TravelCommunity";
import Header from './components/Header';
import Footer from "./components/Footer";
import CommunityPostPage from './components/CommunityPostPage';
import Auth from './components/auth'; // Import the SignUpPage component

const App = () => {
  return (
    <Router>
      <div>
        {/* Only render the Navbar and Header on non-sign-up routes */}
        <Routes>
          {/* Sign Up Route - No Navbar, Header, or Footer */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Main Routes with Navbar, Header, and Footer */}
          <Route path="/" element={<><Navbar /><Header /><TravelCommunity /></>} />
          <Route path="/community-post" element={<><Navbar /><Header /><CommunityPostPage /></>} />
        </Routes>

        {/* Render the Footer globally, except on the Sign Up page */}
        {window.location.pathname !== '/auth'}
      </div>
    </Router>
  );
}

export default App;
