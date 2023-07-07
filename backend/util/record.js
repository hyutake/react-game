const isNumber = (value) => {
    return typeof value === 'number';
}

const isValidScore = (score, error) => {
    console.log('Checking score type...');
    if(!isNumber(score)) {
        error.score = `Invalid score of ${score}`;
    }
}

const isValidGameState = (state, error) => {
    console.log('Checking gamestate...');
    const validWindowSizes = ['s', 'm', 'l'];
    const validTimers = [15, 30, 45, 60];
    const [windowSize, timer] = state.split('_');
    if(isNaN(timer)) {  // if not-a-number
        error.timer = `Invalid timer of ${timer}`;
    } else if(!validTimers.includes(parseInt(timer))) {
        error.timer = `Invalid timer value of ${timer}`;
    }
    if(!validWindowSizes.includes(windowSize)) {
        error.window = `Invalid window size '${windowSize}'`;
    }
}

const isValidPlayerID = (id, errors) => {
    console.log('Checking player id...');
    if(id === '-1') {
        errors.playerId = 'Invalid or expired player id';
    };
}

exports.isValidRecord = (record) => {
    const errors = {};
    isValidScore(record.score, errors);
    isValidGameState(record.state, errors);
    isValidPlayerID(record.playerId, errors);
    return errors;
}