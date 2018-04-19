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
	.findOne()
    .then(BucketList => res.json({
        BucketList
    }))
    .catch(err => {
        console.error(err)
        res.status(500).json({message: 'Something went wrong'})}
    );

//let username = req.user.username;
/*
return BucketList.find({username})
	.count()
	.then(count => {
		if(count <= 0) {
			return Promise.reject({
				code: 422,
				reason: 'Validation Error',
				message: 'Username not found',
				location: 'finding bucketlist'
			});
		}

	})
	//.then(bucketlist => res.json(bucketlist.serialize()))
	.catch(err => res.status(400).json({message: 'Internal server error in get'}));
*/
 
	console.log('getting bucketlist');

});

//add new location to bucket list
router.post('/', (req, res) => {

});

//update user bucket list item (make visited true)

router.put('/', (req, res) => {

});

module.exports = {router};