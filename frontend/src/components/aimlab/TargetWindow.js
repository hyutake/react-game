import { useState, useRef, useEffect, useReducer } from "react";

import classes from "./TargetWindow.module.css";
import Target from "./Target";
import TargetNavigation from "./TargetNavigation";
import useTimer from "../../hooks/use-timer";
import useHttp from "../../hooks/use-http";

// cursors
import xhair1 from '../../assets/xhair1.png';
import xhair2 from '../../assets/xhair2.png';

function statsReducer(state, action) {
	if (action.type === "SCORE") {
		return {
			score: state.score + 1,
			totalClicks: state.totalClicks,
		};
	}
	if (action.type === "CLICK") {
		return {
			score: state.score,
			totalClicks: state.totalClicks + 1,
		};
	}
	return { score: 0, totalClicks: 0 };
}

function TargetWindow(props) {
	const [statsState, dispatchStats] = useReducer(statsReducer, {
		score: 0,
		totalClicks: 0,
	});

	// to store the x y positions of the target
	const [targetPos, setTargetPos] = useState({});

	// to handle window sizing (string mapped to some x by y value) - 16:9 aspect ratio
	// so in theory I only need to track just 1 value and then perform some calculations to get the other
	/*
		s: 640 x 360
		m: 960 x 540
		l: 1280 x 720
	*/
	const [windowSize, setWindowSize] = useState('s');
	let windowWidth, windowHeight;
	switch(windowSize) {
		case 'm':
			windowWidth = 960;
			break;
		case 'l':
			windowWidth = 1280;
			break;
		default:	// s
			windowWidth = 800;
	}
	windowHeight = getWindowHeight(windowWidth, [16, 9]);


	function getWindowHeight(width, aspectRatio) {
		// aspect ratio will be an array of 2 numbers, the ratio between width & height
		return Math.floor(width / aspectRatio[0]) * aspectRatio[1];
	}

	// to handle all the timer functionality
	const {timer, timerSec, startTimer, resetTimer} = useTimer(30, stopGameHandler);

	const targetWindowRef = useRef();	// idk if needed lel

	const [isActive, setIsActive] = useState(false); // to track whether the game is being played currently or not
	const [showStats, setShowStats] = useState(false); // to 'modify' the content when game is inactive AFTER playing through >= 1 time(s)

	// to track choice of xhair -> Object: { id: number, style: string }
	const [crosshair, setCrosshair] = useState({id: 1, style: `url(${xhair1}) 16 16, auto`});

	const { error, sendRequest } = useHttp();

	// recall that useEffect() triggers AFTER all the components have been loaded in
	useEffect(() => {
		// const containerWidth = targetWindowRef.current.offsetWidth;
		// const containerHeight = targetWindowRef.current.offsetHeight;
		const maxLeft = windowWidth - 50;
		const maxTop = windowHeight - 50;
		setTargetPos({
			x: Math.random() * maxLeft,
			y: Math.random() * maxTop,
		});
	}, [statsState.score, windowWidth, windowHeight]);

	function clickWindowHandler() {
		if (isActive) {
			dispatchStats({ type: "CLICK" });
		}
	}

	function clickTargetHandler() {
		dispatchStats({ type: "SCORE" });	// update score
	}

	function resetHandler() {
		dispatchStats({ type: "RESET" });	// reset current score
		resetTimer();	// reset timer
		setIsActive(false);		// show start page
		setShowStats(false);	// do NOT show stats (no point anw)
	}

	// From game -> stats
	function stopGameHandler() {	// this is called ONLY when a game concludes (i.e., timer expires)
		console.log("Stopping game...");
		setIsActive(false);
		setShowStats(true);
		// check 'local' stats (score + timing) if there is an existing record

		// if existing, check if there is even a need to update the highscore (i.e., new pb score) + update backend if so (patch)

		// if not existing, update backend (post)
		sendRequest({
			url: 'http://localhost:4000/game',
			data: {
				score: 0,
				timer: 30,
				player: props.player
			},
			headers: {
				'Content-Type':'application/json',
				'Authorisation':`Bearer ${props.token}`
			}
		})
	}

	// From start -> game
	function startGameHandler() {
		console.log("Starting game...");
		resetHandler(); // reset the score
		setIsActive(true); // set {targetDisplay} to show the game
		startTimer();
	}

	// From stats -> start
	function returnToStartGame() {
		setShowStats(false);
		resetTimer();
	}

	// id will be the same 'id' stored in the crosshair state
	function updateCrosshair(id) {
		if(id === crosshair.id) {	// xhair already in use
			console.log('Crosshair already set!');
			return;
		}
		switch(id) {
			case 1:
				setCrosshair({
					id: 1,
					style: `url(${xhair1}) 16 16, auto`
				})
				break;
			case 2:
				setCrosshair({
					id: 2,
					style: `url(${xhair2})}, auto`
				})
				break;
			default:
				console.log('Invalid id!');
		}
	}

	// Shows the pixel dimensions of the game
	const windowDimensions = targetWindowRef.current && (
		<div className={classes["target-dimensions"]}>
			{/* <p>{targetWindowRef.current.offsetWidth} x {targetWindowRef.current.offsetHeight}</p> */}
			<p>{windowWidth} x {windowHeight}</p>
		</div>
	);

	// Either the 'game' is shown, or the start/end screen
	const targetDisplay = isActive ? (
		<Target onClick={clickTargetHandler} position={targetPos} />
	) : showStats ? (
		<div className={classes.stats}>
			<h3>Game state: {windowSize}_{timerSec}</h3>
			<ul>
				<li>Score: {statsState.score}</li>
				<li>Total clicks: {statsState.totalClicks}</li>
				<li>
					Accuracy:{" "}
					{(statsState.score / statsState.totalClicks).toFixed(2)}
				</li>
				<li>Hits per sec: {(statsState.score / timerSec).toFixed(2)}</li>
			</ul>
			<button type="button" onClick={returnToStartGame}>
				-- Click here to dismiss --
			</button>
		</div>
	) : (
		<div className={classes.start} onClick={startGameHandler}>
			<h1>
				-- Click anywhere in the window to start --
			</h1>
		</div>
	);
	return (
		<div className='m-8' style={{width: `${windowWidth}px`}}>
			<TargetNavigation
				score={statsState.score}
				onReset={resetHandler}
				timer={timer}
				setTimer={resetTimer}
				windowSize={windowSize}
				setWindow={setWindowSize}
				crosshairId={crosshair.id}
				setCrosshair={updateCrosshair}
			/>
			<div
				ref={targetWindowRef}
				className={`flex relative items-center justify-center bg-gray-600 ${
					isActive ? classes.active : classes.inactive
				}`}
				style={{height: `${windowHeight}px`, cursor: crosshair.style}}
				onClick={clickWindowHandler}
			>
				{targetDisplay}
				{windowDimensions}
			</div>
			{error && <p>{error.message}</p>}
		</div>
	);
}

export default TargetWindow;
