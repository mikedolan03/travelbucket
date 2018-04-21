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

const BucketList = mongoose.model('bucketlist', BucketListSchema);
module.exports = {BucketList};