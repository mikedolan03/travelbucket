'use strict';
const express = require('express');
const bodyParser = require('body-parser');



const {BucketList} = require('./models');


const router = express.Router();

const jsonParser = bodyParser.json();

//retrieve bucketlist of user
router.get('/userlist', (req, res) => {
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
router.get('/addplace', (req, res) => {

//let {country, city, LocId} = req.body;

console.log("/n/n/n req", req.user.id	);

let newPlaceToAdd = {
	country: req.query.country,		
	visited: 'false',
	locId: req.query.locId	
}

if(req.query.city != 'undefined') newPlaceToAdd.city = req.query.city;

console.log("adding on server side ", newPlaceToAdd);

console.log("locating list: ", BucketList.findOne({user: req.user.id}) );

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