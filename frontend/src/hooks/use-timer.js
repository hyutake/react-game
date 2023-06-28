import { useState, useEffect } from "react";

/*
    Idea: This useTimer hook will basically handle the timer logic (the contant decrementing of the timer value)
        --> will probably need onTimerExpire() as input to be triggered when timer expires
*/
// initialTime: time in seconds, onTimerExpire(): function to trigger when timer runs to 0
const useTimer = (initialTime, onTimerExpire) => {
	// keeps track of the LATEST initial timer value used (in seconds)
	const [timerSec, setTimerSec] = useState(initialTime);
	// keeps track of the timer value (i.e. the countdown)
	const [timer, setTimer] = useState(initialTime * 1000);
	// determines whether the timer counts down or not
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let intervalId;

		if (isRunning) {
			intervalId = setInterval(() => {
				setTimer((prevTimer) => {
					if (prevTimer === 0) {
						clearInterval(intervalId);
						onTimerExpire();
                        stopTimer();
                        return prevTimer;
					}
					return prevTimer - 10;
				});
			}, 10);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [isRunning, onTimerExpire]);

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
