import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footerTemp';
import SimulatorPage from './pages/SimulatorPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FundCategoriesPage from './pages/FundCategoriesPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<SimulatorPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/fund-categories" element={<FundCategoriesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;