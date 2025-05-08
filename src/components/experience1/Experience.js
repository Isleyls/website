import React from "react";
import "../Background.css";
import DisplayTables from "../tables/DisplayTables";

function Experience() {
  return (
    <div className = "body2">
      <div className = "overlay">
        <h2>Experience Page</h2>
        <DisplayTables collectionName = "Experience"/>
      </div>
    </div>
  );
}

export default Experience;
