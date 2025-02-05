import React from 'react';

import Navbar from "./components/Navbar";
import TravelCommunity from "./components/TravelCommunity";
import Header from './components/Header';
import Footer from "./components/Footer";


const App = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TravelCommunity />
      </main>
      <Footer />
    </div>
  )
}

export default App;
