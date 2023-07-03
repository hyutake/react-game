import classes from "./TargetNavigation.module.css";
import Timer from "./Timer";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// to display a row of possible configurations (widgets)
function TargetNavigation({
	score,
	onReset,
	timer, setTimer,
	gameState,
	setGameState,
	crosshairId,setCrosshair,
	targetColorId, setTargetColor
}) {
	const windowSize = gameState.split('_')[0];
	const gameTime = parseInt(gameState.split('_')[1]);

	function resetHandler() {
		onReset();
	}

	function increaseTimeHandler() {
		if (gameTime < 60) {
			onReset();	// if the game is running, stop it
			const newTime = gameTime + 15;
			setGameState(`${windowSize}_${newTime}`);
			setTimer(newTime);
		} else {
			console.log("Timer should not exceed 60 seconds!");
		}
	}

	function decreaseTimeHandler() {
		if (gameTime > 15) {
			onReset();	// if the game is running, stop it
			const newTime = gameTime - 15;
			setGameState(`${windowSize}_${newTime}`);
			setTimer(newTime);
		} else {
			console.log("Timer should not be lower than 15 seconds!");
		}
	}

	function changeWindowSizeHandler(event) {
		const newWindowSize = event.target.value;
		setGameState(`${newWindowSize}_${gameTime}`);
		onReset();
	}

	function toggleCrosshairHandler(event) {
		setCrosshair(event.target.value);
	}

	function toggleColorHandler(event) {
		setTargetColor(event.target.value);
	}

	return (
		<nav className="bg-gray-700 border-b-2 border-white">
			<ul className="flex p-4 gap-4 justify-between items-center list-none">
				<li>
					<button
						className='flex items-center justify-center border border-solid rounded-md p-2 border-white'
						type="button"
						onClick={resetHandler}
					>
						<RefreshIcon />
					</button>
				</li>
				<li>
					<label className="text-m font-bold">Preset crosshairs</label>
					<div className='flex flex-row justify-center gap-2 mb-1'>
						<button className={`border border-solid border-amber-200 ${crosshairId === 1 ? 'bg-amber-200 text-zinc-700' : ''}`} onClick={toggleCrosshairHandler} value='1'>1</button>
						<button className={`border border-solid border-amber-200 ${crosshairId === 2 ? 'bg-amber-200 text-zinc-700' : ''}`} onClick={toggleCrosshairHandler} value='2'>2</button>
						<button className={`border border-solid border-amber-200 ${crosshairId === 3 ? 'bg-amber-200 text-zinc-700' : ''}`} onClick={toggleCrosshairHandler} value='3'>3</button>
					</div>
					<label className="text-m font-bold">Target color</label>
					<div className={classes['btn-row']}>
						<button className={`border border-solid border-amber-200 ${targetColorId === 'r' ? 'bg-amber-200 text-zinc-700' : ''}`} onClick={toggleColorHandler} value='r'>R</button>
						<button className={`border border-solid border-amber-200 ${targetColorId === 'g' ? 'bg-amber-200 text-zinc-700' : ''}`} onClick={toggleColorHandler} value='g'>G</button>
						<button className={`border border-solid border-amber-200 ${targetColorId === 'b' ? 'bg-amber-200 text-zinc-700' : ''}`} onClick={toggleColorHandler} value='b'>B</button>
						<button className={`border border-solid border-amber-200 ${targetColorId === 'y' ? 'bg-amber-200 text-zinc-700' : ''}`} onClick={toggleColorHandler} value='y'>Y</button>
					</div>
				</li>
				<li>
					<div className='flex flex-col items-center justify-center'>
						<button type="button" onClick={increaseTimeHandler} className="flex items-center justify-center">
							<KeyboardArrowUp />
						</button>
						<Timer time={timer} />
						<button type="button" onClick={decreaseTimeHandler} className="flex items-center justify-center">
							<KeyboardArrowDown />
						</button>
					</div>
				</li>
				<li>
					<label className="text-m font-bold">Window size</label>
					<form className='flex flex-col gap-1'>
						<label className='flex flex-row items-center gap-2'>
							<input
								type="radio"
								value="s"
								checked={windowSize === "s"}
								onChange={changeWindowSizeHandler}
								className="scale-150 mb-1"
							/>
							S
						</label>
						<label className='flex flex-row items-center gap-2'>
							<input
								type="radio"
								value="m"
								checked={windowSize === "m"}
								onChange={changeWindowSizeHandler}
								className="scale-150 mb-1"
							/>
							M
						</label>
						<label className='flex flex-row items-center gap-2'>
							<input
								type="radio"
								value="l"
								checked={windowSize === "l"}
								onChange={changeWindowSizeHandler}
								className="scale-150 mb-1"
							/>
							L
						</label>
					</form>
				</li>
				<li>
					<div className="p-3 border border-solid rounded-lg border-white">
						<h1 className="text-xl italic">Score</h1>
						<p className="text-3xl font-bold">{score}</p>
					</div>
				</li>
			</ul>
		</nav>
	);
}

export default TargetNavigation;
