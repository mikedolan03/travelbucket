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



//add new location to bucket list
router.put('/', (req, res) => {


console.log(req);


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
BucketList.update(
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


});

//update user bucket list item (make visited true)

router.put('/', (req, res) => {

});

module.exports = {router};