export default function LeaderBoard({leaderboard}){
    const diff=["easy","normal","hard"];
    return (
        <section className="leaderboard">
            <h2>🏆 Leaderboard</h2>
            {diff.map(difficulty=>{
                const data=leaderboard[difficulty];
                return (
                    <div className="leaderboard-diff" key={difficulty}>
                        <h3>{difficulty.charAt(0).toUpperCase()+difficulty.slice(1)}</h3>
                        <div className="leaderboard-cols">
                            <div className="leaderboard-col">
                                <h4>Least Rolls</h4>
                                {data.leastRolls.length===0?(<p>No Scores Yet</p>):(
                                    data.leastRolls.map((entry,index)=>(
                                        <div className="leaderboard-entry" key={index}>
                                            <span>{index===0?"🥇":index===1?"🥈":"🥉"}</span>
                                            <span>{entry.rolls} rolls</span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="leaderboard-col">
                                <h4>Highest Scores</h4>
                                {data.highestScore.length===0?(<p>No Scores Yet</p>):(
                                    data.highestScore.map((entry,index)=>(
                                        <div className="leaderboard-entry" key={index}>
                                            <span>{index===0?"🥇":index===1?"🥈":"🥉"}</span>
                                            <span>{entry.score}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}