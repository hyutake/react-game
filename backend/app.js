const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  });

// import some route and use it here (for authentication)
app.use('/auth', authRoutes);

console.log("Listening on port 4000!");
app.listen(4000);