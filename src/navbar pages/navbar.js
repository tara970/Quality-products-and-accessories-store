import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/navbar.css";

function Navbar() {
  const location = useLocation();

  if (location.pathname !== "/products") return null;

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/products/main-page">MainPage</Link>
        <Link to="/products/all-products">AllProducts</Link>
        <Link to="/products/about-us">AboutUs</Link>
        <Link to="/products/contact-us">ContactUs</Link>
      </div>
    </div>
  );
}

export default Navbar;
