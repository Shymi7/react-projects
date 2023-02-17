import LocationList from "../data.js";
import Card from "./Card";


export default function Feed(){
    const data = LocationList.map(
        singleLocationData => 
            <Card
                key = { singleLocationData.id }
                item = { singleLocationData }
            />
    );
    return(
        <div className="feed">
            { data }
        </div>
    );
}