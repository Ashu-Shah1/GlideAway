import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import TravelCommunity from "./components/TravelCommunity";
import Header from './components/Header';
import DestinationSearch from './components/DestinationSearch';
import WeatherUpdate from './components/WeatherUpdate';
import Footer from "./components/Footer";
import CommunityPostPage from './components/CommunityPostPage';
import Auth from './components/auth';
import {PopularDestinations} from './components/PopularDestinations'; // Import the PopularDestinations component

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <>
                  <DestinationSearch />
                  <WeatherUpdate />
                  <PopularDestinations /> {/* Add PopularDestinations here */}
                  <TravelCommunity />
                </>
              }
            />
            <Route path="/community-post" element={<CommunityPostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;