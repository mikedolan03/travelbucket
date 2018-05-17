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


router.put('/', (req, res) => {


    if(!req.body.locId) {
        res.status(400).json({message: 'Missing location id'});
            } else if(!req.body.userId) {
                res.status(400).json({message: 'Missing userid'});
                } else if(!req.body.content) {
                                    res.status(400).json({message: 'Missing content'});
                                } else if(!req.body.rating) {
                                         res.status(400).json({message: 'Missing rating'});
                                        }
    
    

    let newReview = {
    	 userId: req.body.userId,
		 username: req.body.userName,
		 content: req.body.content,
		 starRating: req.body.rating	
    }


   // console.log("adding on server side ", newPlaceToAdd);

    //console.log("locating list: ", BucketList.findOne({user: req.user.id}) );

    //mongoose - look for update only if.. 
    Place
        .update(
    	{_id: req.body.locId},
    	{$push: {reviews: newReview} },
    	function(err, updatedPlace) {
    		if(err) {
                console.log("error ", err);
            }
    		res.send(updatedPlace);
    	}
    );
  
});

module.exports = {router};