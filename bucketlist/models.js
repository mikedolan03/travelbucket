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
	 	}
	 }]
});


BucketListSchema.methods.serialize = function() {
	return {
		LocId: this._id,
		country: this.country || '',
		city: this.city || '',
		visited: this.visited || ''
	};
};

const PlaceSchema = mongoose.Schema({
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
	 	reviews: [{
	 		userId: {
	 			type: String,
	 			required: true,
	 		}, 
			username: {
				type: String,
			},
			content:{
				type: String,
			},
			starRating: {
				type: String,
			}
	 	}]
});

const BucketList = mongoose.model('bucketlist', BucketListSchema);
module.exports = {BucketList};

const Place = mongoose.model('place', PlaceSchema);
module.exports = {Place};