// import classes from "./Timer.module.css";

const Timer = (props) => {
	const formatTime = (time) => {
		const seconds = Math.floor(time / 1000)
			.toString()
			.padStart(2, "0");
		const milliseconds = ((time % 1000) / 10).toString().padStart(2, "0");
		return `${seconds}:${milliseconds}`;
	};

	return <h1 className="m-2 p-0 text-amber-200">{formatTime(props.time)}</h1>;
};

export default Timer;
