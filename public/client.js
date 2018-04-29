
//to do
// list need to be a list with check boxes
// check boxes need to toggle the visited bool
//below list should be  a list of recomended places

//search view
//user input box
//div for results
//recommended locations below that

let myToken; 

let USER_LIST = {    //change to bucket_list
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
		"locId": "55123456",
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

//use a promise here
//handle the failure here before success
//write a wrapper called get data from api - shows modal that says loading then
//hides it once loaded

//this function will eventually be an ajax call to query the database
function getUserList (callbackFunction) {

	setTimeout(function() {
		callbackFunction(USER_LIST)
	}, 1);

}

function wrapperExample (requestObj) {

	$('.loading-modal').removeClass('hide');
console.log("loading");

	return $.ajax( requestObj )
  	  	.always(function() {
    	$('.loading-modal').addClass('hide');
    	console.log("done loading");
  		});


	/*promise = new promise ((resolve, reject) => {
		setTimeout(function() {
		resolve(USER_LIST);
	}, 1);

		promise.finally( function() {  
			$('.loading-modal').addClass('hide');
		});

	} );  */

	

}

function showUserList(data){

 //$('body').append ('<ul>');
	$('.list-set').html(" ");

 for (let i = 0; i < data.places.length; i++) {
 	let toggle = " ";
 	console.log(data.places[i].visited);  
 	if(data.places[i].visited == "true") {
 		console.log("checked");
 		toggle = "checked";
 	} else {
 		toggle = "";
 	}

	$('.list-set').append (
  `<div placeIndex="${i}" ><input type="checkbox" id="${data.places[i].locId}" placeIndex="${i}" name="location" value="${data.places[i].locId}" data="${data.places[i].locId}" ${toggle}>
   <label for="${data.places[i].locId}" placeIndex="${i}" >${data.places[i].city}, ${data.places[i].country}</label></div>`
  	);
 }

 //$('body').append ('</ul>');


}

//this function will eventually be an ajax call to query the database
function getLocations (searchTerm, callbackFunction) {

	 getAPIData( callType='GET', data={searchFor:searchTerm}, myToken, myUrl = '/api/place', callbackFunction);

	//setTimeout(function() {
	//	callbackFunction(LOCATIONS)
	//}, 1);

}

function showLocationList(data){
	console.log("locations: ", data);
	$('.featured-places').html(" ");
	$('.featured-places').append ('<ul>');
		
	for (let i = 0; i < data.length; i++) {

	        	  let locationsContent = '<li>';
	        	  if(data[i].city) locationsContent += data[i].city + ' ';
	        	  if(data[i].country) locationsContent += data[i].country + ' ';
	        	  if(data[i].reviews.length	> 0) locationsContent += 'Review: '+data[i].reviews[0].content +' by ' +data[i].reviews[0].username;

		$('.featured-places').append (locationsContent);
		$('.featured-places').append (`<input type="button" class="add-feature-button" placeIndex="${i}" name="${data[i].longName}" locationId="${data[i]._id}" city="${data[i].city}" country="${data[i].country}" value="Add to list"></li>`);
		
	}

	$('.featured-places').append ('</ul>');


}

function getAndDisplayUserListPromiseExample() {

	getUserList(showUserList)
	.fail(function(error) { console.log("error", error); } )
	.done (function(data) {
	console.log("heres the userlist", data); 
	})
}

function getAndDisplayUserList() {

	getAPIData( callType='GET', data ={}, myToken, myUrl = '/api/bucketlist/', showUserList);

	//getUserList(showUserList);
}

function getAndDisplayLocationList() {

	getLocations("USA", showLocationList);
}


function getSearchLocationList() {

	getLocations(showLocationList);
}



function userSearch(searchTerm) {
console.log("search for ", searchTerm);
$('.search-results').html(" ");
$('.search-results').append (`<ul>`);

getLocations(searchTerm, function(data) {
		
	
		for (var i=0 ; i < data.length ; i++)
		{
				let locationsContent = "";
	    	//if ( data.locations[i][field].includes(searchTerm) ) {
	        	

	        	//dont show locations already on the users bucket list
	        	//  if (USER_LIST.userList.find(item => item.locId === data.locations[i].locId) ) {
	        	  
	        	 // } else {
	        	  	
				
	        	  if(data[i].city) locationsContent += data[i].city + ' ';
	        	  if(data[i].country) locationsContent += data[i].country + ' ';
	        	  if(data[i].reviews.length	> 0) locationsContent += 'Review: '+data[i].reviews[0].content +' by ' +data[i].reviews[0].username;


	        		$('.search-results').append (`<li>${locationsContent}</li> 
	        		<input type="button" class="result-button" name="${data[i]._id}" locationId="${data[i]._id}" city="${data[i].city}" country="${data[i].country}" value="Add to list">`);
	        		//}
	    	//}
		}


 	});

 	$('.search-results').append (`</ul>`);


	  	
	
}

function addLocationToList(location){

	/*let location = LOCATIONS.locations.find(item => item.locId === locationId);
	console.log("", location);
	USER_LIST.userList.push( {
		"locId": location.locId,
		"country": location.country,
		"city": location.city,
		"visited": "false"
	})
	console.log("Updated list: ", USER_LIST);
*/
let data={country:location.country, city:location.city, locId:location.Id};
data = JSON.stringify(data);

console.log('data to send:', data);

 //getAPIData( callType='POST', data, myToken, myUrl = '/api/bucketlist', function () {
 //	console.log("sent update to server ");
 //});

 getAPIData( callType='PUT', data, myToken, myUrl = '/api/bucketlist/', function () {
 	console.log("sent update to server ");
 });
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
			   myToken = data.authToken;

			   getAPIData( callType='GET', data ={}, myToken, myUrl = '/api/bucketlist/', showUserList);
/*
				$.ajax({
				 type: 'GET',
				 data: JSON.stringify(data),
				 beforeSend: function (xhr){ 
				 	console.log(data.authToken);
	        	 xhr.setRequestHeader('Authorization', ('BEARER '+ data.authToken)); 
	    		 },
				 contentType: 'application/json',
				 url: '/api/bucketlist',						
				 success: function(data) {
						   console.log('success in protected');
						   console.log(data);
						   $('.user-status').text('Logged In');
						   showUserList(data);
				    	  }
		
	 			});
	 			*/

	    	  }
		
	 });



}

