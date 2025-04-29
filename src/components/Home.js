import React from "react";
import "./Background.css";
import { useAuth } from "./useAuth"; 

function Home() {
  const { userDetails, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return (
    <div className="body2">
      <div className="overlay">
      {userDetails ? (
        <h2>Welcome, {userDetails.firstName}!</h2>
      ) : (
        <h1>Welcome to the Homepage</h1>
      )}
      </div>
    </div>
  );
}

export default Home;
