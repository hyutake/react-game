import { useContext } from "react";
import Timer from "../components/aimlab/Timer";
import useTimer from "../hooks/use-timer";
import GameContext from "../store/game-context";

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

    return (
        <div>
            <Timer time={timer}/>
            <button onClick={startTimerHandler}>Start timer</button>
            <button onClick={stopTimerHandler}>Stop timer</button>
            <button onClick={resetTimerHandler}>Reset timer</button>
            <div>
                <h2>Context</h2>
                <p>{`gameCtx.isActive: ${isActive}`}</p>
                <p>{`gameCtx.showStats: ${showStats}`}</p>
                <button onClick={startGameHandler}>Start game</button>
                <button onClick={stopGameHandler}>Stop game</button>
                <button onClick={resetGameHandler}>Reset</button>
            </div>
        </div>
    );
}

export default TestPage;