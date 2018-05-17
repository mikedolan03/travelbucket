'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const searchable = require('mongoose-searchable');

const PlaceSchema = mongoose.Schema({
	 	country: {
	 	type: String,
	 	required: true,
	  	},
	 	city: {
	  	type: String,
	  	},
	  	state: {
	  	type: String,
	  	},
	 	visited: {
	  	type: String,
	  	default: 'false',
	 	},
	 	reviews: [{
	 		user: {
	 		type: Schema.ObjectId
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

PlaceSchema.plugin(searchable);

const Place = mongoose.model('place', PlaceSchema);
module.exports = {Place};

/*
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
	 		user: {
	 		type: Schema.ObjectId,
	 		ref: 'User',
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
*/