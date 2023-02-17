import memesData from "../memesData";

export default Form =>{

    function changeMemeImage(){
        
    }


    return(
        <div className="form">
            <input type="text" className="form-textInput" id="formTop" placeholder="Top text"/>
            <input type="text" className="form-textInput" id="formBottom" placeholder="Bottom text"/>
            <button className="form-generateButton">Get meme image</button>
            <div className="memeBackground" style={{
                    backgroundImage: `url("`+memesData.data.memes[Math.floor(Math.random()*memesData.data.memes.length)].url+`")` 
                }}
            >
                asdfasdf
            </div>
        </div>
    )
}