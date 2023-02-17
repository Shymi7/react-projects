import './App.css'
import {Tile} from "./Components/Tile";
import {DayCounter} from "./Components/DayCounter";
import {SunCalendar} from "./Components/SunCalendar";
import {News} from "./Components/News";

function App() {
  return (
    <div className={'flex flex-row flex-wrap'}>
        <Tile width={1} height={1}>
            <DayCounter/>
        </Tile>
        <Tile width={1} height={1}>
            <SunCalendar/>
        </Tile>
        <Tile width={1} height={1}>
            <News/>
        </Tile>
    </div>
  )
}

export default App
