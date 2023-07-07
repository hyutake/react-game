import { useContext } from "react";
import { ScoreContext } from "../store/score-context";

const TestContext = (props) => {
    const scoreCtx = useContext(ScoreContext);

    const renderPlayerScore = (playerScore) => {
        const sizes = ['s', 'm', 'l'];
        const timers = [15, 30, 45, 60]

        const scores = [];

        sizes.forEach(size => {
            timers.forEach(timer => {
                scores.push(<li key={`${size}_${timer}`}>
                    <span>{size}_{timer}: {playerScore[`${size}_${timer}`]}</span>
                </li>)
            })
        })

        return (
            <div>
                <p>Alias: {playerScore.alias}</p>
                <p>Id: {playerScore.id}</p>
                <ul>
                    {scores}
                </ul>
            </div>
        );
    }

    function setScoreHandler() {
        scoreCtx.setPlayerScore({
            gameState: 's_15',
            score: '25'
        })
    }

    function resetScoreHandler() {
        scoreCtx.replacePlayerScore();
    }

    return (
        <div className={props.className}>
			<h2 className="text-2xl font-bold">ScoreContext test</h2>
            <div>
                <p className="text-lg font-bold underline">ScoreRecord</p>
                <ul>
                    {scoreCtx.scoreRecords.map(record => <li key={record.id}>{props.isLoggedIn ? record.alias : 'HIDDEN'}</li>)}
                </ul>
            </div>
            <div>
                <p className="text-lg font-bold underline">PlayerScore</p>
                {renderPlayerScore(scoreCtx.playerScore)}
            </div>
            <button onClick={setScoreHandler}>Set Player Score</button>
            <button onClick={resetScoreHandler}>Reset Player Score</button>
		</div>
    )
}

export default TestContext;