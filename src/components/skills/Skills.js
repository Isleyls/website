import React from "react";
import "./../Background.css";
import '../../App.css';
import DisplaySkills from "./DisplaySkills";

function Skills() {
  return (
    <div className = "body2">
      <div className = "overlay">
        <h2>Skills Page</h2>
        <p>Welcome to my website!</p>
        <DisplaySkills />
      </div>
    </div>
  );
}

export default Skills;
