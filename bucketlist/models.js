'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BucketListSchema = mongoose.Schema({
	 user: {
	 	type: Schema.ObjectId,
	 	ref: 'User',
	  },
	 places: [ {
	 	country: {
	 	type: String,
	 	required: true,
	  	},
	 	city: {
	  	type: String,
	  	},
	 	visited: {
	  	type: String,
	  	default: 'false',
	 	},
	 	locId: {
	 	 type: Schema.ObjectId,	
	 	},
	 	departDate: {
	  	type: Date,
	  	},
	  	returnDate: {
	  	type: Date,
	  	},
	  	planNotes: {
	  		type: String,
	  	}
	 }]
});


const BucketList = mongoose.model('bucketlist', BucketListSchema);
module.exports = {BucketList};

