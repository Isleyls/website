import React from "react";
import "./../Background.css";
import '../../App.css';
import DisplayTests from "./DisplayTests";

function Tests(){
    return(
        <div className = "body2">
            <div className = "overlay">
                <h1>Testing page</h1>
                <DisplayTests collectionName = "Tests" />
            </div>
        </div>
    );
}

export default Tests;