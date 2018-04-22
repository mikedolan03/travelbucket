'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Place} = require('./models');
const searchable = require('mongoose-searchable');

const router = express.Router();

const jsonParser = bodyParser.json();

/*
//retrieve places
router.get('/', (req, res) => {
console.log("req", req);

Place
	.find()
    .then(placelist => res.json(
        placelist
       
    ))
    .catch(err => {
        console.error(err)
        res.status(500).json({message: 'Something went wrong in places'})}
    );

 	console.log('getting places');

});
*/

router.get('/', (req, res) => {
//console.log("req", req);
let searchTerm = 'New York';
Place
	.find().or([{
		'country': searchTerm
	},
	{
		'city': searchTerm
	}])
	.then(placelist => res.json (
		placelist
		))
	.catch(err => {
        console.error(err)
       res.status(500).json({message: 'Something went wrong in places'})}
   );

 	console.log('getting places');

});

module.exports = {router};