import { useEffect } from "react";
import Timer from "../components/aimlab/Timer";
import useTimer from "../hooks/use-timer";
import useHttp from "../hooks/use-http";

import audio from "../assets/audio/osu-hit.wav";
import TestContext from "../components/TestContext";
import { useAuthContext } from "../store/auth-context";

const TestPage = () => {
	const authCtx = useAuthContext();
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

	const { error, sendRequest } = useHttp();

	const isLoggedIn = authCtx.user !== null;
	const authIndicator = (
		<div className="flex flex-row justify-center items-center">
			<p className="my-4 mx-4 flex flex-col">
				{authCtx.user && <span>authCtx.user.id: {authCtx.user.id}</span>}
			</p>
		</div>
	);

	function requestGameData() {
		sendRequest(
			{
				url: "http://localhost:4000/game",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authCtx.user.token}`,
				},
			},
			(data) => {
				console.log(data);
			}
		);
	}

	/* AuthContext */
	// signup
	function testSignup() {
		authCtx
			.signup({ username: "tester", password: "test123", alias: "TEST" })
			.catch((err) => console.error(err));
	}

	// login
	function testLogin() {
		authCtx
			.login({ username: "tester", password: "test123" })
			.catch((err) => {
				console.error(err);
			});
	}

	// logout
	function testLogout() {
		authCtx.logout();
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
		<div className="max-w-5xl">
			{authIndicator}
			<div className="mb-3 p-2 border rounded border-cyan-50">
				<h2 className="text-2xl font-bold">Timer test</h2>
				<Timer time={timer} />
				<button onClick={startTimerHandler}>Start timer</button>
				<button onClick={stopTimerHandler}>Stop timer</button>
				<button onClick={resetTimerHandler}>Reset timer</button>
			</div>
			<div className="mb-3 p-2 border rounded border-cyan-100">
				<h2 className="text-2xl font-bold">Backend test</h2>
				<button onClick={requestGameData}>Request game data</button>
				{error && <p>{error.message}</p>}
			</div>
			<div className="mb-3 p-2 border rounded border-cyan-200">
				<h2 className="text-2xl font-bold">Hitsound test</h2>
				<button onClick={playHitSound}>Hit sound</button>
			</div>
			<TestContext
				className="mb-3 p-2 border rounded border-cyan-300"
				isLoggedIn={isLoggedIn}
			/>
			<div className="mb-3 p-2 border rounded border-cyan-400">
				<h2 className="text-2xl font-bold">AuthContext test</h2>
				{authCtx.error && (
					<div>
						<p>{authCtx.error.message}</p>
						<ul>
							{Object.values(authCtx.error.errors).map((err) => {
								return (
									<li className="italic text-sm" key={err}>
										{err}
									</li>
								);
							})}
						</ul>
					</div>
				)}
				<button onClick={testSignup}>Sign up as tester</button>
				<button onClick={testLogin}>Login as tester</button>
				<button onClick={testLogout}>Logout</button>
			</div>
		</div>
	);
};

export default TestPage;
