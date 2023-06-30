/* Validation of new signups */
const isValidText = (text, minLength = 1) => {
    return text && text.trim().length >= minLength
}


const isValidAlias = (alias, existingUsers, errors) => {
	console.log('Checking alias...');
    if (!isValidText(alias)) {
		errors.alias = "Invalid alias";
	} else if (existingUsers.length >= 1) {
		// if there is at least 1 existing user
		// check if the alias is already in-use
		const user = existingUsers.find(
			(user) => user.alias === alias
		);
        
		if (user) {
			console.log(user);
			console.log('Found existing alias!');
			errors.alias = "Alias is already in use";
		} else {
			console.log('Valid alias!');
		}
	}
}

const isValidUsername = (username, existingUsers, errors) => {
	console.log('Checking username...');
    if (!isValidText(username)) {
		errors.username = "Invalid username";
	} else if (existingUsers.length >= 1) {
		// if there is at least 1 existing user
		// check if the username is already in-use
		const user = existingUsers.find(
			(user) => user.username === username
		);
		if (user) {
			console.log(user);
			console.log('Found existing username!');
			errors.username = "Username already exists";
		} else {
			console.log('Valid username!');
		}
	}
}

const isValidPassword = (password, errors) => {
	console.log('Checking password...');
    if (!isValidText(password)) {
		// no strict password checking for now
		errors.password = "Invalid password";
	}
}

exports.isValidUser = (user, existingUsers) => {
    const errors = {};
	isValidAlias(user.alias, errors);
    isValidUsername(user.username, existingUsers, errors);
    isValidPassword(user.password, errors);
    return errors;
}

/* Validation of game data (TBC) */