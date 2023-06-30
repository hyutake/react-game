import { useContext } from "react";
import { useRouteLoaderData } from "react-router-dom";
import Timer from "../components/aimlab/Timer";
import useTimer from "../hooks/use-timer";
import GameContext from "../store/game-context";
import useHttp from "../hooks/use-http";

const TestPage = () => {
    const timerExpireHandler = () => {
        console.log('Timer expired!');
    }

    const { timer, startTimer, stopTimer, resetTimer } = useTimer(5, timerExpireHandler);

    function startTimerHandler() {
        startTimer();
    }

    function stopTimerHandler() {
        stopTimer()
    }

    function resetTimerHandler() {
        resetTimer();
    }

    const gameCtx = useContext(GameContext);
    const isActive = gameCtx.isActive;
    const showStats = gameCtx.showStats;

    function startGameHandler() {
        gameCtx.startGame();
    }

    function stopGameHandler() {
        gameCtx.stopGame();
    }

    function resetGameHandler() {
        gameCtx.reset();
    }

    const { error, sendRequest } = useHttp();
    const authData = useRouteLoaderData('root');
    if(!authData) console.log('Not logged in - can\'t test backend!');
    else if(authData === 'EXPIRED') {
        console.log("Token expired!");
    }

    const alias = authData ? authData.alias : 'UNKNOWN';
    const token = authData ? authData.token : 'INVALID';

    function postGameData() { 
        sendRequest({
            url: 'http://localhost:4000/game',
            method: 'GET',
            data: {
                score: 69,
                gameState: 'm_15',
                player: alias
            },
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }, () => {console.log('applyData()!')})
    }

    return (
        <div>
            <div>
                <h2>Timer test</h2>
                <Timer time={timer}/>
                <button onClick={startTimerHandler}>Start timer</button>
                <button onClick={stopTimerHandler}>Stop timer</button>
                <button onClick={resetTimerHandler}>Reset timer</button>
            </div>
            <div>
                <h2>Context test</h2>
                <p>{`gameCtx.isActive: ${isActive}`}</p>
                <p>{`gameCtx.showStats: ${showStats}`}</p>
                <button onClick={startGameHandler}>Start game</button>
                <button onClick={stopGameHandler}>Stop game</button>
                <button onClick={resetGameHandler}>Reset</button>
            </div>
            <div>
                <h2>Backend test</h2>
                <button onClick={postGameData}>Send game data</button>
                {error && <p>{error.message}</p>}
            </div>
        </div>
    );
}

export default TestPage;