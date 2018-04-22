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

PlaceSchema.plugin(searchable);

const Place = mongoose.model('place', PlaceSchema);
module.exports = {Place};