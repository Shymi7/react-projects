export default function Card({item}){
    return(
        <div className="card">
            <img src={ item.imageUrl }></img>
            <div className="card-container">
                <span className="card-location">{ item.location } &nbsp;&nbsp;</span>
                <a className="card-googleMapsURL" href={ item.googleMapsUrl }>View on Google Maps</a>
                <h1 className="card-title">{ item.title }</h1>
                <span className="card-dates">{ item.startDate + " - " + item.endDate}</span>
                <article className="card-description">{ item.description }</article>
            </div>

        </div>
    );
}