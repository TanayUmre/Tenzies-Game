const storagek="tenziesleaderboard";
const defboard={
    easy:{
        leastRolls:[],
        highestScore:[]
    },
    normal:{
        leastRolls:[],
        highestScore:[]
    },
    hard:{
        leastRolls:[],
        highestScore:[]
    }
}

export function getleaderboard(){
    const stored=localStorage.getItem(storagek);
    if(!stored){
        return defboard;
    }
    try{
        return JSON.parse(stored);
    }catch{
        return defboard;
    }
}

export function addscore(diff,rolls,score){
    const leaderboard=getleaderboard();
    const entry={
        rolls,
        score
    };

    const leastRolls=[
        ...leaderboard[diff].leastRolls,
        entry
    ].sort((a,b)=>a.rolls-b.rolls).slice(0,3);

    const highestScore=[
        ...leaderboard[diff].highestScore,
        entry
    ].sort((a,b)=>b.score-a.score).slice(0,3);

    const updateleaderboard={
        ...leaderboard,
        [diff]:{
            leastRolls,
            highestScore
        }
    };

    localStorage.setItem(
        storagek,
        JSON.stringify(updateleaderboard)
    );

    return updateleaderboard;
}