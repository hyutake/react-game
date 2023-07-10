import { Fragment, useState } from "react";

import TargetWindow from "../components/aimlab/TargetWindow";
import ScoreList from "../components/aimlab/ScoreList";
import { useAuthContext } from "../store/auth-context";
import { useScoreContext } from "../store/score-context";

function HomePage() {
    // to store game state (window size + timer)
    const [gameState, setGameState] = useState('s_15');

    function updateGameStateHandler(newState) {
        setGameState(newState);
    }

    const {user} = useAuthContext();
    const {playerScore} = useScoreContext();
	const authIndicator = 
		<p className="mb-4 flex flex-col">
			<span>Alias: {playerScore.alias}</span>
			{user !== null && <span>Id: {user.id}</span>}
		</p>
	;
 
    return (
        <Fragment>
            <h1 className="text-2xl font-bold mt-4">HomePage</h1>
            {authIndicator}
            <TargetWindow state={gameState} updateState={updateGameStateHandler}/>
            <ScoreList state={gameState} />
        </Fragment>
    )
}

export default HomePage;

