import "../css/app.css"
import Die from "./die"
import {useState,useRef,useEffect} from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti-boom"
import { getleaderboard,addscore } from "../../utils/leaderboard"
import LeaderBoard from "./LeaderBoard"

export default function App() {

    const [dice,newdice]=useState(()=>generateArray(10));

    const [difficulty,setDifficulty]=useState("normal");

    const [time,setTime]=useState(0);

    const [timerRunning,setTimerRunning]=useState(false);

    const [score,setScore]=useState(0);

    const [leaderboard,setleaderboard]=useState(getleaderboard);      

    const [rolls,setRolls]=useState(0);

    const gamewon=(dice.length>0 && dice.every(die=>die.isheld) && dice.every(die=>die.value===dice[0].value));

    const buttonref=useRef(null);

    const hasSavedScored=useRef(false);

    useEffect(()=>{
        if(gamewon){
            buttonref.current?.focus();
        }
    },[gamewon]);

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

    function changeDifficulty(newDifficulty){
        setDifficulty(newDifficulty);
        newdice(generateArray({easy:8,normal:10,hard:12}[newDifficulty]));
        setTime(0);
        setTimerRunning(false);
        setRolls(0);
        setScore(0);
        hasSavedScored.current=false;
    }

    useEffect(()=>{
        if(gamewon && !hasSavedScored.current)
        {
            hasSavedScored.current=true;
            setTimerRunning(false);
            const multi={
                easy:1,
                normal:1.5,
                hard:2
            }[difficulty];
            const timepenalty=Math.floor(time/1000)*20;
            const rollpenalty=rolls*100;
            const finscore=Math.max(0,Math.floor((10000*multi)-timepenalty-rollpenalty));
            setScore(finscore);
            const updated=addscore(
                difficulty,rolls,finscore
            );
            setleaderboard(updated);
        }
    },[gamewon,difficulty,rolls,time]);

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
            newdice(generateArray({easy:8,normal:10,hard:12}[difficulty]));
            setTime(0);
            setTimerRunning(false);
            setRolls(0);    
            setScore(0);
            hasSavedScored.current=false;
        }
    }

    function hold(id){
        if(gamewon)
        {
            return;
        }
        if(!timerRunning)
        {
            setTimerRunning(true);
        }
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
        <div className="Parent">

            <main>
                <h1 className="title">Tenzie</h1>
                <p className="instruction">
                    {gamewon
                        ? "Congratulations! You won! Press New Game to start another game."
                        : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
                    }
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
            <section className="game-info">
                <div className="info-section difficulty-section">
                    <h2>Difficulty</h2>
                    <div className="options">
                        <fieldset className={`difficulty`}>
                            <label>
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value="easy"
                                    checked={difficulty==="easy"}
                                    onChange={(e)=>changeDifficulty(e.target.value)}
                                />
                                Easy
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value="normal"
                                    checked={difficulty==="normal"}
                                    onChange={(e)=>changeDifficulty(e.target.value)}
                                />
                                Normal
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value="hard"
                                    checked={difficulty==="hard"}
                                    onChange={(e)=>changeDifficulty(e.target.value)}
                                />
                                Hard
                            </label>
                        </fieldset>
                    </div>
                </div>

                <div className="info-section timer-section">
                    <h2 className="timerh2">Time</h2>
                    <p className="timer">{formattime(time)}</p>
                </div>

                <div className="info-section scoring-section">
                    <h2>Scoring System</h2>
                    <p>Easy: ×1</p>
                    <p>Normal: ×1.5</p>
                    <p>Hard: ×2</p>
                    <hr />
                    <p>Time penalty: -20 points/sec</p>
                    <p>Roll penalty: -100 points/roll</p>
                </div>
            </section>
            <LeaderBoard leaderboard={leaderboard}/>
        </div>
    )
}