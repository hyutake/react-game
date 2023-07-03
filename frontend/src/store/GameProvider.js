import { useReducer } from "react";
import GameContext from "./game-context";

const defaultGameState = {
	scores: [],
};

const gameStateReducer = (state, action) => {
	if (action.type === "ADD") {
		return {
			scores: [],
		};
	}
	if (action.type === "UPDATE") {
		return {
			scores: [],
		};
	}
	if (action.type === "REPLACE") {
		return action.data;
	}
	return defaultGameState;
};

const GameProvider = (props) => {
	const [gameState, dispatchState] = useReducer(
		gameStateReducer,
		defaultGameState
	);

	function addScore() {
		console.log("addScore()");
		dispatchState({ type: "ADD" });
	}

	function setScore() {
		console.log("setScore()");
		dispatchState({ type: "UPDATE" });
	}

	function replaceScores(scores) {
		console.log("replaceScores()");
		dispatchState({ type: "REPLACE", data: scores });
	}

	const gameContext = {
		scores: gameState,
		addPlayerScore: addScore,
		setExistingPlayerScore: setScore,
		replaceScores: replaceScores,
	};

	return (
		<GameContext.Provider value={gameContext}>
			{props.children}
		</GameContext.Provider>
	);
};

export default GameProvider;
