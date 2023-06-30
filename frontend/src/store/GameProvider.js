import { useReducer } from "react";
import { useRouteLoaderData } from "react-router-dom";
import GameContext from "./game-context";
import useHttp from "../hooks/use-http";

const defaultGameState = {
    scores: [],
}

const gameStateReducer = (state, action) => {
    if(action.type === 'ADD') {
        return {
            scores: []
        };
    }
    if(action.type === 'UPDATE') {
        return {
            scores: []
        };
    }
    if(action.type === 'REPLACE') {
        return action.data;
    }
    return defaultGameState;
}

const GameProvider = (props) => {
    const [gameState, dispatchState] = useReducer(gameStateReducer, defaultGameState);

    const {error, sendRequest} = useHttp();
    const authData = useRouteLoaderData("root");

    if(authData === 'EXPIRED') {
        console.log("Token expired!");
    }

    const token = authData && authData.token ? authData.token : 'INVALID';
    const alias = authData && authData.alias ? authData.alias : 'UNKNOWN';

    function addScore() {
        dispatchState({ type: 'ADD', })
    }

    function setScore() {
        dispatchState({ type: 'UPDATE', })
    }

    function replaceScores() {
        console.log('replaceScores()');
        // send GET request
        sendRequest({
            url: 'http://localhost:4000/game',
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }, (data) => {
            console.log(data.message);
            dispatchState({ type: 'REPLACE', data: data.scores });
        })
    }

    const gameContext = {
        scores: gameState,
        addPlayerScore: addScore,
        setExistingPlayerScore: setScore,
        fetchScores: replaceScores
    }

    return (
        <GameContext.Provider value={gameContext}>
            {props.children}
        </GameContext.Provider>
    );
}

export default GameProvider;