import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import useUserRole from "./useUserRole";
import AddSkillCategory from "./AddSkillCategory";
import '../components/skillsTable.css';
import '../components/Background.css';
import '../App.css';

function SkillsDashboard() {
  const [skillsData, setSkillsData] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const { role, loading: loadingRole } = useUserRole();

  const fetchSkillsData = async () => {
    try {
      const skillsCollection = collection(db, "Skills");
      const skillsDocument = await getDocs(skillsCollection);
      const skillsList = skillsDocument.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSkillsData(skillsList);
      setLoadingSkills(false);
    } catch (error) {
      console.error("Error fetching skills data:", error);
      setLoadingSkills(false);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const handleDeleteSkill = async (categoryId, skillToDelete) => {
    try {
      const categoryRef = doc(db, "Skills", categoryId);
      const category = skillsData.find(item => item.id === categoryId);
      const updatedSkills = category.skills.filter(skill => skill !== skillToDelete);

      await updateDoc(categoryRef, {
        skills: updatedSkills
      });

      setSkillsData(prevSkills =>
        prevSkills.map(item =>
          item.id === categoryId
            ? { ...item, skills: updatedSkills }
            : item
        )
      );
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  if (loadingSkills || loadingRole) {
    return <div className="skillsTable"><p>Loading...</p></div>;
  }

  return (
    <div className="skillsTable">
      <h3>Skills Categories</h3>
      {skillsData.length > 0 ? (
        skillsData.map((skillCategory) => (
          <div key={skillCategory.id}>
            <table>
              <thead>
                <tr>
                  <th>{skillCategory.category}</th>
                </tr>
              </thead>
              <tbody>
                {skillCategory.skills.map((skill, index) => (
                  <tr key={index}>
                    <td>{skill}</td>
                    {role === "admin" && (
                      <td>
                        <button onClick={() => handleDeleteSkill(skillCategory.id, skill)}>
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
        <p>No skills data available.</p>
      )}

      {role === "admin" && (
        <div>
          <h3>Admin Dashboard</h3>
          <AddSkillCategory onSkillsUpdated={fetchSkillsData} />
        </div>
      )}
    </div>
  );
}

export default SkillsDashboard;
