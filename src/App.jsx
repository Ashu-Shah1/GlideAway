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
import VideoSection from './components/VideoSection';
import StateInfo from './components/StatesInfo';
import AiFeature from './components/AiFeature';
import Treks from './components/Treks';
import AboutUs from './components/AboutUs';

const Layout = ({ children, hideHeader = false }) => {
  const location = useLocation();
  
  // Hide header and navbar on /auth page
  const hideHeaderAndNavbar = location.pathname === "/auth";
  // Hide header based on prop or specific routes
  const shouldHideHeader = hideHeader || location.pathname === "/community-post" || location.pathname.startsWith("/destination/") || location.pathname === "/AboutUs";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderAndNavbar && <Navbar />}
      {!hideHeaderAndNavbar && !shouldHideHeader && <Header />}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/activities" element={<Activities />} />
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
            <div className='mb-12'>
              <DestinationSearch />
            </div>
            <div className='mt-16'>
              <VideoSection />
            </div>
            <TransportOptions />
            <PopularDestinations />
            <Activities />
            <TravelCommunity />
            <div className='mt-16'>
              <InteractiveMap />
            </div>
          </Layout>
        } />
        <Route path="/community-post" element={
          <Layout>
            <CommunityPostPage />
          </Layout>
        } />
        <Route path="/aiFeature" element={
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <Layout hideHeader={true}>
              <AiFeature />
            </Layout>
          </div>
        } />
        <Route path="/trek" element={
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <Layout hideHeader={true}>
              <Treks />
            </Layout>
          </div>
        } />
        <Route path="/AboutUs" element={
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <Layout hideHeader={true}>
              <AboutUs />
            </Layout>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;