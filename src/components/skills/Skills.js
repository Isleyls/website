import React from "react";
import "./../Background.css";
import '../../App.css';
import DisplayTables from "../tables/DisplayTables";

function Skills() {
  return (
    <div className = "body2">
      <div className = "overlay">
        <h2>My Skills</h2>
        <DisplayTables collectionName = "Skills"/>
      </div>
    </div>
  );
}

export default Skills;
