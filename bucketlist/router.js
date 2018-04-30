'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {BucketList} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

//--------------- Get user bucket list
router.get('/', (req, res) => {

    BucketList
    	.findOne({user: req.user.id}).populate('user', 'firstName lastName username')
        .then(list => res.json(
            list
            //BucketList
        ))
        .catch(err => {
            console.error(err)
            res.status(500).json({message: 'Something went wrong'})}
        );

     	console.log('getting bucketlist');

});


//--------------- Check off place - update Place on list as visited
router.put('/checkoff', (req, res) => {

    if(!req.body.placeIndex) {
        console.log("------------------error in req", req.body.placeIndex);
        res.status(400).json({message: 'Missing place to check off'});
    }

    //console.log("req body", req.body);

    const placeIndex = req.body.placeIndex;

    BucketList.findOne({user: req.user.id }, function (err, list) {
        
        if(err) {
            console.log("error finding list of user ", err);
        }

        //console.log("list", list.places);

        if(list.places[placeIndex].visited == 'false') {
            list.places[placeIndex].visited = 'true';
        } else {
            list.places[placeIndex].visited = 'false';
        }
        
        list.save(function(err, list) {
            if(err) {
             console.log("error saving place data to list", err);
            }
            res.status(204).end();
        });
    });

});

//----------------add new location to bucket list
router.put('/', (req, res) => {

    if(!req.body.country) {
        res.status(400).json({message: 'Missing country'});
    }

    if(!req.body.locId) {
        res.status(400).json({message: 'Missing location id'});
    }

    const country = req.body.country;
    const locId = req.body.locId;

    let newPlaceToAdd = {
    	country: country,		
    	visited: 'false',
    	locId: locId	
    }

    if(req.body.city) { 
        newPlaceToAdd.city = req.body.city;
    }

   // console.log("adding on server side ", newPlaceToAdd);

    //console.log("locating list: ", BucketList.findOne({user: req.user.id}) );

    //mongoose - look for update only if.. 
    BucketList
        .update(
    	{user: req.user.id},
    	{$push: {places: newPlaceToAdd} },
    	function(err, bucketlist) {
    		if(err) {
                console.log("error ", err);
            }
    		res.send(bucketlist);
    	}
    );
  
});

module.exports = {router};