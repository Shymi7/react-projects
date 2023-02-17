import React from "react";
import Card from "./Card.js"
import data from "../data.js";

export default function Feed(){
    const cardArray = data.map(
        singleCardData => 
            <Card
                key = { singleCardData.id }
                data = { singleCardData }
            />
    );
    return(
        <div className="feed">
            {cardArray}
        </div>
    );
}