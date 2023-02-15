import {useEffect, useState} from "react";
import axios from "axios";


export function News(){
    const apiKey = 'key'; //do not push to GitHub
    const country='pl';

    const [isContentLoaded, setIsContentLoaded] = useState(false);
    let rawContent;
    let newsElements;

    useEffect(()=>{
        getNews().then();
    },[])

    async function getNews(){
        try{
            const dataFromRequest =
                await axios({
                    method:'get',
                    url:'https://newsapi.org/v2/top-headlines?country='+country+'&apiKey='+apiKey,
                    responseType: 'stream'
                }).then((response)=>{
                    newsElements = JSON.parse(response.data).articles.map((article:any)=>{
                        return(
                            <div>
                                {article.title}
                            </div>
                        );

                    })
                    setIsContentLoaded(true);
                })

            // console.log(JSON.parse(dataFromRequest.data).articles);



        } catch (e){
            console.log(e);
        }

    }

    return(
        <div className={'w-full h-full overflow-scroll'}>
            {isContentLoaded && newsElements}
        </div>
    )
}
