import { Fragment, useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";

import useHttp from "../hooks/use-http";
import TargetWindow from "../components/aimlab/TargetWindow";
import ScoreList from "../components/aimlab/ScoreList";

function HomePage() {
    const authData = useRouteLoaderData('root');
 
    let alias = 'UNKNOWN';
    let token = 'INVALID';
    let id = '-1';
    if(authData) {
        alias = authData.alias;
        token = authData.token;
        id = authData.id;
    }

    // to store game state
    const [gameState, setGameState] = useState('s_15');

    function updateGameStateHandler(newState) {
        // console.log('newState: ' + newState);
        setGameState(newState);
    }

    // to store the game records
    const [records, setRecords] = useState([]);

    const {sendRequest} = useHttp();

    // get scores from backend 
    useEffect(() => {
        sendRequest({
            url: 'http://localhost:4000/game',
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }, (data) => {
            console.log(data.message);
            setRecords(data.scores);
        })
    }, [sendRequest, token])

    const header = <p>Status: {authData ? authData.token === 'EXPIRED' ? 'Token expired!':`Logged in as ${alias}` : 'Not logged in!'}</p>

    return (
        <Fragment>
            <h1 className="text-2xl font-bold mt-4">HomePage</h1>
            {header}
            <p>id: {id}</p>
            <div className="text-left">
                <h2 className="text-xl font-bold">Todos:</h2>
                <ul className="list-decimal">
                    <li>Backend score keeping integration:</li>
                    <ol className="indent-4">
                        <li>Each player (differentiated by the account used for login) will have their highscores saved for each timing and window size</li>
                        <li>Therefore, each player can have up to (4 timers) * (3 window sizes) = 12 highscores</li>
                        <li><b>Scores are to be fetched initially and 'stored' in local Redux store - more optimal imo</b></li>
                        <li>Backend updates are only performed if a new highscore is achieved</li>
                    </ol>
                    <br />
                    <li>Customisable targets - 4 colors for now, maybe do game types later</li>
                    <li>Customisable xhair - 3 presets for now</li>
                    <li>Use tailwind css - trying</li>
                </ul>
            </div>
            <TargetWindow player={alias} playerId={id} token={token} state={gameState} updateState={updateGameStateHandler}/>
            <ScoreList records={records} state={gameState} player={alias} id={id} />
        </Fragment>
    )
}

export default HomePage;

