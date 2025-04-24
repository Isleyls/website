import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function DisplaySkills() {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const skillsCollection = collection(db, "Skills");//grabs the skills collection
        const skillsDocument = await getDocs(skillsCollection); //gets all the documents from the collection
        const skillsList = skillsDocument.docs.map(doc => ({
          id: doc.id,
          ...doc.data() //this is a spread that joins data docID+doc.data(category and skills)
        }));

        // Set skills data with the data we made into an array to later traverse through it
        setSkillsData(skillsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills data:", error);
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3>Skills Categories</h3>
      {skillsData.length > 0 ? (
        skillsData.map((skillCategory) => (
          <div key={skillCategory.id}>
            <table border="1">
              <thead>
                <tr>
                  <th>{skillCategory.category}</th>
                </tr>
              </thead>
              <tbody>
                {skillCategory.skills.map((skill, index) => (
                  <tr key={index}>
                    <td>{skill}</td>
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
    </div>
  );
}

export default DisplaySkills;
