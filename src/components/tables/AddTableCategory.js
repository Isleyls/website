import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import useUserRole from "../authorization/useUserRole";
import './tables.css';

function AddTableCategory({ onTablesUpdated, collectionName2 }) {
  const { role } = useUserRole();
  const [mode, setMode] = useState(""); // "category" or "addToCategory or "projects" or "experience"
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDescription] = useState("");
  const [dates, setDates] = useState("");
  const [jobCompany, setCompany] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [tables, setTables] = useState("");

  const resetForm = () => {
    setCategoryId("");
    setCategoryName("");
    setProjectName("");
    setJobTitle("");
    setProjectDescription("");
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
      if (mode === "skills") {
        await setDoc(doc(db, collectionName2, categoryId.toLowerCase()), {
          category: categoryName,
          tables: tableList,
        });
        alert("New table category added!");
      } 
      else if (mode === "addToSkills") 
      {
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
      else if (mode === "Projects") 
      {
        await setDoc(doc(db, collectionName2, categoryId.toLowerCase()), {
          project: projectName,
          description: projectDescription,
        });
        alert("New table category added!");
      }
      else if (mode === "Experience") 
      {
        await setDoc(doc(db, collectionName2, categoryId.toLowerCase()), {
          jobtitle: jobTitle,
          jobDescription: jobDesc,
          jobDates: dates,
          company: jobCompany,
        });
        alert("New table category added!");
      }

      resetForm();
      if (onTablesUpdated) onTablesUpdated();
    } catch (error) {
      console.error(`Error adding ${collectionName2}:`, error.message);
    }
  };
//Projects vs skills page. Instead of add new category have a Add New Project with a title name, and description with dates worked on.
//Make the description, title, and date Editable
//also make a skill editable
  return role === "admin" ? (
    <div style={{ textAlign: "center" }}>
      <div>
        {collectionName2 === "Skills" ? (
          <>
            <button onClick={() => setMode("skills")}>Add New {collectionName2} Category</button>
            <button onClick={() => setMode("addToSkills")}>Add {collectionName2} to Existing Category</button>
            
          </>
        ): collectionName2 === "Projects" ? (<button onClick={() => setMode("Projects")}>Add New Project</button>
        ):(
          <>
            <button onClick={() => setMode("Experience")}>Add New Experience</button>
          </>
        )}
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

          {mode === "skills" && (
            <>
              <label>Category Name:</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
              <br/>
              </>
          )}
          {mode === "skills" || mode === "addToSkills" ? (
              <>
              <label>Skills (comma-separated list):</label>
              <input
                type="text"
                value={tables}
                onChange={(e) => setTables(e.target.value)}
                required
              />
              <br />
            </>
          ): mode === "Projects" ? (
            <>
              <label> Project Name:</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
              <br />
              <div className = "textArea">
                <label className = "description"> Project Description:</label>
                <textarea
                  className="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                />
              </div>
            </>
          ): (
            <>
              <label> Job Title:</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
              <br />
              <div className = "textArea">
                <label className = "description"> Job Description:</label>
                <textarea
                  className="jobDescription"
                  value={jobDesc}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                />
              </div>
              <label> Job Dates:</label>
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                required
              />
              <br />
              <label> Company & Location (company, address):</label>
              <input
                type="text"
                value={jobCompany}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
              <br />
            </>
          )}

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
