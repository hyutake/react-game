import { useContext, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";
import Timer from "../components/aimlab/Timer";
import useTimer from "../hooks/use-timer";
import GameContext from "../store/game-context";
import useHttp from "../hooks/use-http";

import audio from "../assets/audio/osu-hit.wav";

const TestPage = () => {
	const timerExpireHandler = () => {
		console.log("Timer expired!");
	};

	// const { timer, startTimer, stopTimer, resetTimer } = useTimer(5, timerExpireHandler);
	const { timer, startTimer, stopTimer, resetTimer } = useTimer(5);

	useEffect(() => {
		if (timer === 0) {
			timerExpireHandler();
		}
	}, [timer]);

	function startTimerHandler() {
		startTimer();
	}

	function stopTimerHandler() {
		stopTimer();
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
	const authData = useRouteLoaderData("root");
	const authIndicator = (
		<h1 className="text-3xl font-bold mb-4">
			{authData
				? authData === "EXPIRED"
					? "Token Expired!"
					: `Logged in as ${authData.alias}`
				: "Not logged in!"}
		</h1>
	);
	if (!authData) console.log("Not logged in - can't test backend!");
	else if (authData === "EXPIRED") {
		console.log("Token expired!");
	}

	const alias = authData ? authData.alias : "UNKNOWN";
	const token = authData ? authData.token : "INVALID";

	function requestGameData() {
		sendRequest(
			{
				url: "http://localhost:4000/game",
				method: "GET",
				data: {
					score: 69,
					gameState: "m_15",
					player: alias,
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
			() => {
				console.log("applyData()!");
			}
		);
	}

	// hitsound
	function playHitSound() {
		const hitSound = new Audio(audio);
		hitSound.volume = 0.5;
		hitSound.playbackRate = 1.25;
		hitSound.play().catch((err) => {
			console.error(err);
		});
	}

	return (
		<div>
			{authIndicator}
			<div className="mb-3 p-2 border rounded border-cyan-50">
				<h2 className="text-2xl font-bold">Timer test</h2>
				<Timer time={timer} />
				<button onClick={startTimerHandler}>Start timer</button>
				<button onClick={stopTimerHandler}>Stop timer</button>
				<button onClick={resetTimerHandler}>Reset timer</button>
			</div>
			<div className="mb-3 p-2 border rounded border-cyan-100">
				<h2 className="text-2xl font-bold">Context test</h2>
				<p>{`gameCtx.isActive: ${isActive}`}</p>
				<p>{`gameCtx.showStats: ${showStats}`}</p>
				<button onClick={startGameHandler}>Start game</button>
				<button onClick={stopGameHandler}>Stop game</button>
				<button onClick={resetGameHandler}>Reset</button>
			</div>
			<div className="mb-3 p-2 border rounded border-cyan-200">
				<h2 className="text-2xl font-bold">Backend test</h2>
				<button onClick={requestGameData}>Request game data</button>
				{error && <p>{error.message}</p>}
			</div>
			<div className="mb-3 p-2 border rounded border-cyan-300">
				<h2 className="text-2xl font-bold">Hitsound test</h2>
				<button onClick={playHitSound}>Hit sound</button>
			</div>
		</div>
	);
};

export default TestPage;
