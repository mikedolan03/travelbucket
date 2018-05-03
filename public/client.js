
//to do
// list need to be a list with check boxes
// check boxes need to toggle the visited bool
//below list should be  a list of recomended places

//search view
//user input box
//div for results
//recommended locations below that

let myToken; 

//arrays to be filled in with api data
let locationSearchResults = [];
let featuredResults = [];
let userBucketList = []; 
//travel list
//-locId, country, city, visited 

//this function will eventually be an ajax call to query the database

//use a promise here
//handle the failure here before success
//write a wrapper called get data from api - shows modal that says loading then
//hides it once loaded

//this function will eventually be an ajax call to query the database
function getUserList (callbackFunction) {

	 getAPIData( callType='GET', data={}, myToken, myUrl = '/api/bucketlist', callbackFunction);

	//setTimeout(function() {
	//	callbackFunction(USER_LIST)
	//}, 1);

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



	userBucketList = data; 
	console.log("bucketlist", userBucketList);

	$('.welcome-login').addClass('hide');
	$('.welcome-page').addClass('hide');
	$('.user-list-section').removeClass('hide');
	$('.join-form-section').addClass('hide');
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

	 	let placeName ="";
	 	let tripDate = ""; 
	 	console.log("city value: ", userBucketList.places[i].city ); 

	 	if(typeof userBucketList.places[i].city != 'undefined') {

	 		if(userBucketList.places[i].city != 'undefined') {
	 			placeName = userBucketList.places[i].city + ", " + userBucketList.places[i].country; 
	 		} else {
	 			placeName = userBucketList.places[i].country; 
	 		}

	 	} else {
	 		placeName = userBucketList.places[i].country; 
	 	}

	 	if(typeof userBucketList.places[i].departDate != 'undefined') {
	 		tripDate = userBucketList.places[i].departDate;
	 		tripDate =  '- Trip planned for '+ tripDate.toString().substr(0, 10);
	 	} else {
	 		tripDate = ""; 
	 	}

		$('.list-set').append (
	  `<div class="bucket-list-item" placeIndex="${i}" >
	  <input type="checkbox" class="checkbox-btn" id="${data.places[i].locId}" placeIndex="${i}" name="location" value="${data.places[i].locId}" data="${data.places[i].locId}" ${toggle}>
	   <label for="${data.places[i].locId}" placeIndex="${i}" >${placeName}  ${tripDate} </label>
	   <div role="button" class="btn-delete" placeIndex="${i}"><i class="fas fa-trash-alt" placeIndex="${i}"></i></div>
	   </div>`
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

	featuredResults = data;

	console.log("locations: ", featuredResults);
	$('.featured-places').html(" ");

	let locationsContent = '<div class="lightgrey-box-background results-box"><ul>';
		
	for (let i = 0; i < featuredResults.length; i++) {

	    locationsContent += '<li class="place-result">';

	    if(featuredResults[i].city) {
	    	locationsContent += featuredResults[i].city + ' ';
	    }

	    if(featuredResults[i].country){ 
	    	locationsContent += featuredResults[i].country + ' ';
		}
	   	//
	   	//if(featuredResults[i].reviews.length	> 0) locationsContent += 'Review: '+featuredResults[i].reviews[0].content +' by ' +featuredResults[i].reviews[0].username;

	    //locationsContent += `<input type="button" class="add-feature-button" placeIndex="${i}" name="${data[i].longName}" locationId="${data[i]._id}" city="${data[i].city}" country="${data[i].country}" value="Add to list"></li>`;
	    
	    locationsContent += `<input type="button" class="add-feature-button" placeIndex="${i}" name="${featuredResults[i].longName}" locationId="${featuredResults[i]._id}" value="Add to list"></li>`;


	
		//$('.featured-places').append (`<input type="button" class="add-feature-button" placeIndex="${i}" name="${data[i].longName}" locationId="${data[i]._id}" city="${data[i].city}" country="${data[i].country}" value="Add to list"></li>`);
		
	}

	locationsContent +='</ul></div>';
	
	$('.featured-places').append (locationsContent);

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

//----this function gets the suggested locations
function getAndDisplayLocationList() {

	getLocations("USA", showLocationList);
}


function getSearchLocationList() {

	getLocations(showLocationList);
}



function userSearch(searchTerm) {
	console.log("search for ", searchTerm);
	$('.search-results').html(" ");

	let searchResultsContent = `<div class="lightgrey-box-background results-box"><ul>`;

	getLocations(searchTerm, function(data) {
			
			locationSearchResults = data; 
		
			for (var i=0 ; i < data.length ; i++)
			{
			    	
		       
		       searchResultsContent += `<li class="place-result">	`;

		        if(data[i].city)  {
		        	searchResultsContent += data[i].city + ', ';
		        }
		        if(data[i].country) {
		        	searchResultsContent += data[i].country + ' ';
		        }
		        if(data[i].reviews.length	> 0) { 
		        	//searchResultsContent += 'Review: '+data[i].reviews[0].content +' by ' +data[i].reviews[0].username;
		        }


		       searchResultsContent += `<input type="button" class="result-button" placeIndex="${i}" name="${data[i]._id}" locationId="${data[i]._id}" city="${data[i].city}" country="${data[i].country}" value="Add to list"></li> `;
		        		//}
		    	//}
			}

		searchResultsContent += `</ul></div>`;

	 	$('.search-results').append (searchResultsContent);

	});
	  	
		
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
let data = {
	country:location.country, 
	city:location.city, 
	locId:location.Id,
	departDate: location.departDate,
    returnDate: location.returnDate,
    planNotes: location.planNotes
	};
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

	    	  },
	  	statusCode: {
    		404: function() {
      		alert( "page not found" );
    		},
    		401: function() {
    			alert("username or password were incorrect");
    		},
    		400: function() {
    			alert("missing a username or password");
    		}
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

//----deletes a place of bucket list
function deletePlace(_placeIndex) {
	
	let data= {placeIndex: _placeIndex};
	
	data = JSON.stringify(data);


	getAPIData( callType='DELETE', data, myToken, myUrl = '/api/bucketlist/', function () {
		console.log("sent delete to server ");
		});
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
	 success: 	function(data) {
				   console.log('success in ajax');
				   console.log(JSON.stringify(data));
				   $('.user-status').text('done creating an account- try logging in!');
				   let userdata = {};

					userdata.username = $('.new-username').val();
					userdata.password = $('.new-password').val();

				   $.ajax({
			
					 	type: 'POST',
					 	data: JSON.stringify(userdata),
					 	contentType: 'application/json',
					 	url: '/api/auth/login',						
					 	success: function(data) {
								   console.log('success in ajax');
								   console.log(JSON.stringify(data));
								   $('.user-status').text('logging in');
								   myToken = data.authToken;

								   getAPIData( callType='GET', data ={}, myToken, myUrl = '/api/bucketlist/', showUserList);
								}
					});


	  		  	}
	});
}

function startUp() {

$('.modal-added-section').addClass('hide');
$('.user-list-section').addClass('hide');
$('.add-section').addClass('hide');



}

function main() {


}

$(function() {
  //getCount();
	startUp();
	//getAndDisplayUserList();
	
	$('.list-set').on('click', '.checkbox-btn', function(event) {
	  		console.log('checked button clicked', event.target);
	  		//event.preventDefault();
	  		let placeIndex = event.target.getAttribute('placeIndex');
	  		console.log("place ind on client: ", placeIndex);
	  		//const listItem = USER_LIST.userList.find(item => item.locId === locChecked);
	  		//listItem.visited = "true"; 
	  		//event.target.prop("checked", true );  //needs to be a straight javascript setProperty? 
	  		//console.log("user list: ", USER_LIST);

	  		checkOffPlace(placeIndex); 

	  		$('.modal-checkedoff-section').removeClass('hide');

	  		//ok button event handler
	  		$('.check-modal-ok').click(function(event) {
	  		event.preventDefault();
	  		$('.modal-checkedoff-section').addClass('hide');
	  		});

	  	});

	$('.list-set').on('click', '.btn-delete', function(event) {

			console.log('clicked..', event.target.tagName);

		  var el;
  
		  // we can check the tag type, and if it's not the <a>, move up.
		  if (event.target.tagName == 'path') {
		    el = event.target.parentElement.parentElement;

		    console.log('changing targ to', el); 

		  	} else if (event.target.tagName == 'svg') {
		    	el = event.target.parentElement;
		  		} else {
		    			el = event.target;
		  				}
		  	console.log(el.getAttribute("placeIndex"));
		
		
		let placeIndex = el.getAttribute('placeIndex');

		if(!placeIndex) {
			placeIndex = el.getAttribute('placeindex');
		}

		console.log("place ind on client for delete: ", placeIndex);
		
		deletePlace(placeIndex);

		getAndDisplayUserList();
	})



	
	//userSearch("USA"); 
	  $('.login-form').submit(function(event) {
	    event.preventDefault();
	    login();
	    $('.join-button-area').addClass('hide');
	  });
	  
	  $('.create-account-form').submit(function(event) {
	    event.preventDefault();
	    createAccount();
	  });

	  $('.show-join-button').click(function(event) {
	  	event.preventDefault();
	  	$('.create-account-form').removeClass('hide');
	  	$('.welcome-login').addClass('hide');
		$('.join-button-area').addClass('hide');
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

	  		//show modal planning option window

			let fLindex = event.target.getAttribute('placeIndex');
			

	  		//event handle option windows add submit button
	  		$('.adding-place-options-pop-up').removeClass('hide');

	  		let placeAddedName = featuredResults[fLindex].country;

	  		if (featuredResults[fLindex].city) {
	  			placeAddedName = featuredResults[fLindex].city+", "+ placeAddedName;
	  		}
	  		$('.place-options-header').html(`Let's plan your trip to ${placeAddedName}!`);

	  		$('.adding-button').click(function(event) {
		  		event.preventDefault();

		  		let depDate = $('.departure-date').val();
		  		let retDate = $('.return-date').val();
		  		let planNotes = $('.plan-notes').val();

		  		let location = { 
	  			city: featuredResults[fLindex].city,
	  			country:featuredResults[fLindex].country,
	  			Id:featuredResults[fLindex]._id,
	  			departDate: depDate,
	  			returnDate: retDate,
	  			planNotes: planNotes
	  			}

				addLocationToList(location);

				//reset the listed places ------still need to check suggestion against user list
				$('.featured-places').html(" ");
		  		getAndDisplayLocationList();
		  		$('.adding-place-options-pop-up').addClass('hide');
		  	});

	  		//let locAddedId = event.target.getAttribute('data');

	  		//console.log("added ",locAddedId);

	  		

	  			/*let location = { 
	  				city: event.target.getAttribute('city'),
	  				country:event.target.getAttribute('country'),
	  				Id:event.target.getAttribute('locationId')
	  				}*/

	  		

	  		
	  		/*$('.modal-added-section').removeClass('hide');

	  		//ok button event handler
	  		$('.add-modal-ok').click(function(event) {
		  		event.preventDefault();

		  		$('.featured-places').html(" ");
		  		getAndDisplayLocationList();
		  		$('.modal-added-section').addClass('hide');
	  		});
	  		*/

	  	});


	  	$('.search-results').on('click', function(event) {
	  		console.log('add button clicked');
	  		event.preventDefault();
	  		$('.search-results').off('click'); 
	  		//let locAddedId = event.target.getAttribute('data');
	  		//console.log("added ",locAddedId);

	  		let fLindex = event.target.getAttribute('placeIndex');
			

	  		//event handle option windows add submit button
	  		$('.adding-place-options-pop-up').removeClass('hide');

	  		let placeAddedName = locationSearchResults[fLindex].country;

	  		if (locationSearchResults[fLindex].city) {
	  			placeAddedName = locationSearchResults[fLindex].city+", "+ placeAddedName;
	  		}
	  		$('.place-options-header').html(`Let's plan your trip to ${placeAddedName}!`);

	  		$('.adding-button').click(function(event) {
		  		event.preventDefault();

		  		let depDate = $('.departure-date').val();
		  		let retDate = $('.return-date').val();
		  		let planNotes = $('.plan-notes').val();

		  		let location = { 
	  			city: locationSearchResults[fLindex].city,
	  			country:locationSearchResults[fLindex].country,
	  			Id:locationSearchResults[fLindex]._id,
	  			departDate: depDate,
	  			returnDate: retDate,
	  			planNotes: planNotes
	  			}

				addLocationToList(location);

				//reset the listed places ------still need to check suggestion against user list
				$('.search-results').html(" ");
	  			userSearch($('.search-box').val());
		  		$('.adding-place-options-pop-up').addClass('hide');
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