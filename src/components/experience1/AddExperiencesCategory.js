import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import useUserRole from "../authorization/useUserRole";

function AddExperiencesCategory({ onExperiencesUpdated }) {
  const { role } = useUserRole();
  const [mode, setMode] = useState(""); // "category" or "addToCategory"
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [experiences, setExperiences] = useState("");

  const resetForm = () => {
    setCategoryId("");
    setCategoryName("");
    setExperiences("");
    setMode("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const experienceList = experiences.split(",").map(experience => experience.trim()).filter(experience => experience);

    if (role !== "admin") {
      alert("Only admins can add new experience.");
      return;
    }

    try {
      if (mode === "category") {
        await setDoc(doc(db, "Experience", categoryId.toLowerCase()), {
          category: categoryName,
          experiences: experienceList,
        });
        alert("New experience category added!");
      } else if (mode === "addToCategory") {
        const ref = doc(db, "Experience", categoryId.toLowerCase());
        const docSnap = await getDoc(ref);
        if (!docSnap.exists()) {
          alert("Category ID does not exist.");
          return;
        }

        const currentExperiences = docSnap.data().experiences || [];
        const newExperiences = [...new Set([...currentExperiences, ...experienceList])];

        await updateDoc(ref, { experiences: newExperiences });
        alert("Experiences added to existing category!");
      }

      resetForm();
      if (onExperiencesUpdated) onExperiencesUpdated();
    } catch (error) {
      console.error("Error adding experiences:", error.message);
    }
  };

  return role === "admin" ? (
    <div style={{ textAlign: "center" }}>
      <div>
        <button onClick={() => setMode("category")}>Add New Experience Category</button>
        <button onClick={() => setMode("addToCategory")}>Add Experiences to Existing Category</button>
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

          <label>Experiences (comma-separated):</label>
          <input
            type="text"
            value={experiences}
            onChange={(e) => setExperiences(e.target.value)}
            required
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  ) : (
    <p>You do not have permission to add experiences.</p>
  );
}

export default AddExperiencesCategory;
