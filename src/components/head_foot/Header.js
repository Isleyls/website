import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Ensure this file is properly linked
import { useAuth } from "../authorization/useAuth"; 
import { auth } from "../firebase";

function Header() {
  const { userDetails } = useAuth();

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
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/skills">Skills</Link>
          
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/meeting">Meeting</Link>

        </div>
        <div className="sign-in">
         {userDetails ? (
            <>
              <button className="sign-in-button" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/signin" className="sign-in-button">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
