'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser'); 

const { router: usersRouter } = require('./users');
const { router: placeRouter} = require('./place');
const { router: authRouter, localStrategy, jwtStrategy} = require('./auth');
const { router: bucketlistRouter} = require('./bucketlist');


const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const app = express();

const {BucketList} = require('./bucketlist/models');

app.use(morgan('common'));

//example had cors stuff here...
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
}); 

passport.use(localStrategy);
passport.use(jwtStrategy);

/* A debug middleware to see the req before body parser runs
app.use(function(req, res, next) {
  console.log("=============================req printed",req);
  console.log("========================================");

next();
} );
*/

app.use(jsonParser);
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

app.use(express.static('public'));

const jwtAuth = passport.authenticate('jwt', { session: false});

app.get('/api/protected', jwtAuth, (req, res) => {
 return res.json({
  data: 'super secret data'
 }); 
});

app.get('/api/try', (req, res) => {

BucketList
      .findOne({user: "5ad8fb125823545414675fde"})
        .populate('user', 'firstName lastName username')
        .populate({
           path: 'places.place',
            model: 'place'
        })
        //.populate('Place', 'country')
        .then(list => res.json(
            list
            //BucketList
        ))
        .catch(err => {
            console.error(err)
            res.status(500).json({message: 'Something went wrong'})}
        );

});

app.use('/api/bucketlist', jwtAuth, bucketlistRouter);

app.use('/api/place', jwtAuth, placeRouter);

app.use('*', (req, res) => {
 return res.status(404).json({message: 'Not found *'});
  }); 

let server;

function runServer(databaseURL, port = PORT) {
 return new Promise((resolve, reject) => { 
  mongoose.connect(databaseURL, err => {
   if (err) {
   	return reject(err);
   }
   server = app
    .listen(PORT, () => { 
     console.log(`Your app is listening on port ${PORT}`); databaseURL
     console.log(`Your app is connected to db= ${databaseURL}`);
     resolve();
    })
    .on('error', err => {
    	mongoose.disconnect();
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
	runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer};