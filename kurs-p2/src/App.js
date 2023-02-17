import './App.sass';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Feed from './components/Feed';
import Joke from './components/Joke';
import jokesData from "./jokesData";

function App() {
  const jokes = jokesData.map(
    joke => {
      return <Joke setup={joke.setup} punchline={joke.punchline}/>
    } 
  );


  return (
    <div className="App">
        <Navbar />
        <Banner /> 
        <Feed />
        {/* <div className='jokes'>
          {jokes}
        </div> */}


    </div>
  );
}

export default App;
