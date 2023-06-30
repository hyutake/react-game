import { useState, useEffect } from "react";

/*
    Idea: This useTimer hook will basically handle the timer logic (the contant decrementing of the timer value)
*/
// initialTime: time in seconds
const useTimer = (initialTime) => {
	// keeps track of the LATEST initial timer value used (in seconds)
	const [timerSec, setTimerSec] = useState(initialTime);
	// keeps track of the timer value (i.e. the countdown) in ms
	const [timer, setTimer] = useState(initialTime * 1000);
	// determines whether the timer counts down or not
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let intervalId;

		if (isRunning) {
			intervalId = setInterval(() => {
				setTimer((prevTimer) => {
					if (prevTimer === 10) {
						clearInterval(intervalId);
						stopTimer();
					}
					return prevTimer - 10;
				});
			}, 10);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [isRunning]);

	const startTimer = () => {
		setIsRunning(true);
	};

	const stopTimer = () => {
		setIsRunning(false);
	};

	// resetTimer allows for an optional input param to set the timer value
	const resetTimer = (newInitialTime = timerSec) => {
		setIsRunning(false);
		setTimerSec(newInitialTime);
		setTimer(newInitialTime * 1000);
	};

	return {
		timer,
        timerSec,
        isRunning,
		startTimer,
		stopTimer,
		resetTimer,
	};
};

export default useTimer;
