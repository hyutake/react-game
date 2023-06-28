import { useReducer } from "react";
import GameContext from "./game-context";

const defaultGameState = {
    score: {
        short: 0,
        default: 0,
        medium_long: 0,
        long: 0
    },
}

const gameReducer = (state, action) => {
    if(action.type === 'START') {
        return {
            isActive: true,
            showStats: false
        }
    }
    if(action.type === 'STOP') {
        return {
            isActive: false,
            showStats: true
        }
    }
    if(action.type === 'RESET') {
        return defaultGameState;
    }
    return defaultGameState;
}

const GameProvider = (props) => {
    const [gameState, dispatchState] = useReducer(gameReducer, defaultGameState)

    function startGameHandler() {
        dispatchState({ type: 'START', })
    }

    function stopGameHandler() {
        dispatchState({ type: 'STOP', })
    }

    function resetHandler() {
        dispatchState({ type: 'RESET' })
    }

    const gameContext = {
        isActive: gameState.isActive,
        showStats: gameState.showStats,
        startGame: startGameHandler,
        stopGame: stopGameHandler,
        reset: resetHandler
    }

    return (
        <GameContext.Provider value={gameContext}>
            {props.children}
        </GameContext.Provider>
    );
}

export default GameProvider;