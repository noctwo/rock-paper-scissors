import { useState } from "react"
import "./Game.css"

const Game = () => {

    const handlePlayerMoveRock = () =>{
        playGame("Rock")
    }

    const handlePlayerMovePaper = () =>{
        playGame("Paper")
    }

    const handlePlayerMoveScissors = () =>{
        playGame("Scissors")
    }

    const [result, setResult] = useState<string|undefined>();

    const handleScoreReset = () => {
        score = {
            wins: 0,
            ties: 0,
            losses: 0,
            games: 0
            };
            localStorage.setItem('score', JSON.stringify(score)); 
            window.location.reload();
    }

    interface IScore {
        wins: number | null,
        ties: number | null,
        losses: number | null,
        games: number| null
    }

    let score:IScore = JSON.parse(localStorage.getItem('score')!);


    function pickComputerMove() {
    const randomNumber = Math.random(); 
    let computerMove ='';
    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'Paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }
    return computerMove;
    }

    function playGame(playerMove:string){
    const computerMove = pickComputerMove();
    score.games! += 1;
    if (computerMove === playerMove) {
        setResult('Tie');
        score.ties! += 1;
    } else if ((computerMove === 'Rock' && playerMove === 'Paper') ||
                (computerMove === 'Paper' && playerMove === 'Scissors') ||
                (computerMove === 'Scissors' && playerMove === 'Rock')) {
        setResult('You win');
        score.wins! += 1;
    } else {
        setResult('You lose');
        score.losses! += 1;
    }
    localStorage.setItem('score', JSON.stringify(score)); 
    }

    return ( 
        <section className="game">
            <div className="rps-play-icons-wrapper">
                <div onClick={handlePlayerMoveRock} className="rps-play-icon rock">
                    <img src="img/rock.png" ></img>
                </div>
                <div onClick={handlePlayerMovePaper} className="rps-play-icon paper">
                    <img src="img/paper.png"></img>
                </div>
                <div onClick={handlePlayerMoveScissors} className="rps-play-icon scissors">
                    <img src="img/scissors.png"></img>
                </div>
            </div>
            <div className="result-output-area">
                <h2>{result}</h2>
                <div className="score-output-area">
                <h3>Score</h3>
                <p>Wins: <span>{score.wins}</span></p>
                <p>Ties: <span>{score.ties}</span></p>
                <p>Losses: <span>{score.losses}</span></p>
                <p>Games played: <span>{score.games}</span></p>
                <button onClick={handleScoreReset} className="reset-score-btn">Reset Score</button>
            </div>
            </div>
            
            
        </section>
    );
}

export default Game;