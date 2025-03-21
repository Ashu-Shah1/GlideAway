import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import TravelCommunity from "./components/TravelCommunity";
import Header from './components/Header';
import DestinationSearch from './components/DestinationSearch';
import WeatherUpdate from './components/WeatherUpdate';
import Footer from "./components/Footer";
import CommunityPostPage from './components/CommunityPostPage';
import Auth from './components/Authentication';
import { PopularDestinations } from './components/PopularDestinations';
import TransportOptions from './components/TransportOptions';
import Activities from './components/Activities'; 
import InteractiveMap from './components/InteractiveMap';
import StateInfo from './components/StatesInfo';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide header and navbar on /auth page
  const hideHeaderAndNavbar = location.pathname === "/auth";
  // Hide header on /community-post and /destination/:district pages
  const hideHeader = location.pathname === "/community-post" || location.pathname.startsWith("/destination/");

  return (
    <div>
      {!hideHeaderAndNavbar && <Navbar />}
      {!hideHeaderAndNavbar && !hideHeader && <Header />} {/* Hide header on /community-post and /destination/:district */}
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
        <Route path="/" element={<Navigate to="/home" />} /> 
        <Route path="/auth" element={<Auth />} />
        <Route 
          path="/destination/:district" 
          element={
            <Layout>
              <StateInfo />
            </Layout>
          } 
        />
        <Route path="/home" element={
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