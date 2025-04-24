import React from "react";
import { useAuth } from "./useAuth"; // Import the custom hook
import { auth } from "./firebase";

function Profile() {
  const { userDetails, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {userDetails ? (
        <>
          <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
}

export default Profile;
