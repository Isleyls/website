import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import useUserRole from "../authorization/useUserRole";
import AddExperiencesCategory from "./AddExperiencesCategory";
import './experienceTable.css';
import '../Background.css';
import '../../App.css';

function ExperiencesDashboard() {
  const [experiencesData, setExperiencesData] = useState([]);
  const [loadingzExperience, setLoadingExperiences] = useState(true);
  const { role, loading: loadingRole } = useUserRole();

  const fetchExperiencesData = async () => {
    try {
      const experiencesCollection = collection(db, "Experience");
      const experiencesDocument = await getDocs(experiencesCollection);
      const experiencesList = experiencesDocument.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setExperiencesData(experiencesList);
      setLoadingExperiences(false);
    } catch (error) {
      console.error("Error fetching experience data:", error);
      setLoadingExperiences(false);
    }
  };

  useEffect(() => {
    fetchExperiencesData();
  }, []);

  const handleDeleteExperience = async (categoryId, experienceToDelete) => {
    try {
      const categoryRef = doc(db, "Experience", categoryId);
      const category = experiencesData.find(item => item.id === categoryId);
      const updatedExperiences = category.experiences.filter(experience => experience !== experienceToDelete);

      await updateDoc(categoryRef, {
        experiences: updatedExperiences
      });

      setExperiencesData(prevExperiences =>
        prevExperiences.map(item =>
          item.id === categoryId
            ? { ...item, experiences: updatedExperiences}
            : item
        )
      );
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };
  const handleDeleteExperienceCategory = async (categoryId) => {
    try {
        await deleteDoc(doc(db, "Experience", categoryId));
        alert("Category Deleted!");
        fetchExperiencesData(); 
      }
      catch (error) {
      console.error("Error deleting Experience Category:", error);
    }
  };

  return (
    <div className="experiencesTable">
      <h3>Experience Categories</h3>
      {experiencesData.length > 0 ? (
        experiencesData.map((experienceCategory) => (
          <div key={experienceCategory.id}>
            <table>
              <thead>
                <tr>
                  <th>{experienceCategory.category}</th>
                  {role === "admin" && (
                    <td className = "experience_delete">
                      <button onClick={() => handleDeleteExperienceCategory(experienceCategory.id)}>
                          Delete
                        </button>
                        </td>
                  )}
                  
                </tr>
              </thead>
              <tbody>
                {experienceCategory.experiences.map((experience, index) => (
                  <tr key={index}>
                    <td>{experience}</td>
                    {role === "admin" && (
                      <td>
                        <button onClick={() => handleDeleteExperience(experienceCategory.id, experience)}>
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
          </div>
        ))
      ) : (
        <p>No Experience data available.</p>
      )}

      {role === "admin" && (
        <div>
          <h3>Admin Dashboard</h3>
          <AddExperiencesCategory onExperiencesUpdated={fetchExperiencesData} />
        </div>
      )}
    </div>
  );
}

export default ExperiencesDashboard;
