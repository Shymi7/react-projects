import React from "react";


export default class Joke extends React.Component{
    

    constructor(props){
        super(props);
        this.state={
            punchlineVisible : false
        };
    }

    getPunchlineIfVisible = () => {
        return this.state.punchlineVisible ? this.props.punchline : ""    
    }

    render(){
        return(
            <div className="joke">
                {true}
                <p className="joke-setup">{this.props.setup}</p>
                <button 
                    onClick={ 
                        () =>{
                            this.setState({punchlineVisible: !this.state.punchlineVisible});
                        }
                    } 
                >
                    {
                        (() => {
                            return this.state.punchlineVisible ? "Hide punchline" : "Show punchline";
                        })()//probably it is better practice to use separate method, like below
                    }
                </button>
                <p className="joke-punchline">{this.getPunchlineIfVisible()}</p>
            </div>
        );
    }

}