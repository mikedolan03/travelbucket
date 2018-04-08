'use strict'
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const { router: usersRouter } = require('./users');
const { router: authRouter, localStategy, jwtStrategy} = require('./auth');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const app = express();

app use(morgan('common'));

//example had cors stuff here... 

passport.use(localStategy);
passport.use(jwtStategy);

app.use('/users/', userRouter);
app.use('/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false});

app.get('/protected', jwtAuth, (req, res) => {
 return res.json({
  data: 'rosebud'
 }); 
});

app.use('*', (req, res) => {
 return res.status(404).json({message: 'Not found'});
  });

let server;

function runServer() {

}

function closeServer(){

}

if(require.main === module) {
	runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer};