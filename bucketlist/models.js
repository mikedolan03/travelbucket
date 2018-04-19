'use strict'
const mongoose = require('mongoose');

const BucketListSchema = mongoose.Schema({
	 username: {
	 	type: String,
	 	required: true,
	  },
	 BucketList: [ {
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

const BucketList = mongoose.model('BucketList', BucketListSchema);
module.exports = {BucketList};