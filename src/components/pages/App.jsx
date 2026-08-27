import "../css/app.css"
import Die from "./die"
import {useState,useRef,useEffect} from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti-boom"

export default function App() {

    const [dice,newdice]=useState(()=>generateArray());

    const gamewon=(dice.every(die=>die.isheld) && dice.every(die=>die.value===dice[0].value));

    const buttonref=useRef(null);

    useEffect(()=>{
        if(gamewon){
            buttonref.current.focus();
        }
    },[gamewon]);
    
    function rollDie() {
        return Math.ceil(Math.random()*6);
    }

    function generateArray(){
        return new Array(10).fill(0).map(()=>({value:rollDie(),isheld:false,id:nanoid()}));
    }

    function roll()
    {
        if(!gamewon)
        {
            newdice(oldice=>oldice.map(die=>die.isheld?die:{...die,value:rollDie()}));
        }
        else
        {
            newdice(generateArray());
        }
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
            {gamewon && <Confetti mode="fall" particleCount={500} colors={['#ff577f', '#ff884b']}/>}
            <div aria-live="polite" className="sronly">
                {gamewon && <p>CONGRATULATION YOu WON!!! Press New Game to start another game.</p>}
            </div>
            <h1 className="title">Tenzie</h1>
            <p className="instruction">
                {gamewon
                    ? "Congratulations! You won! Press New Game to start another game."
                    : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
                }
            </p>

            <div className="dice-cont">
                {arr}
            </div>
            <button className="roll-dice" onClick={roll} ref={buttonref}>{gamewon?"New Game":"Roll"}</button>
        </main>
    )
}