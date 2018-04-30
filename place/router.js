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
	//console.log("req", req.params.search);

	let searchTerm = "";
	
	console.log("query: ", JSON.stringify(req.query));
	let myquery = req.query;
	//console.log(typeof myquery);
	//console.log("myquery: ", myquery,  myquery['searchFor']);

	searchTerm = myquery.searchFor;

	console.log("term: ", searchTerm, myquery.searchFor	);

	//let mySearch = new RegExp ('searchTerm', 'i');

	Place
		.find().or([{
			'country': new RegExp('.*'+searchTerm+'.*', "i")
		},
		{
			'city': new RegExp('.*'+searchTerm+'.*', "i")
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