import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react'; // Clerk auth hook
import Navbar from "./components/Navbar";
import TravelCommunity from "./components/TravelCommunity";
import Header from './components/Header';
import DestinationSearch from './components/DestinationSearch';
import Footer from "./components/Footer";
import CommunityPostPage from './components/CommunityPostPage';
import { PopularDestinations } from './components/PopularDestinations';
import Activities from './components/Activities'; 
import InteractiveMap from './components/InteractiveMap';
import VideoSection from './components/VideoSection';
import StateInfo from './components/StatesInfo';
import PlanTrip from './components/PlanTrip';
import Treks from './components/Treks';
import Adventure from './components/Adventure';
import Spiritual from './components/Spiritual';
import AboutUs from './components/AboutUs';
import Hotel from './components/HotelPage';
import Auth from './components/Authentication';

const Layout = ({ children, hideHeader = false, activitiesRef }) => {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  
  // Hide header/navbar on auth page or when not signed in
  const hideHeaderAndNavbar = location.pathname === "/auth" || !isSignedIn;
  const shouldHideHeader = hideHeader || location.pathname === "/community-post" || 
    location.pathname.startsWith("/destination/") || location.pathname === "/AboutUs" ||
    location.pathname === "/Hotels";
  
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

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  
  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

const AuthRedirect = () => {
  const { isSignedIn } = useAuth();
  
  if (isSignedIn) {
    return <Navigate to="/home" replace />;
  }
  
  return (
    <Layout>
      <Auth />
    </Layout>
  );
};

const App = () => {
  const activitiesRef = useRef(null);

  return (
    <Router>
      <Routes>
        {/* Root path redirects to auth if not signed in, or home if signed in */}
        <Route path="/" element={
          <ProtectedRoute>
            <Navigate to="/home" replace />
          </ProtectedRoute>
        } />
        
        {/* Auth route - shows signup/login */}
        <Route path="/auth" element={<AuthRedirect />} />

        {/* Home route - protected */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Layout activitiesRef={activitiesRef}>
              <div className='mb-12'>
                <DestinationSearch />
              </div>
              <div className='mt-16'>
                <VideoSection />
              </div>
              <PopularDestinations />
              <div ref={activitiesRef}>
                <Activities />
              </div>
              <TravelCommunity />
              <div className='mt-16'>
                <InteractiveMap />
              </div>
            </Layout>
          </ProtectedRoute>
        } />

        {/* All other protected routes */}
        <Route path="/destination/:district" element={
          <ProtectedRoute>
            <Layout activitiesRef={activitiesRef}>
              <StateInfo />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/community-post" element={
          <ProtectedRoute>
            <Layout activitiesRef={activitiesRef}>
              <CommunityPostPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/PlanTrip" element={
          <ProtectedRoute>
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <PlanTrip />
              </Layout>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/trek" element={
          <ProtectedRoute>
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <Treks />
              </Layout>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/adventure" element={
          <ProtectedRoute>
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <Adventure />
              </Layout>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/spiritual" element={
          <ProtectedRoute>
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <Spiritual />
              </Layout>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/AboutUs" element={
          <ProtectedRoute>
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <AboutUs />
              </Layout>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/Hotels" element={
          <ProtectedRoute>
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              <Layout hideHeader={true} activitiesRef={activitiesRef}>
                <Hotel />
              </Layout>
            </div>
          </ProtectedRoute>
        } />

        {/* Catch-all route redirects to auth */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
};

export default App;