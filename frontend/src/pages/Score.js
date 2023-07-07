import { useScoreContext } from "../store/score-context";

const ScorePage = () => {
    const {playerScore, replacePlayerScore} = useScoreContext();

    const renderPlayerScore = (playerScore) => {
        const sizes = ['s', 'm', 'l'];
        const timers = [15, 30, 45, 60]

        const scores = [];

        sizes.forEach(size => {
            timers.forEach(timer => {
                const gameState = `${size}_${timer}`;
                scores.push(<li key={gameState}>
                    <span>{gameState}: {playerScore[gameState]}</span>
                </li>)
            })
        })

        return (
            <ul className="flex flex-col justify-center items-center">
                {scores}
            </ul>
        );
    }

    const resetScoreHandler = () => {
        replacePlayerScore();
    }

    return (
        <div className="m-4">
            <h2 className="text-3xl font-bold italic">{playerScore.alias}</h2>
            {renderPlayerScore(playerScore)}
            <button onClick={resetScoreHandler}>Reset Scores</button>
        </div>
    );
}

export default ScorePage;