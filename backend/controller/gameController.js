const {readData, writeData} = require('../util/data');

const {isValidRecord} = require('../util/record');

exports.getScores = async (req, res, next) => {
	// const authToken = req.headers.authorization;
	// console.log(authToken);
    // get all the current users
	const storedData = await readData("users.json");
	res.status(201).json({message: "getScores called!", records: storedData.game});
};

exports.postScore = async (req, res, next) => {
	// req.body contains { score: number, state: string, id: string }
	console.log(req.body);

	const score = req.body.score;
	const state = req.body.state
    const playerId = req.body.playerId;

	// get all the current users
	const storedData = await readData("users.json");
	// initialise the users array if there were none (i.e., no users yet) -- technically impossible since post method is only triggered for a signed in user
	if (!storedData.game) {
		storedData.game = [];
	}

	// data validation 
	const errors = isValidRecord({ score, state, playerId });
	if (Object.keys(errors).length > 0) {
		return res.status(422).json({
			message: "postScore() failed due to validation errors.",
			errors,
		});
	}

    // update scores
	// frontend side should already have checked once - this is insurance
    const updatedData = storedData.game.map((record) => {
        if(record.id === playerId) {
            if(record[state] < score) return {...record, [state]: score};
            else {
                console.log('Not highscore!');
                return record;
            }
        }
		return record;
    })

    storedData.game = updatedData;

	await writeData("users.json", storedData);
	res.status(201).json({ message: "postScore() success!" });
};