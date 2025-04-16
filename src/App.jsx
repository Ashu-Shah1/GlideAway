import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import TravelCommunity from "./components/TravelCommunity";
import Header from './components/Header';
import DestinationSearch from './components/DestinationSearch';
import Footer from "./components/Footer";
import CommunityPostPage from './components/CommunityPostPage';
import Auth from './components/Authentication';
import { PopularDestinations } from './components/PopularDestinations';
import TransportOptions from './components/TransportOptions';
import Activities from './components/Activities'; 
import InteractiveMap from './components/InteractiveMap';
import VideoSection from './components/VideoSection';
import StateInfo from './components/StatesInfo';
// import AiFeature from './components/AiFeature';
import Feature from './components/Feature';
import Treks from './components/Treks';
import Adventure from './components/Adventure';
import Spiritual from './components/Spiritual';
import AboutUs from './components/AboutUs';
import Hotel from './components/HotelPage'
import { useRef } from 'react';

const Layout = ({ children, hideHeader = false, activitiesRef }) => {
  const location = useLocation();
  
  const hideHeaderAndNavbar = location.pathname === "/auth";
  const shouldHideHeader = hideHeader || location.pathname === "/community-post" || location.pathname.startsWith("/destination/") || location.pathname === "/AboutUs"
  || location.pathname === "/Hotels"
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderAndNavbar && <Navbar activitiesRef={activitiesRef} />}
      {!hideHeaderAndNavbar && !shouldHideHeader && <Header />}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
      {!hideHeaderAndNavbar && <Footer />}
    </div>
  );
};

const App = () => {
  const activitiesRef = useRef(null);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/destination/:district" 
            element={
              <Layout activitiesRef={activitiesRef}>
                <StateInfo />
              </Layout>
            } 
          />
          <Route path="/home" element={
            <Layout activitiesRef={activitiesRef}>
              <div className='mb-12'>
                <DestinationSearch />
              </div>
              <div className='mt-16'>
                <VideoSection />
              </div>
              <TransportOptions />
              <PopularDestinations />
              <div ref={activitiesRef}>
              <Activities />
              </div>
              <TravelCommunity />
              <div className='mt-16'>
                <InteractiveMap />
              </div>
            </Layout>
          } />
          <Route path="/community-post" element={
            <Layout activitiesRef={activitiesRef}>
              <CommunityPostPage />
            </Layout>
          } />
          <Route path="/Feature" element={
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <Feature />
              </Layout>
            </div>
          } />
          <Route path="/trek" element={
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <Treks />
              </Layout>
            </div>
          } />
          <Route path="/adventure" element={
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <Adventure />
              </Layout>
            </div>
          } />
          <Route path="/spiritual" element={
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <Spiritual />
              </Layout>
            </div>
          } />
          <Route path="/AboutUs" element={
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <AboutUs/>
              </Layout>
            </div>
          } />
          <Route path="/Hotels" element={
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <Hotel/>
              </Layout>
            </div>
          } />

        </Routes>
      </Router>
  );
};

export default App;