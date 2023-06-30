import { Fragment } from "react";
import TargetWindow from "../components/aimlab/TargetWindow";
import { useRouteLoaderData } from "react-router-dom";

function HomePage() {
    const authData = useRouteLoaderData('root');
    if(authData === 'EXPIRED') {
        console.log("Token expired!");
    }

    const alias = authData ? authData.alias : 'UNKNOWN';
    const token = authData ? authData.token : 'INVALID';

    const header = <p>Status: {authData ? authData === 'EXPIRED' ? 'Token expired!':`Logged in as ${alias}` : 'Not logged in!'}</p>
    /*  Score keeping data structure: Array of Player objects
        [
            {
                alias: String
                s_15: Number    (default: -1)
                s_30: Number
                s_45: Number
                s_60: Number
                m_15: Number
                m_30: Number
                m_45: Number
                m_60: Number
                l_15: Number
                l_30: Number
                l_45: Number
                l_60: Number
            }
        ]
    */
    return (
        <Fragment>
            <h1>HomePage (testing)</h1>
            {header}
            <p>Todos:</p>
            <ul>
                <li>Backend score keeping integration:</li>
                <ol style={{textAlign:'left'}}>
                    <li>Scores are to be stored separate from login data (backend side)</li>
                    <li>Each player (differentiated by the account used for login) will have their highscores saved for each timing and window size</li>
                    <li>Therefore, each player can have up to (4 timers) * (3 window sizes) = 12 highscores</li>
                    <li>Scores are to be fetched initially and 'stored' in local Redux store - more optimal imo</li>
                    <li>Backend updates are only performed if a new highscore is achieved</li>
                </ol>
                <br />
                <li>
                    Re-sizable playing window (works, but doesn't scale with device window size well)
                </li>
                <li>Customisable targets</li>
                <li>Customisable xhair - 3 presets for now</li>
                <li>Sound cue for click + sound cue for hit</li>
                <li>Use tailwind css?</li>
            </ul>
            <TargetWindow player={alias} token={token}/>
        </Fragment>
    )
}

export default HomePage;