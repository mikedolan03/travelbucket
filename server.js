'use strict'
//require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const { router: userRouter } = require('./users');
//const { router: authRouter, localStategy, jwtStrategy} = require('./auth');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const app = express();

app.use(morgan('common'));

//example had cors stuff here... 

//passport.use(localStategy);
//passport.use(jwtStategy);

app.use('/users/', userRouter);
//app.use('/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false});

/*app.get('/protected', jwtAuth, (req, res) => {
 return res.json({
  data: 'rosebud'
 }); 
});
*/

app.use('*', (req, res) => {
 return res.status(404).json({message: 'Not found'});
  });

let server;

function runServer() {
 return new Promise((resolve, reject) => { 
  mongoose.connect(DATABASE_URL, err => {
   if (err) {
   	return reject(err);
   }
   server = app
    .listen(PORT, () => { 
     console.log(`Your app is listening on port ${PORT}`);
     resolve();
    })
    .on('error', err => {
    	mongoose.disconect();
    	reject(err);
    });
  });	
 });
}

function closeServer(){
 return mongoose.disconnect().then(() => {
  return new Promise((resolve, reject) => {
   console.log('Closing server');
   server.close(err => {
    if (err) {
     return reject(err);
    }
    resolve();
   });
  });
 });
}

if(require.main === module) {
	runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer};