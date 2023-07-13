const { hash } = require("bcryptjs");
const { v4: generateId } = require("uuid");

const { readData, writeData } = require("../util/data");
// /util/auth.js is for login, /util/validation.js is for signup
const {
	checkUsername,
	isValidPassword,
	createJSONToken,
} = require("../util/auth");
const { isValidUser } = require("../util/validation");

exports.postLogin = async (req, res, next) => {
	// req.body contains { username: String, password: String }
	const username = req.body.username;
	const password = req.body.password;

	// check for valid username
	let user;
	try {
		user = await checkUsername(username);
	} catch (err) {
		console.log("[ADMIN]: Invalid username detected");
		return res.status(422).json({ 
			message: "Invalid credentials.",
			errors: { credentials: "Invalid username or password entered." }
		});
	}

	// check for valid password
	const pwIsValid = await isValidPassword(password, user.password);
	if (!pwIsValid) {
		console.log("[ADMIN]: Invalid password detected");
		return res.status(422).json({
			message: "Invalid credentials.",
			errors: { credentials: "Invalid username or password entered." },
		});
	}

	// login attempt is valid - return a token
	console.log(`[ADMIN]: user '${username}' has logged in successfully`);
	const token = createJSONToken(username);

	// get time of expiry
	const expiration = new Date();	// current time
	expiration.setHours(expiration.getHours() + 1);		// time in 1 hour
	const tokenExpiry = Math.floor(expiration.getTime() / 1000);	// time in seconds from epoch

	res.json({ token, tokenExpiry, id: user.id });
};

exports.postSignup = async (req, res, next) => {
	// req.body contains { username: String, password: String }
	console.log(req.body);
	const username = req.body.username;
	const password = req.body.password;
	const alias = req.body.alias;

	// get all the current users
	const storedData = await readData("users.json");
	// initialise the users array if there were none (i.e., no users yet)
	if (!storedData.users) {
		storedData.users = [];
	}

	// data validation
	const errors = isValidUser({ username, password, alias }, storedData.users);
	if (Object.keys(errors).length > 0) {
		return res.status(422).json({
			message: "User signup failed due to validation errors.",
			errors,
		});
	}

	// create a unique id for the new user
	const userId = generateId();
	// 'hide' the password
	const hashedPw = await hash(password, 12);

	storedData.users.push({
		username: username,
		password: hashedPw,
		alias: alias,
		id: userId,
	}); 

	// initialise the game scores of new accounts
	if(!storedData.game) {
		storedData.game = [];
	}

	storedData.game.push({
		alias: alias,
		id: userId,
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
	})

	await writeData("users.json", storedData);
	res.status(201).json({ message: "Successfully signed up!" });
};
