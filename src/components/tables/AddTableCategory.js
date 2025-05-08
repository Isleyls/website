import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import useUserRole from "../authorization/useUserRole";
import './tables.css';

function AddTableCategory({ onTablesUpdated, collectionName2 }) {
  const { role } = useUserRole();
  const [mode, setMode] = useState(""); // "category" or "addToCategory"
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [tables, setTables] = useState("");

  const resetForm = () => {
    setCategoryId("");
    setCategoryName("");
    setTables("");
    setMode("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tableList = tables.split(",").map(table => table.trim()).filter(table => table);

    if (role !== "admin") {
      alert("Only admins can add new tables.");
      return;
    }

    try {
      if (mode === "category") {
        await setDoc(doc(db, collectionName2, categoryId.toLowerCase()), {
          category: categoryName,
          tables: tableList,
        });
        alert("New table category added!");
      } else if (mode === "addToCategory") {
        const ref = doc(db, collectionName2, categoryId.toLowerCase());
        const docSnap = await getDoc(ref);
        if (!docSnap.exists()) {
          alert("Category ID does not exist.");
          return;
        }

        const currentTables = docSnap.data().tables || [];
        const newTables = [...new Set([...currentTables, ...tableList])];

        await updateDoc(ref, { tables: newTables });
        alert(`New ${collectionName2} have been added to the existing category!`);
      }

      resetForm();
      if (onTablesUpdated) onTablesUpdated();
    } catch (error) {
      console.error(`Error adding ${collectionName2}:`, error.message);
    }
  };

  return role === "admin" ? (
    <div style={{ textAlign: "center" }}>
      <div>
        <button onClick={() => setMode("category")}>Add New {collectionName2} Category</button>
        <button onClick={() => setMode("addToCategory")}>Add {collectionName2} to Existing Category</button>
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

          <label>Tables (comma-separated):</label>
          <input
            type="text"
            value={tables}
            onChange={(e) => setTables(e.target.value)}
            required
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  ) : (
    <p>You do not have permission to add tables.</p>
  );
}

export default AddTableCategory;
