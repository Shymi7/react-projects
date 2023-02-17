import trollface from "../images/trollface.png";

export default Header =>{
    return(
        <div className="header">
            <div className="header-container">
                <img src={trollface}></img>
                <h2 className="header-title">Meme Generator</h2>
            </div>
        
            <span className="header-description">Made as exercise</span>
        </div>
    );
}