import React from "react";
import star from "../images/star.png"

export default function Card({data}){
    let badgeText;

    if ( data.openSpots === 0 ){
        badgeText = "Sold out";
    } else if ( data.location === "Online" ){
        badgeText = "Online";
    }

    return(
        <div className="card">
            <img src={`./images/${data.coverImg}`} className="card-image"></img>
            {(data.openSpots === 0 || data.location === "Online") &&<div className="card-badge">{badgeText}</div>}
            <div className="card-reviewsAndCountry">
                <img src={star}></img>
                <span className="card-rating">{data.stats.rating}</span>
                <span className="card-reviewCount">({data.stats.reviewCount})</span>
                {data.location !== "Online" && <span className="card-country">&nbsp; &#8226; &nbsp;{data.location}</span>}
            </div>
            <h2 className="card-title">{data.title}</h2>
            <span className="card-price">
                <b>From {data.price}zł</b> / person
            </span>
        </div>
    );
}