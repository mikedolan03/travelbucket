
//to do
// list need to be a list with check boxes
// check boxes need to toggle the visited bool
//below list should be  a list of recomended places

//search view
//user input box
//div for results
//recommended locations below that


let USER_LIST = {
	"userList" : [
	{
		"locId": "12345",
		"country": "Spain",
		"city": "Barcelona",
		"visited": "false"
	},
	{
		"locId": "123456",
		"country": "USA",
		"city": "New York",
		"visited": "false"
	},
		{
		"locId": "1234567",
		"country": "Peru",
		"city": "Lima",
		"visited": "true"
	},
	{
		"locId": "1234345",
		"country": "USA",
		"city": "Washington, DC",
		"visited": "false"
	},
	{
		"locId": "12378456",
		"country": "USA",
		"city": "Atlanta",
		"visited": "false"
	},
		{
		"locId": "12345997",
		"country": "USA",
		"city": "Austin",
		"visited": "true"
	}

	]

}

let LOCATIONS = {
	"locations" : [
		{
			"locId": "12345", 
			"country": "Spain",
			"city":"Barcelona",
			"longName":"Barcelona, Spain", 
			"reviews" : [
				{
					"userId": "468", 
					"username": "Joe", 
					"content" : "Epic trip!",
					"starRating" : "5"
				},
				{
					"userId": "357", 
					"username": "Bob", 
					"content" : "Great food.",
					"starRating" : "4"
				}
			]
		},
		{
			"locId": "123456",
			"country": "USA",
			"city":"New York",
			"longName":"New York, USA", 
			"reviews" : [
				{
					"userId": "123", 
					"username": "Phil", 
					"content" : "great place",
					"starRating" : "3"
				},
				{
					"userId": "321", 
					"username": "Hughe", 
					"content" : "cool scene",
					"starRating" : "4"
				}
			]
		},
		{
			"locId": "55123456",
			"country": "Peru",
			"city":"Lima",
			"longName":"Lima, Peru", 
			"reviews" : [
				{
					"userId": "567",
					"username": "Mike", 
					"content" : "great architecture",
					"starRating" : "5"
				},
				{
					"userId": "789", 
					"username": "Pete", 
					"content" : "second dryest world capital!",
					"starRating" : "5"
				}
			]
		},
		{
			"locId": "23123456",
			"country": "USA",
			"city":"Falls Church",
			"longName":"Falls Church, USA", 
			"reviews" : [
				{
					"userId": "567",
					"username": "Mike", 
					"content" : "great town",
					"starRating" : "5"
				},
				{
					"userId": "789", 
					"username": "Bob", 
					"content" : "a little city indeed!",
					"starRating" : "5"
				}
			]
		},
		{
			"locId": "134423456",
			"country": "USA",
			"city":"Las Vegas",
			"longName":"Las Vegas, USA", 
			"reviews" : [
				{
					"userId": "567",
					"username": "Mike", 
					"content" : "great gambling",
					"starRating" : "5"
				},
				{
					"userId": "789", 
					"username": "Joe", 
					"content" : "love the shows!",
					"starRating" : "5"
				}
			]
		}
	]
}

//travel list
//-locId, country, city, visited 

//this function will eventually be an ajax call to query the database
function getUserList (callbackFunction) {

	setTimeout(function() {
		callbackFunction(USER_LIST)
	}, 1);

}

function showUserList(data){

 //$('body').append ('<ul>');
	
 for (let i = 0; i < data.userList.length; i++) {
 	let toggle = " ";
 	console.log(data.userList[i].visited);  
 	if(data.userList[i].visited == "true") {
 		console.log("checked");
 		toggle = "checked";
 	} else {
 		toggle = "";
 	}

	$('.list-set').append (
  `<div><input type="checkbox" id="${data.userList[i].locId}" name="location" value="${data.userList[i].locId}" ${toggle}>
   <label for="${data.userList[i].locId}">${data.userList[i].city}, ${data.userList[i].country}</label></div>`
  	);
 }

 $('body').append ('</ul>');


}

//this function will eventually be an ajax call to query the database
function getLocations (callbackFunction) {

	setTimeout(function() {
		callbackFunction(LOCATIONS)
	}, 1);

}

