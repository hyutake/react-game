const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  });

// authentication - login & signup
app.use('/auth', authRoutes);

// game-related - score-keeping
app.use('/game', gameRoutes);

console.log("Listening on port 4000!");
app.listen(4000);