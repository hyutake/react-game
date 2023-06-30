const isNumber = (value) => {
    return typeof value === 'number';
}

const isValidScore = (score, error) => {
    console.log('Checking score...');
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

const isValidPlayer = (alias, existingUsers, errors) => {
	console.log('Checking alias...');
    if (existingUsers.length >= 1) {
		// if there is at least 1 existing user
		// check if the alias is already in-use
		const user = existingUsers.find(
			(user) => user.alias === alias
		);
		if (user) {
            // console.log(user);
            console.log('Found matching alias!');
        } else {
            errors.alias = `Player ${alias} cannot be found!`;
        }
	} else {
        console.log('No existing users - invalid player!');
    }
}

exports.isValidRecord = (record, existingUsers) => {
    const errors = {};
    isValidScore(record.score, errors);
    isValidGameState(record.state, errors);
    isValidPlayer(record.player, existingUsers, errors);
    return errors;
}