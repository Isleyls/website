import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import useUserRole from "../authorization/useUserRole";
import AddTableCategory from "./AddTableCategory";
import './tables.css';
import '../Background.css';
import '../../App.css';

function TablesDashboard({collectionName}) {
  const [tablesData, setTablesData] = useState([]);
  const [loadingTables, setLoadingTables] = useState(true);
  const { role, loading: loadingRole } = useUserRole();

  const fetchTablesData = async () => {
    try {
      const tablesCollection = collection(db, collectionName);
      const tablesDocument = await getDocs(tablesCollection);
      const tablesList = tablesDocument.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTablesData(tablesList);
      setLoadingTables(false);
    } catch (error) {
      console.error("Error fetching table data:", error);
      setLoadingTables(false);
    }
  };

  useEffect(() => {
    fetchTablesData();
  }, []);

  const handleDeleteTable = async (categoryId, tableToDelete) => {
    try {
      const categoryRef = doc(db, collectionName, categoryId);
      const category = tablesData.find(item => item.id === categoryId);
      const updatedTables = category.tables.filter(table => table !== tableToDelete);

      await updateDoc(categoryRef, {
        tables: updatedTables
      });

      setTablesData(prevTables =>
        prevTables.map(item =>
          item.id === categoryId
            ? { ...item, tables: updatedTables }
            : item
        )
      );
    } catch (error) {
      console.error("Error deleting {collectionName}:", error);
    }
  };
  const handleDeleteTableCategory = async (categoryId) => {
    try {
        const category = tablesData.find(item => item.id === categoryId);
        
        await deleteDoc(doc(db, collectionName, categoryId));
        alert(`${category.category} has been deleted from ${collectionName} collection!`);
        fetchTablesData(); 
      }
      catch (error) {
      console.error("Error deleting Table Category:", error);
    }
  };

  return (
    <div className="categoryTable">
      {role === "admin" && (
        <div>
          <h3>Admin Dashboard</h3>
          <AddTableCategory onTablesUpdated={fetchTablesData} collectionName2 = {collectionName} />
        </div>
      )}
      <div className = "tablesGrid">
      {tablesData.length > 0 ? (
        tablesData.map((tableCategory) => (
          <div key={tableCategory.id} className = "tableCard">
            <table>
              <thead>
                <tr>
                  <th>{tableCategory.category}</th>
                  {role === "admin" && (
                    <td className = "delete1">
                      <button onClick={() => handleDeleteTableCategory(tableCategory.id)}>
                          Delete
                        </button>
                        </td>
                  )}
                  
                </tr>
              </thead>
              <tbody>
                {(tableCategory.tables).map((table, index) => ( //may need (tableCategory.tables || []) at some point
                  <tr key={index}>
                    <td>{table}</td>
                    {role === "admin" && (
                      <td>
                        <button onClick={() => handleDeleteTable( tableCategory.id, table)}>
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

      </div>

    </div>
  );
}

export default TablesDashboard;