function getAPIData( callType='GET', data ={}, userToken, myUrl = '/api/bucketlist', callback) {

	$.ajax({
				 type: callType,
				 data: data,//JSON.stringify(data),
				 beforeSend: function (xhr){ 
				 	console.log(data.authToken);
	        	 xhr.setRequestHeader('Authorization', ('BEARER '+ userToken)); 
	    		 },
				 contentType: 'application/json',
				 url: myUrl,						
				 success: function(data) {
						   console.log('success in getting API');
						   callback(data);
				    	  }
		
	 			});
}

function addPlace() {

	//user selected a place
	//build a data object from the data of the place


}

function checkOffPlace(_placeIndex) {
	//send a request to the bucket list to change the document entry visited = true
	
	let data= {placeIndex: _placeIndex};
	
	data = JSON.stringify(data);


	getAPIData( callType='PUT', data, myToken, myUrl = '/api/bucketlist/checkoff', function () {
		console.log("sent check off update to server ");
		});

}

function getListofPlaces() {
	
	getAPIData( callType='GET', data ={}, myToken, myUrl = '/api/bucketlist', showUserList);

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
	
	$('.list-set').on('click', function(event) {
	  		console.log('checked button clicked', event.target);
	  		//event.preventDefault();
	  		let placeIndex = event.target.getAttribute('placeIndex');
	  		console.log("place ind on client: ", placeIndex);
	  		//const listItem = USER_LIST.userList.find(item => item.locId === locChecked);
	  		//listItem.visited = "true"; 
	  		//event.target.prop("checked", true );  //needs to be a straight javascript setProperty? 
	  		//console.log("user list: ", USER_LIST);

	  		checkOffPlace(placeIndex); 

	  		$('.modal-added-section').removeClass('hide');

	  		//ok button event handler
	  		$('.add-modal-ok').click(function(event) {
	  		event.preventDefault();
	  		$('.modal-added-section').addClass('hide');
	  		});

	  	});



	
	//userSearch("USA"); 
	  $('.login-form').submit(function(event) {
	    event.preventDefault();
	    login();
	  });
	  
	  $('.create-account-form').submit(function(event) {
	    event.preventDefault();
	    createAccount();
	  });


//---this button loads the Add View
	  $('.add-button').click(function(event) {
	  	event.preventDefault();

	  	getAndDisplayLocationList();

	  	$('.user-list-section').addClass('hide');
	  	$('.add-section').removeClass('hide');

	  	$('.search-button').click(function(event) {
	  		event.preventDefault();
	  		console.log("search clicked", $('.search-box').val() );
	  		userSearch($('.search-box').val());
	  	});

	  	$('.featured-places').on('click', function(event) {
	  		console.log('add featured button clicked');
	  		event.preventDefault();
	  		$('.featured-places').off('click'); 
	  		//let locAddedId = event.target.getAttribute('data');

	  		//console.log("added ",locAddedId);

	  			let location = { 
	  				city: event.target.getAttribute('city'),
	  				country:event.target.getAttribute('country'),
	  				Id:event.target.getAttribute('locationId')
	  		}

	  		addLocationToList(location);
	  		$('.modal-added-section').removeClass('hide');

	  		//ok button event handler
	  		$('.add-modal-ok').click(function(event) {
	  		event.preventDefault();
	  		$('.featured-places').html(" ");
	  		getAndDisplayLocationList();
	  		$('.modal-added-section').addClass('hide');
	  		});

	  	});


	  	$('.search-results').on('click', function(event) {
	  		console.log('add button clicked');
	  		event.preventDefault();
	  		$('.search-results').off('click'); 
	  		//let locAddedId = event.target.getAttribute('data');
	  		//console.log("added ",locAddedId);

	  		let location = { 
	  				city: event.target.getAttribute('city'),
	  				country:event.target.getAttribute('country'),
	  				Id:event.target.getAttribute('locationId')
	  		}

	  		addLocationToList(location);
	  		$('.modal-added-section').removeClass('hide');

	  		//ok button event handler
	  		$('.add-modal-ok').click(function(event) {
	  		event.preventDefault();
	  		$('.search-results').html(" ");
	  		userSearch($('.search-box').val());
	  		$('.modal-added-section').addClass('hide');
	  		});

	  	});

//-----this back button will reload the user List View
	  	$('.back-button').click(function(event) {
	  	event.preventDefault();
	  	$('.user-list-section').removeClass('hide');
	  	$('.search-results').html(" ");
	  	$('.add-section').addClass('hide');
	  	$('.list-set').html("");
	  	getAndDisplayUserList();
	    } );




	  });


});