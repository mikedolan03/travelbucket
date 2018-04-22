'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {BucketList} = require('./models');


const router = express.Router();

const jsonParser = bodyParser.json();

//retrieve bucketlist of user
router.get('/', (req, res) => {
console.log("req", req);

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
router.post('/', (req, res) => {

});

//update user bucket list item (make visited true)

router.put('/', (req, res) => {

});

module.exports = {router};