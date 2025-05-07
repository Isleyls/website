import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import useUserRole from "../authorization/useUserRole";

function AddSkillCategory({ onSkillsUpdated }) {
  const { role } = useUserRole();
  const [mode, setMode] = useState(""); // "category" or "addToCategory"
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [skills, setSkills] = useState("");

  const resetForm = () => {
    setCategoryId("");
    setCategoryName("");
    setSkills("");
    setMode("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillList = skills.split(",").map(skill => skill.trim()).filter(skill => skill);

    if (role !== "admin") {
      alert("Only admins can add new skills.");
      return;
    }

    try {
      if (mode === "category") {
        await setDoc(doc(db, "Skills", categoryId.toLowerCase()), {
          category: categoryName,
          skills: skillList,
        });
        alert("New skill category added!");
      } else if (mode === "addToCategory") {
        const ref = doc(db, "Skills", categoryId.toLowerCase());
        const docSnap = await getDoc(ref);
        if (!docSnap.exists()) {
          alert("Category ID does not exist.");
          return;
        }

        const currentSkills = docSnap.data().skills || [];
        const newSkills = [...new Set([...currentSkills, ...skillList])];

        await updateDoc(ref, { skills: newSkills });
        alert("Skills added to existing category!");
      }

      resetForm();
      if (onSkillsUpdated) onSkillsUpdated();
    } catch (error) {
      console.error("Error adding skills:", error.message);
    }
  };

  return role === "admin" ? (
    <div style={{ textAlign: "center" }}>
      <div>
        <button onClick={() => setMode("category")}>Add New Skill Category</button>
        <button onClick={() => setMode("addToCategory")}>Add Skills to Existing Category</button>
      </div>

      {mode && (
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
          <label>Category ID (document ID):</label>
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
          <br />

          {mode === "category" && (
            <>
              <label>Category Name:</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
              <br />
            </>
          )}

          <label>Skills (comma-separated):</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  ) : (
    <p>You do not have permission to add skills.</p>
  );
}

export default AddSkillCategory;
