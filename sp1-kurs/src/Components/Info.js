import React from "react";
import profilePic from "../images/profile-pic.png";


function Info(){
    return(
        <div className="info">
            <img src={profilePic} className="info-profile-pic" alt="profile picture" ></img>
            <h1>Adam Nowak</h1>
            <h3>Frontend developer</h3>
            <div className="info-links">
                <button className="info-links-github">GitHub</button>
                <button className="info-links-email">Email</button>
            </div>
        </div>
    );
}

export default Info;