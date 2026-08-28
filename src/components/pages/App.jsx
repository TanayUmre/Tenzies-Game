import "../css/app.css"
import Die from "./die"
import {useState,useRef,useEffect} from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti-boom"

export default function App() {

    const [dice,newdice]=useState(()=>generateArray(10));

    const [difficulty,setDifficulty]=useState("normal");

    const [time,setTime]=useState(0);

    const [timerRunning,setTimerRunning]=useState(false);

    const [score,setScore]=useState(0);

    const diceCount={easy:8, normal:10, hard:12}[difficulty];

    const [rolls,setRolls]=useState(0);

    const gamewon=(dice.every(die=>die.isheld) && dice.every(die=>die.value===dice[0].value));

    const buttonref=useRef(null);

    const startTimeRef=useRef(null);

    useEffect(()=>{
        if(gamewon){
            buttonref.current.focus();
        }
    },[gamewon]);
    
    useEffect(()=>{
        newdice(generateArray(diceCount));
        setTime(0);
        setTimerRunning(false);
        setRolls(0);
        setScore(0);
        startTimeRef.current=null;
    },[diceCount]);

    useEffect(()=>{
        if(!timerRunning)
        {
            return;
        }
        const timer=setInterval(()=>{
            setTime(prev=>prev+10);
        },10);
        return ()=>clearInterval(timer);
    },[timerRunning])

    useEffect(()=>{
        if(gamewon)
        {
            setTimerRunning(false);
            setScore(calcScore());
        }
    },[gamewon]);

    function formattime(milliseconds){
        const min=Math.floor(milliseconds/60000);
        const remsec=Math.floor((milliseconds%60000)/1000);
        const millisec=milliseconds%1000;

        return `${String(min).padStart(2,"0")}:${String(remsec).padStart(2,"0")}.${String(millisec).padStart(3,"0")}`;
    }

    function rollDie() {
        return Math.ceil(Math.random()*6);
    }

    function generateArray(count){
        return new Array(count).fill(0).map(()=>({value:rollDie(),isheld:false,id:nanoid()}));
    }


    function roll()
    {
        if(!gamewon)
        {
            setRolls(prev=>prev+1);
            newdice(oldice=>oldice.map(die=>die.isheld?die:{...die,value:rollDie()}));
        }
        else
        {
            newdice(generateArray(diceCount));
            setTime(0);
            setTimerRunning(false);
            setRolls(0);    
            setScore(0);
            startTimeRef.current=null;
        }
    }

    function hold(id){
        if(gamewon)
        {
            return;
        }
        if(!timerRunning)
        {
            startTimeRef.current=performance.now();
            setTimerRunning(true);
        }
        newdice(olddice=>olddice.map(die=>
                die.id===id?{...die,isheld:!die.isheld}:die
        ))  
    }

    function calcScore(){
        const multi={
            easy:1,
            normal:1.5,
            hard:2
        }[difficulty];
        const timepenalty=Math.floor(time/1000)*20;
        const rollpenalty=rolls*100;
        const final=(10000*multi)-timepenalty-rollpenalty;
        return Math.max(0,Math.floor(final));
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
            <p className="instruction">
                {gamewon
                    ? "Congratulations! You won! Press New Game to start another game."
                    : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
                }
            </p>
            <fieldset className="difficulty">
                <legend className="name-diff">Difficulty</legend>
                <label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="easy"
                        checked={difficulty==="easy"}
                        onChange={(e)=>setDifficulty(e.target.value)}
                    />
                    Easy
                </label>
                <label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="normal"
                        checked={difficulty==="normal"}
                        onChange={(e)=>setDifficulty(e.target.value)}
                    />
                    Normal
                </label>
                <label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="hard"
                        checked={difficulty==="hard"}
                        onChange={(e)=>setDifficulty(e.target.value)}
                    />
                    Hard
                </label>
            </fieldset>
            <p className="timer">
                Time: {formattime(time)}
            </p>
            {gamewon && (
                <p className="score">
                    Score: {score}
                </p>
            )}
            {gamewon && <Confetti mode="fall" particleCount={150} colors={['#ff577f', '#ff884b']}/>}
            <div aria-live="polite" className="sronly">
                {gamewon && <p>CONGRATULATION YOu WON!!! Press New Game to start another game.</p>}
            </div>

            <div className={`dice-cont ${difficulty}`}>
                {arr}
            </div>
            <button className="roll-dice" onClick={roll} ref={buttonref}>{gamewon?"New Game":"Roll"}</button>
        </main>
    )
}