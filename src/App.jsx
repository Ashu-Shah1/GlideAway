import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import TravelCommunity from "./components/TravelCommunity";
import Header from './components/Header';
import DestinationSearch from './components/DestinationSearch';
import WeatherUpdate from './components/WeatherUpdate';
import Footer from "./components/Footer";
import CommunityPostPage from './components/CommunityPostPage';
import Auth from './components/auth';
import { PopularDestinations } from './components/PopularDestinations';
import TransportOptions from './components/TransportOptions';
import Activities from './components/Activities'; 
import InteractiveMap from './components/InteractiveMap';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide header and navbar on /auth page
  const hideHeaderAndNavbar = location.pathname === "/auth";

  return (
    <div>
      {!hideHeaderAndNavbar && <Navbar />}
      {!hideHeaderAndNavbar && <Header />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
      {!hideHeaderAndNavbar && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={
          <Layout>
            <DestinationSearch />
            <WeatherUpdate />
            <InteractiveMap />
            <TransportOptions />
            <PopularDestinations />
            <Activities />
            <TravelCommunity />
          </Layout>
        } />
        <Route path="/community-post" element={
          <Layout>
            <CommunityPostPage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
