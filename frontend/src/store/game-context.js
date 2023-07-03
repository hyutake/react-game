import React from "react";

const GameContext = React.createContext({
	scores: [],
	addPlayerScore: () => {},
	setExistingPlayerScore: () => {},
	replaceScores: () => {}
});

export default GameContext;
