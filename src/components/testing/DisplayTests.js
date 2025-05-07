import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import useUserRole from "../authorization/useUserRole";
import AddTestCategory from "./AddTestCategory";
import './testTable.css';
import '../Background.css';
import '../../App.css';

function TestsDashboard({collectionName}) {
  const [testsData, setTestsData] = useState([]);
  const [loadingTests, setLoadingTests] = useState(true);
  const { role, loading: loadingRole } = useUserRole();

  const fetchTestsData = async () => {
    try {
      const testsCollection = collection(db, collectionName);
      const testsDocument = await getDocs(testsCollection);
      const testsList = testsDocument.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestsData(testsList);
      setLoadingTests(false);
    } catch (error) {
      console.error("Error fetching tests data:", error);
      setLoadingTests(false);
    }
  };

  useEffect(() => {
    fetchTestsData();
  }, []);

  const handleDeleteTest = async (categoryId, testToDelete) => {
    try {
      const categoryRef = doc(db, collectionName, categoryId);
      const category = testsData.find(item => item.id === categoryId);
      const updatedTests = category.tests.filter(test => test !== testToDelete);

      await updateDoc(categoryRef, {
        tests: updatedTests
      });

      setTestsData(prevTests =>
        prevTests.map(item =>
          item.id === categoryId
            ? { ...item, tests: updatedTests }
            : item
        )
      );
    } catch (error) {
      console.error("Error deleting {collectionName}:", error);
    }
  };
  const handleDeleteTestCategory = async (categoryId) => {
    try {
        const category = testsData.find(item => item.id === categoryId);
        
        await deleteDoc(doc(db, collectionName, categoryId));
        alert(`${category.category} has been deleted from ${collectionName} collection!`);
        fetchTestsData(); 
      }
      catch (error) {
      console.error("Error deleting Test Category:", error);
    }
  };

  return (
    <div className="categoryTable">
      <h3>{collectionName} Categories</h3>
      {testsData.length > 0 ? (
        testsData.map((testCategory) => (
          <div key={testCategory.id}>
            <table>
              <thead>
                <tr>
                  <th>{testCategory.category}</th>
                  {role === "admin" && (
                    <td className = "delete1">
                      <button onClick={() => handleDeleteTestCategory(testCategory.id)}>
                          Delete
                        </button>
                        </td>
                  )}
                  
                </tr>
              </thead>
              <tbody>
                {(testCategory.tests).map((test, index) => ( //may need (testCategory.tests || []) at some point
                  <tr key={index}>
                    <td>{test}</td>
                    {role === "admin" && (
                      <td>
                        <button onClick={() => handleDeleteTest( testCategory.id, test)}>
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
        <p>No {collectionName} data available.</p>
      )}

      {role === "admin" && (
        <div>
          <h3>Admin Dashboard</h3>
          <AddTestCategory onTestsUpdated={fetchTestsData} collectionName2 = {collectionName} />
        </div>
      )}
    </div>
  );
}

export default TestsDashboard;
