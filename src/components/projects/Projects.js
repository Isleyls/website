import React from "react";
import "./../Background.css";
import '../../App.css';
import DisplayTests from "../tables/DisplayTables";

function Projects(){
    return(
        <div className = "body2">
            <div className = "overlay">
                <h1>Projects page</h1>
                <DisplayTests collectionName = "Projects"/>
            </div>
        </div>
    );
}

export default Projects;