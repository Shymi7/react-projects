import './App.css'
import {Tile} from "./Components/Tile";
import {DayCounter} from "./Components/DayCounter";

function App() {
  return (
    <div className={'flex flex-row flex-wrap'}>
        <Tile width={1} height={1}>
            <DayCounter/>
        </Tile>
        <Tile width={1} height={1}>
            tile 2
        </Tile>
    </div>
  )
}

export default App
