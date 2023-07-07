import React, { useCallback, useState, useEffect, useContext } from 'react';
import useHttp from '../hooks/use-http';
import { useAuthContext } from './auth-context';

export const ScoreContext = React.createContext({
    scoreRecords: [],
    playerScore: {},
    replaceScoreRecords: () => {},
    setPlayerScore: () => {},
    replacePlayerScore: () => {},
})

const initialPlayerScore = {
    alias: 'UNKNOWN',
    id: '-1',
    s_15: 0,
    s_30: 0,
    s_45: 0,
    s_60: 0,
    m_15: 0,
    m_30: 0,
    m_45: 0,
    m_60: 0,
    l_15: 0,
    l_30: 0,
    l_45: 0,
    l_60: 0,
};

export const useScoreContext = () => useContext(ScoreContext);

const ScoreProvider = (props) => {
    const [scoreRecords, setScoreRecords] = useState([]);
    const [playerScore, setPlayerScore] = useState(initialPlayerScore);

    const {user} = useAuthContext();

    const replaceScoreHandler = useCallback((newRecords) => {
        console.log('Overwriting scoreRecords!');
        setScoreRecords(newRecords);
    }, []);

    const setPlayerScoreHandler = useCallback((gameState, score) => {
        console.log('Updating playerScore!');
        // fn expects to receive gameState and score
        setPlayerScore(prevScore => {
            return {...prevScore, [gameState]: score}
        });
    }, [])

    // optional scoreRecord Object as input arg (will just 'reset' by default)
    const replacePlayerScoreHandler = useCallback((scoreRecord = initialPlayerScore) => {
        console.log('Overwriting playerScore!');
        setPlayerScore(scoreRecord);
    }, []);

    // fetch request to initialise scoreRecords and playerScore (if user exists)
    const {sendRequest} = useHttp();
    useEffect(() => {
        sendRequest({
            url: 'http://localhost:4000/game',
            method: 'GET',
        }, (data) => {
            replaceScoreHandler(data.records);  // update scoreRecords
            if(user) {  // if logged in, retrieve existing playerScore
                const existingPlayerScore = data.records.find((record) => record.id === user.id)
                replacePlayerScoreHandler(existingPlayerScore);
            } else replacePlayerScoreHandler();     // if not logged in just reset playerScore
        })
    }, [sendRequest, replaceScoreHandler, replacePlayerScoreHandler, user])

    const scoreContext = {
        scoreRecords: scoreRecords,
        playerScore: playerScore,
        replaceScoreRecords: replaceScoreHandler,
        setPlayerScore: setPlayerScoreHandler,
        replacePlayerScore: replacePlayerScoreHandler,
    }

    return <ScoreContext.Provider value={scoreContext}>
        {props.children}
    </ScoreContext.Provider>
}

export default ScoreProvider;