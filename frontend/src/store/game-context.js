import React from "react";

const GameContext = React.createContext({
	players: [
		{
			alias: "",
			score: {
				short: 0,
				default: 0,
				medium_long: 0,
				long: 0,
			},
		},
	],
	setPlayers: () => {},
    setPlayerScore: () => {},
    resetPlayerScore: () => {}
});

export default GameContext;
