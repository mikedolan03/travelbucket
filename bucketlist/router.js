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

    if(!req.body.placeIndex && req.body.placeIndex != 0 ) {
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

router.put('/planTrip', (req, res) => {

    BucketList  
        .findById(req.body.bucketId, function (err, bucket) {
            if (err) return res.status(400).json({message: 'Could not find bucketlist in db'});

            bucket.places[req.body.placeIndex].departDate = req.body.departDate;
            bucket.places[req.body.placeIndex].returnDate = req.body.returnDate;
            bucket.places[req.body.placeIndex].planNotes = req.body.planNotes;

            bucket.save(function (err, bucket) {
                if (err) return res.status(400).json({message: 'Could not save bucketlist in db'});
                res.send(bucket);
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
    const departDate = req.body.departDate;
    const returnDate = req.body.returnDate;
    const planNotes = req.body.planNotes;

    let newPlaceToAdd = {
    	country: country,		
    	visited: 'false',
    	locId: locId,
        departDate: departDate,
        returnDate: returnDate,
        planNotes: planNotes	
    }

    if(req.body.city) { 
        newPlaceToAdd.city = req.body.city;
    }


   // if(true === false) {
    //    BucketList.
    //} 
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

//find the place on the list by index number, delete it and save bucketlist
router.delete('/', (req, res) => {

    if(req.body.placeIndex == null) {
            console.log("------------------error in req", req.body.placeIndex);
            res.status(400).json({message: 'Missing place to remove'});
        }

        console.log("req body", req.body);

        const placeIndex = req.body.placeIndex;

        BucketList.findOne({user: req.user.id }, function (err, list) {
            
            if(err) {
                console.log("error finding list of user ", err);
            }

            //console.log("list", list.places);

            if(list.places[placeIndex]){
            
                list.places.splice(placeIndex, 1);
            }
            
            list.save(function(err, list) {
                if(err) {
                 console.log("error saving place data to list", err);
                }
                res.status(204).end();
            });
        });



 } );
module.exports = {router};