function showLocationList(data){

	 $('.featured-places').append ('<ul>');
		
	 for (let i = 0; i < data.locations.length; i++) {
		$('.featured-places').append (
		'<li>' +data.locations[i].city + ' ' + data.locations[i].country + '   Review: '+data.locations[i].reviews[0].content +' by ' +data.locations[i].reviews[0].username + '</li>');
	 }

	 $('.featured-places').append ('</ul>');


}

function getAndDisplayUserList() {

	getUserList(showUserList);
}

function getAndDisplayLocationList() {

	getLocations(showLocationList);
}


function userSearch(searchTerm) {
console.log("search for ", searchTerm);
$('.search-results').append (`<ul>`);

 	getLocations ( function(data) {
		let results = [];
		let field = "longName";
		//let searchTerm = "new york";
		for (var i=0 ; i < data.locations.length ; i++)
		{
	    	if ( data.locations[i][field].includes(searchTerm) ) {
	        	results.push(data.locations[i]);
	        	$('.search-results').append (`<li>${data.locations[i].longName}</li> 
	        		<input type="button" class="result-button" name="${data.locations[i].longName}" data="${data.locations[i].locId}" value="Add to list">`);
	    	}
		}


 	});

 	$('.search-results').append (`</ul>`);


	  	
	
}

function addLocationToList(locationId){

	let location = LOCATIONS.locations.find(item => item.locId === locationId);
	console.log("", location);
	USER_LIST.userList.push( {
		"locId": location.locId,
		"country": location.country,
		"city": location.city,
		"visited": "false"
	})
	console.log("Updated list: ", USER_LIST);
}


//----------------login code

function login() {

	let data = {};

	data.username = $('.username').val();
	data.password = $('.password').val();
	//data.username = "jenny";
	//data.password = "bob";

	/*
	//this does not work not sure why tho... 
	$.post('/api/auth/login', JSON.stringify(data), function( data ) {
	 console.log('success in $post');
	  console.log(JSON.stringify(data));
	});*/
						
	$.ajax({
		
	 type: 'POST',
	 data: JSON.stringify(data),
	 contentType: 'application/json',
	 url: '/api/auth/login',						
	 success: function(data) {
			   console.log('success in ajax');
			   console.log(JSON.stringify(data));
			   $('.user-status').text('logging in');

				$.ajax({
				 type: 'GET',
				 data: {},
				 beforeSend: function (xhr){ 
				 	console.log(data.authToken);
	        	 xhr.setRequestHeader('Authorization', ('BEARER '+ data.authToken)); 
	    		 },
				 contentType: 'application/json',
				 url: '/api/protected',						
				 success: function(data) {
						   console.log('success in protected');
						   console.log(data);
						   $('.user-status').text('Logged In');
				    	  }
		
	 			});

	    	  }
		
	 });



}

function createAccount() {
	console.log('creating account');
	
	let data = {};

	data.username = $('.new-username').val();
	data.password = $('.new-password').val();
	data.firstName = $('.first-name').val();
	data.lastName = $('.last-name').val();

	$.ajax({
		
	 type: 'POST',
	 data: JSON.stringify(data),
	 contentType: 'application/json',
	 url: '/api/users',						
	 success: function(data) {
			   console.log('success in ajax');
			   console.log(JSON.stringify(data));
			   $('.user-status').text('done creating an account- try logging in!');


	  		  }
	});
}

$(function() {
  //getCount();

	getAndDisplayUserList();
	getAndDisplayLocationList();
	//userSearch("USA"); 
	  $('.login-form').submit(function(event) {
	    event.preventDefault();
	    login();
	  });
	  $('.create-account-form').submit(function(event) {
	    event.preventDefault();
	    createAccount();
	  });

	  $('.add-button').click(function(event) {
	  	event.preventDefault();
	  	$('.user-list-section').addClass('hide');
	  	$('.add-section').removeClass('hide');

	  	$('.search-button').click(function(event) {
	  		event.preventDefault();
	  		console.log("search clicked", $('.search-box').val() );
	  		userSearch($('.search-box').val());
	  	});


	  	$('.search-results').on('click', function(event) {
	  		console.log('add button clicked');
	  		event.preventDefault();
	  		let locAddedId = event.target.getAttribute('data');
	  		console.log("added ",locAddedId);
	  		addLocationToList(locAddedId);
	  	});

	  	$('.back-button').click(function(event) {
	  	event.preventDefault();
	  	$('.user-list-section').removeClass('hide');
	  	$('.add-section').addClass('hide');
	  	$('.list-set').html("");
	  	getAndDisplayUserList();
	    } );




	  });


});