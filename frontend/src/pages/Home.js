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
            <div className="text-left">
                <h2 className="text-xl font-bold">Todos:</h2>
                <ul className="list-decimal">
                    <li>Backend score keeping integration - mostly working? No bugs found so far</li>
                    <li>Customisable targets - 4 colors for now, maybe do game types later</li>
                    <ul>
                        <li>3 different target spawning algo created (full random, less random, alt. center and random)</li>
                        <li>Need to manually comment out their respective useEffect() hooks to use any one of them</li>
                    </ul>
                    <li>Customisable xhair - 3 presets for now</li>
                    <li>Use tailwind css - trying</li>
                </ul>
            </div>
            <TargetWindow state={gameState} updateState={updateGameStateHandler}/>
            <ScoreList state={gameState} />
        </Fragment>
    )
}

export default HomePage;

