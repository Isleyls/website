import React from "react";
import "./../Background.css";
import '../../App.css';
import DisplayTests from "../testing/DisplayTests";

function Skills() {
  return (
    <div className = "body2">
      <div className = "overlay">
        <h2>Skills Page</h2>
        <p>Welcome to my website!</p>
        <DisplayTests collectionName = "Skills"/>
      </div>
    </div>
  );
}

export default Skills;
