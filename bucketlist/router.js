'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {BucketList} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

//retrieve bucketlist of user
router.get('/', (req, res) => {
//console.log("req", req);

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

router.put('/checkoff', (req, res) => {

if(!req.body.placeIndex) {
      res.status(400).json({message: 'Missing place to check off'});
}
console.log("req body", req.body);

const placeIndex = req.body.placeIndex;

BucketList.findOne({user: req.user.id }, function (err, list) {
    
    if(err) console.log("error finding list of user ", err);

    console.log("list", list.places);

    if(list.places[placeIndex].visited == 'false') {
        list.places[placeIndex].visited = 'true';
    } else {
        list.places[placeIndex].visited = 'false';
    }
    
    list.save(function(err, list) {
        if(err) console.log("error saving place data to list", err);
    res.send(list);
    });
});

});

//add new location to bucket list
router.put('/', (req, res) => {


//console.log(req);


if(!req.body.country) {
    res.status(400).json({message: 'Missing country'});
}
//do locid too

//let {country, city, LocId} = req.body;

console.log("/n/n/n req", req.user.id	);

const country = req.body.country;
const locId = req.body.locId;

let newPlaceToAdd = {
	country: country,		
	visited: 'false',
	locId: locId	
}

if(req.body.city) newPlaceToAdd.city = req.body.city;

console.log("adding on server side ", newPlaceToAdd);

console.log("locating list: ", BucketList.findOne({user: req.user.id}) );

//mongoose - look for update only if.. 
BucketList
    .update(
	{user: req.user.id},
	{$push: {places: newPlaceToAdd} },
	function(err, bucketlist) {
		if(err) console.log("error ", err);
		res.send(bucketlist);
	}
);

/*example 
PersonModel.update(
    { _id: person._id }, 
    { $push: { friends: friend } },
    done
);
*/
// 5adaae551f7d510cd0272644"
//db.bucketlists.update({ "_id" : ObjectId("5adaae551f7d510cd0272644") }, {$pull : { "places" : { "country" : "Spain" } } } )

});

//update user bucket list item (make visited true)

router.put('/', (req, res) => {

});

module.exports = {router};