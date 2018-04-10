'use strict'
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router(); 

//creates an authorization token that includes the user's name

const createAuthToken = function(user) {
 return jwt.sign( {user}, config.JWT_SECRET, {
 	subject: user.username,
 	expiresIn: config.JWT_EXPIRY,
 	algorithm: 'HS256'
 });
};

//this is where the user logs in with username and password
const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());

router.post('/login', localAuth, (req, res) => {
 const authToken = createAuthToken(req.user.serialize());
 res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

//refresh is when the user gets a new auth before the old one expires
//i guess we check for this at some point?

router.post('/refresh', jwtAuth, (req, res) => {
 const authToken = createAuthToken(req.user);
 res.json({authToken});
});

module.exports = {router}; 