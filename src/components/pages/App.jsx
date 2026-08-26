import "../css/app.css"
import Die from "./die"
import {useState} from "react"
import {nanoid} from "nanoid"

export default function App() {

    const [dice,newdice]=useState(generateArray());

    function generateArray(){
        return new Array(10).fill(0).map(()=>({value:Math.ceil(Math.random()*6),isheld:false,id:nanoid()}));
    }

    function roll()
    {
        newdice(oldice=>oldice.map(die=>die.isheld?die:{...die,value:Math.ceil(Math.random()*6)}))
    }

    function hold(id){
        newdice(olddice=>olddice.map(die=>
                die.id===id?{...die,isheld:!die.isheld}:die
            ))  
    }

    const arr=dice
            .map(dieobj=>
                <Die 
                    value={dieobj.value} 
                    key={dieobj.id}
                    isheld={dieobj.isheld}
                    hold={()=>hold(dieobj.id)}
                    id={dieobj.id}
                />);

    return (
        <main>
            <h1 className="title">Tenzie</h1>
            <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-cont">
                {arr}
            </div>
            <button className="roll-dice" onClick={roll}>Roll</button>
        </main>
    )
}