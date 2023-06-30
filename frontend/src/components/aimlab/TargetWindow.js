import { useState, useEffect, useReducer, useCallback } from "react";

// import classes from "./TargetWindow.module.css";
import Target from "./Target";
import TargetNavigation from "./TargetNavigation";
import useTimer from "../../hooks/use-timer";
import useHttp from "../../hooks/use-http";

// cursors
import xhair1 from '../../assets/image/xhair1.png';
import xhair2 from '../../assets/image/xhair2.png';
import xhair3 from '../../assets/image/xhair3.png';
// hitsound
import osu_hit from '../../assets/audio/osu-hit.wav';

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
	const {timer, timerSec, startTimer, resetTimer} = useTimer(30);

	const [isActive, setIsActive] = useState(false); // to track whether the game is being played currently or not
	const [showStats, setShowStats] = useState(false); // to 'modify' the content when game is inactive AFTER playing through >= 1 time(s)

	// to track choice of xhair -> Object: { id: number, style: string }
	const [crosshair, setCrosshair] = useState({id: 1, style: `url(${xhair1}) 16 16, auto`});

	const { error, sendRequest } = useHttp();

	// to trigger the repositioning of the target
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

	function playHitSound() {
        const hitSound = new Audio(osu_hit);
        hitSound.volume = 0.5;
        hitSound.playbackRate = 1.25;
        hitSound.play().catch(err => {
            console.error(err);
        })
    }

	function clickTargetHandler() {
		dispatchStats({ type: "SCORE" });	// update score
		playHitSound();
	}

	function resetHandler() {
		dispatchStats({ type: "RESET" });	// reset current score
		resetTimer();	// reset timer
		setIsActive(false);		// show start page
		setShowStats(false);	// do NOT show stats (no point anw)
	}

	// From game -> stats
	const stopGameHandler = useCallback(() => {	// this is called ONLY when a game concludes (i.e., timer expires)
		console.log("Stopping game...");
		setIsActive(false);
		setShowStats(true);

		if(props.token === 'INVALID') {	// not logged in - NO ACTUAL SAVING SCORE MECHANIC
			console.log('Token is invalid');
			// BUT, can still reference local scores and "saves score" as props.player = 'UNKNOWN'
			// Will still 'save' on client side - probably via redux

		} else {	// logged in
			console.log('Token exists');
			// check 'local' stats (score + timing) if there is an existing record
	
			// if existing, check if there is even a need to update the highscore (i.e., new pb score) + update backend if so (patch)
	
			// if user has no scores in current mode, update backend (post)
			sendRequest({
				url: 'http://localhost:4000/game',
				method: 'POST',
				data: {
					score: statsState.score,
					state: `${windowSize}_${timerSec}`,
					player: props.player
				},
				headers: {
					'Content-Type':'application/json',
					'Authorization':`Bearer ${props.token}`
				}
			}, () => {console.log('applyData()')});
		}
	}, [props.player, props.token, sendRequest, statsState.score, timerSec, windowSize])

	// To trigger the stop game function once when timer ends
	useEffect(() => {
		if(timer === 0) {
			console.log('Timer = 0!');
			stopGameHandler();
		}
	}, [timer, stopGameHandler])

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
			case '1':
				setCrosshair({
					id: 1,
					style: `url(${xhair1}) 16 16, auto`
				})
				break;
			case '2':
				setCrosshair({
					id: 2,
					style: `url(${xhair2}), auto`
				})
				break;
			case '3':
				setCrosshair({
					id: 3,
					style: `url(${xhair3}) 12 12, auto`
				})
				break;
			default:
				console.log('Invalid id!');
		}
	}

	// Shows the pixel dimensions of the game
	const windowDimensions = 
		<div className='absolute right-2 bottom-0'>
			<p>{windowWidth} x {windowHeight}</p>
		</div>
	;

	// Either the 'game' is shown, or the start/end screen
	const targetDisplay = isActive ? (
		<Target onClick={clickTargetHandler} position={targetPos} />
	) : showStats ? (
		<div className='w-full h-full flex flex-col justify-center items-center'>
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
			<button type="button" onClick={returnToStartGame} className="border-none py-1 px-4">
				-- Click here to dismiss --
			</button>
		</div>
	) : (
		<div className="w-full h-full flex items-center justify-center" onClick={startGameHandler}>
			<h1 className="text-2xl font-bold">
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
				className={`flex relative items-center justify-center ${
					isActive ? 'bg-zinc-500' : 'bg-zinc-700'
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
