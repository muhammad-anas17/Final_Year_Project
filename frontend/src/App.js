import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your pages
import Add from './Pages/Add';
import Books from './Pages/Books';
import Update from './Pages/Update';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Uquestion from './Pages/Uquestion';
import Cdashboard from './Pages/Cdashboard';
import Cquestion from './Pages/Cquestion';

// Import components for homepage sections
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ImageSlider from './components/ImageSlider';

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navbar */}
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>

                {/* Hero Section */}
                <HeroSection />

                {/* Image Slider */}
                <ImageSlider />

                {/* Footer */}
                <Footer />
              </>
            }
          />
          {/* Other Routes */}
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/cdashboard/:userId" element={<Cdashboard />} />
          <Route path="/uquestion/:userId" element={<Uquestion />} />
          <Route path="/cquestion/:userId" element={<Cquestion />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

