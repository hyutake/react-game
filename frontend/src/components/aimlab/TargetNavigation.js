import classes from "./TargetNavigation.module.css";
import Timer from "./Timer";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// to display a row of possible configurations (widgets)
function TargetNavigation({
	score,
	onReset,
	timer,
	setTimer,
	windowSize,
	setWindow,
	crosshairId,
	setCrosshair,
}) {
	function resetHandler() {
		onReset();
	}

	function increaseTimeHandler() {
		if (timer < 60000) {
			setTimer(timer / 1000 + 15);
		} else {
			console.log("Timer should not exceed 60 seconds!");
		}
	}

	function decreaseTimeHandler() {
		if (timer > 15000) {
			setTimer(timer / 1000 - 15);
		} else {
			console.log("Timer should not be lower than 15 seconds!");
		}
	}

	function changeWindowSizeHandler(event) {
		setWindow(event.target.value);
		onReset();
	}

	function toggleCrosshairHandler(event) {
		console.log(event);
		setCrosshair(event.target.value);
	}

	return (
		<nav className={classes.nav}>
			<ul>
				<li>
					<button
						className={classes["nav-reset-btn"]}
						type="button"
						onClick={resetHandler}
					>
						<RefreshIcon />
					</button>
				</li>
				<li>
					<h4>Crosshairs</h4>
					<div className={classes['btn-row']}>
						<button className={crosshairId === 1 ? classes['btn-active'] : null} onClick={toggleCrosshairHandler} value={1}>1</button>
						<button className={crosshairId === 2 ? classes['btn-active'] : null} onClick={toggleCrosshairHandler} value={2}>2</button>
						<button className={crosshairId === 3 ? classes['btn-active'] : null} onClick={toggleCrosshairHandler} value={3}>3</button>
					</div>
					<h4>Targets</h4>
					<div className={classes['btn-row']}>
						<button>1</button>
						<button>2</button>
						<button>3</button>
					</div>
				</li>
				<li>
					<div className={classes["timer-nav"]}>
						<button type="button" onClick={increaseTimeHandler}>
							<KeyboardArrowUp />
						</button>
						<Timer time={timer} />
						<button type="button" onClick={decreaseTimeHandler}>
							<KeyboardArrowDown />
						</button>
					</div>
				</li>
				<li>
					<h4>Window size</h4>
					<form className={classes["window-nav"]}>
						<label className={classes["window-nav-label"]}>
							<input
								type="radio"
								value="s"
								checked={windowSize === "s"}
								onChange={changeWindowSizeHandler}
							/>
							S
						</label>
						<label className={classes["window-nav-label"]}>
							<input
								type="radio"
								value="m"
								checked={windowSize === "m"}
								onChange={changeWindowSizeHandler}
							/>
							M
						</label>
						<label className={classes["window-nav-label"]}>
							<input
								type="radio"
								value="l"
								checked={windowSize === "l"}
								onChange={changeWindowSizeHandler}
							/>
							L
						</label>
					</form>
				</li>
				<li>
					<h1>Score: {score}</h1>
				</li>
			</ul>
		</nav>
	);
}

export default TargetNavigation;
