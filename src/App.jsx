import LandingPage from "./Page's/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Page's/About";
import ContactUs from "./Page's/ContactUs";
import Navbar from "./Component/Navbar";
import DetailsPage from "./Page's/DetailsPage";
import CartPage from "./Page's/CartPage";
import Footer from "./Component/Footer";
import Seller from "./Page's/Seller";
import React from "react";
import Header from "./Page's/Header";
function App() {
  return (
    <Router>
      <Navbar />
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/product/:id" element={<DetailsPage />} />
        <Route path="/cartPage" element={<CartPage />} />
      </Routes>
     
      <Footer/>
    </Router>
 
  );
}

export default App;


