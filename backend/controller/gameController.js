const {readData, writeData} = require('../util/data');

const {isValidRecord} = require('../util/record');

exports.getScores = async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
    let message = "Unauthorized getScores called!";

    // get all the current users
	const storedData = await readData("users.json");
	if (token === "INVALID") {
		console.log("Unauthorized GET");
		// Return scores w/o names
        const hiddenScores = storedData.game.map((record) => {
            return {...record, alias: "HIDDEN"};
        })
        res.status(201).json({message, scores: hiddenScores});
	} else {
		console.log("Authorized GET");
        message = "Authorized getScores called!"
		// Return scores w/ their actual names
        res.status(201).json({message, scores: storedData.game});
	}
};

exports.postScore = async (req, res, next) => {
	// req.body contains { score: Int, timer: Int, windowSize: Char, player: String }
	console.log(req.body);

	const score = req.body.score;
	const state = req.body.state
    const player = req.body.player;
    const playerId = req.body.id;

	// get all the current users
	const storedData = await readData("users.json");
	// initialise the users array if there were none (i.e., no users yet)
	if (!storedData.game) {
		storedData.game = [];
	}

	// data validation
	const errors = isValidRecord({ score, state, player, playerId }, storedData.users);
	if (Object.keys(errors).length > 0) {
		return res.status(422).json({
			message: "postScore() failed due to validation errors.",
			errors,
		});
	}

    // update scores
    const playerExists = storedData.game.find((record) => {
        return record.alias === player && record.id === playerId;
    })

    if(playerExists) {
        // if user has existing scores
        const updatedData = storedData.game.map((record) => {
            if(record.alias === player) {
                // only update if new score is HIGHER than old one
                if(record[state] < score) return {...record, [state]: score};
                else console.log('Not highscore!')
            }
        })

        storedData.game = updatedData;
    } else {
        // user does not have any existing scores
        storedData.game.push({
            alias: player,
            id: playerId,
            s_15: 0,
            s_30: 0,
            s_45: 0,
            s_60: 0,
            m_15: 0,
            m_30: 0,
            m_60: 0,
            l_15: 0,
            l_30: 0,
            l_45: 0,
            l_60: 0,
            [state]: score  // will overwrite the 'default' value of 0 for the particular gamemode
        });
    }

	await writeData("users.json", storedData);
	res.status(201).json({ message: "postScore() success!" });
};

exports.patchScore = (req, res, next) => {
	console.log("patchScores()");
	console.log(req.body);
	res.status(201).json({ message: "patchScore called!" });
};
