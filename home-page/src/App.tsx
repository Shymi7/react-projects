import './App.css'
import {Tile} from "./Components/Tile";
import {DayCounter} from "./Components/DayCounter";
import {SunCalendar} from "./Components/SunCalendar";
import {News} from "./Components/News";
import {ToDoList} from "./Components/ToDoList";

function App() {
  return (
    <div className={'flex flex-row flex-wrap'}>
        <Tile width={1} height={1}>
            <DayCounter/>
        </Tile>
        {/*<Tile width={1} height={1}>*/}
        {/*    <SunCalendar/>*/}
        {/*</Tile>*/}
        {/*<Tile width={1} height={1}>*/}
        {/*    <News/>*/}
        {/*</Tile>*/}
        <Tile width={1} height={1}>
            <ToDoList/>
        </Tile>
    </div>
  )
}

export default App
