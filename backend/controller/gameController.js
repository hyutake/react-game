exports.getScores = (req, res, next) => {
    console.log('getScores()');
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'INVALID') {
        console.log('Unauthorized GET');
        // Return scores w/o names (names replaced with UNKNOWN or smth)
    }
    else {
        console.log('Authorizad GET');
        // Return scores w/ names
    }
    res.status(201).json({message: 'getScores called!'});
}

exports.postScore = (req, res, next) => {
    console.log('postScores()');
    console.log(req.body);
    res.status(201).json({message: 'postScore called!'});
}

exports.patchScore = (req, res, next) => {
    console.log('patchScores()');
    console.log(req.body);
    res.status(201).json({message: 'patchScore called!'});
} 