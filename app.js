var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
//
const gameRouter = require('./routes/gameRouter');
const eventRouter = require('./routes/eventRouter');
const userRouter = require('./routes/userRouter');

// init
var app = express();
app.use(cors());

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routing
app.use('/api/game', gameRouter);
app.use('/api/event', eventRouter);
app.use('/api/user', userRouter);

module.exports = app;
