const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');
const app = express();

//connection to database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to the database '+config.database);
})
//on database error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+config.database);
})

//port number
const port = 3000;

//cors middleware
app.use(cors());

//body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//set static folder
app.use(express.static(path.join(__dirname, 'client')));

//index route
app.get('/',(req, res) => {
  res.send('Invalid Endpoint')
});

//rerouting on the nonspecified routes
app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});


app.listen(port, () => {
  console.log("server on port "+port);
});
