const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

const { readData } = require("../util/data");
const { NotAuthError, NotFoundError } = require("./errors");

const KEY = "supersecret";

exports.createJSONToken = (username) => {
	return sign({ username }, KEY, { expiresIn: "1h" });
};
const validateJSONToken = (token) => {
	return verify(token, KEY);
};

exports.isValidPassword = (password, storedPassword) => {
	return compare(password, storedPassword);
};

exports.checkUsername = async (username) => {
	// check if there are even any existing user accounts
	const storedData = await readData('users.json');
	if (!storedData.users || storedData.users.length === 0) {
		throw new NotFoundError("Could not find any users.");
	}
	// check if the user HAS an account among the existing ones by matching username
	const user = storedData.users.find((ev) => ev.username === username);
	if (!user) {
		throw new NotFoundError(
			"Could not find user with username " + username
		);
	}
	return user;
};

exports.checkAuthMiddleware = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}
	if (!req.headers.authorization) {
		console.log("NOT AUTH. AUTH HEADER MISSING.");
		return next(new NotAuthError("Not authenticated."));
	}
	const authFragments = req.headers.authorization.split(" ");

	if (authFragments.length !== 2) {
		console.log("NOT AUTH. AUTH HEADER INVALID.");
		return next(new NotAuthError("Not authenticated."));
	}
	const authToken = authFragments[1];
	try {
		const validatedToken = validateJSONToken(authToken);
		req.token = validatedToken;
	} catch (error) {
		console.log("NOT AUTH. TOKEN INVALID.");
		return next(new NotAuthError("Not authenticated."));
	}
	next();
};
