import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../authorization/useAuth"; 
import { auth } from "../firebase";

function Header() {
  const { userDetails } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // NEW

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className="header">
      <div className="nav-container">
        <div className="logo">Logo</div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Nav Links with toggle class */}
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
          <NavLink to="/skills" className={({ isActive }) => (isActive ? "active" : "")}>Skills</NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>Projects</NavLink>
          <NavLink to="/experience" className={({ isActive }) => (isActive ? "active" : "")}>Experience</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
          <NavLink to="/meeting" className={({ isActive }) => (isActive ? "active" : "")}>Meeting</NavLink>
        </div>

        <div className="sign-in">
          {userDetails ? (
            <button className="sign-in-button" onClick={handleLogout}>Sign Out</button>
          ) : (
            <Link to="/signin" className="sign-in-button">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
