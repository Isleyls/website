import React from "react";
import useUserRole from "./useUserRole";
import AddSkillCategory from "./AddSkillCategory";

function Testing() {
  const { role, loading } = useUserRole();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {role === "admin" ? (
        <div>
          <h3>Admin Dashboard</h3>
          {}
          <AddSkillCategory />
        </div>
      ) : (
        <div>
          <h3>User Profile</h3>
          {}
        </div>
      )}
    </div>
  );
}

export default Testing;
