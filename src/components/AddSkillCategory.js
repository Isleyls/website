import React, { useState } from "react";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import useUserRole from "./useUserRole";

function AddSkillCategory() {
  const { role } = useUserRole();
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "admin") {
      alert("Only admins can add new skills.");
      return;
    }

    const skillList = skills.split(",").map(skill => skill.trim());

    try {
      await setDoc(doc(db, "Skills", categoryId.toLowerCase()), {
        category: categoryName,
        skills: skillList,
      });
      alert("New skill category added!");
      setCategoryId("");
      setCategoryName("");
      setSkills("");
    } catch (error) {
      console.error("Error adding skills:", error.message);
    }
  };

  return role === "admin" ? (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h3>Add New Skill Category</h3>
      <label>Document ID (no spaces):</label>
      <input
        type="text"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="e.g., programming_languages"
        required
      />
      <br />

      <label>Category Name:</label>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="e.g., Programming Languages"
        required
      />
      <br />

      <label>Skills (comma-separated):</label>
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="e.g., Java, Python, C++"
        required
      />
      <br />

      <button type="submit">Add New Skills</button>
    </form>
  ) : (
    <p>You do not have permission to add skills.</p>
  );
}

export default AddSkillCategory;
