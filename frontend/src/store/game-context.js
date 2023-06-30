import React from "react";

const GameContext = React.createContext({
	scores: [],
	addPlayerScore: () => {},
	setExistingPlayerScore: () => {},
	fetchScores: () => {}
});

export default GameContext;
