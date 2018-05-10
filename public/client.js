
function main() {

	let myToken; 
	//arrays to be filled in with api data
	let locationSearchResults = [];
	let featuredResults = [];
	let userBucketList = []; 
	

	
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

		$('.add-form').html('');
		$('.add-form').html(`
			<input type="button" name="add-button" 
			class="add-button button-35-b blue-background center" 
			value="Add new location to list">`);

	


	 	for (let i = 0; i < userBucketList.places.length; i++) {
		 	let toggle = " ";
		 	console.log(userBucketList.places[i].visited);  
;
		 	let backgroundColor = "";

		 	if(i%2) {
		 	 backgroundColor = "lightblue-background"; 
		 	} else {

		 	 backgroundColor = "lighterblue-background"; 
		 	}


		 	if(userBucketList.places[i].visited == "true") {
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

		 	if(userBucketList.places[i].departDate == null) console.log("place " + i + " doesn have depart");

		 	if(typeof userBucketList.places[i].departDate != 'undefined' 
		 	&& typeof userBucketList.places[i].departDate != 'null' && userBucketList.places[i].departDate != null) {
		 		tripDate = userBucketList.places[i].departDate;
		 		console.log('departDate ', userBucketList.places[i].departDate);
		 		tripDate =  '- Trip planned for '+ userBucketList.places[i].departDate.toString().substr(0, 10);
		 	} else {
		 		tripDate = ""; 
		 	}

		 	if(userBucketList.places[i].visited=="false") { 

		 	}

		 	let userListContent = "";

			
		 	userListContent = `<div class="bucket-list-item ${backgroundColor}" placeIndex="${i}" >
		  		<div class="row">
        			<div class="col-6">
		  				<div class="check-mark${i} check hide"><i class="far fa-check-circle"></i></div>
		   					<label for="${data.places[i].locId}" placeIndex="${i}" >${placeName} </label>
		   			</div>
		   			<div class="col-6 text-align-right">
		   				`;

		   	if(userBucketList.places[i].visited == "false") { 
					userListContent += `
					<button class="btn-plan-${i} button-35-b contrast-color black-text" 
		   				placeIndex="${i}">Plan Trip</button>
					<button class="checkbox-btn-${i} button-35-b contrast-color black-text" 
					placeIndex="${i}">Been there</button>`;
	
		 	}		
		   	
		   	userListContent += `
		   	<button class="btn-delete-${i} button-35-b complimentary-color black-text" 
					placeIndex="${i}"><i class="fas fa-trash-alt"></i></button>
		   	</div>
		   		</div>
		   		<div class = "row">
		   			<div class="col-6">
		   				<p class="smaller-text">${tripDate}</p> 
		   			</div>
		   		</div>
		   		</div>`;

		  	$('.list-set').append (userListContent);

		  	console.log("visited? ",userBucketList.places[i].visited );

		  	if(userBucketList.places[i].visited == "true") {
		  		$(`.check-mark${i}`).removeClass('hide');
		  	} 

		  	$(`.checkbox-btn-${i}`).click( function(event) {
		  		event.preventDefault();
		  		console.log('checked-i button clicked', userBucketList.places[i]);
		  		let placeIndex = i;
		  		console.log("place ind on client: ", placeIndex);
		  		//const listItem = USER_LIST.userList.find(item => item.locId === locChecked);
		  		//listItem.visited = "true"; 
		  		//event.target.prop("checked", true );  //needs to be a straight javascript setProperty? 
		  		//console.log("user list: ", USER_LIST);

		  	//showModal(`You are on your way to ${placeAddedName}!`, true, false, false, false, hideModal, null);

		  		ratePlaceView(userBucketList.places[i].locId, i);

		  		/*checkOffPlace(placeIndex); 

		  		$('.modal-checkedoff-section').removeClass('hide');

		  		//ok button event handler
		  		$('.check-modal-ok').click(function(event) {
		  		event.preventDefault();
		  		$('.modal-checkedoff-section').addClass('hide');

		  		getListofPlaces();
		  		});

		  		*/

	  		});

	  		$(`.btn-plan-${i}`).click( function(event) { 
	  			console.log("clicked plan button", i);
	  			event.preventDefault();

	  			planTripFromBucketListView(i);
	  		});

	  		$(`.btn-delete-${i}`).click( function(event) {

				event.preventDefault();			


			 let placeIndex = parseInt( event.target.closest('button').getAttribute('placeIndex'));
				

			
				console.log("place ind on client for delete: ", placeIndex);
				
				showModal(`Are you sure you want to delete ${placeName} from your list?`, 'Yes', 'No', function() {
					 deletePlace(placeIndex); 
					 hideModal();
					 getListofPlaces();
					}
					, hideModal);


				//deletePlace(placeIndex);

				//getAndDisplayUserList();
			});


		  	

	 	}

	 	$('.add-button').on('click', function(event) {
	  		event.preventDefault();
	  		console.log("add screen fired"); 

	  		$('.add-button').off('click'); 

	  		showSearchPageView(); 


	  	});


	 

	 //$('body').append ('</ul>');


	}

	//this function will eventually be an ajax call to query the database
	function getLocations (searchTerm, callbackFunction) {

		 getAPIData( callType='GET', data={searchFor:searchTerm}, myToken, myUrl = '/api/place', callbackFunction);


	}

	function showLocationList(data){

		featuredResults = data;

		console.log("locations: ", featuredResults);
		$('.featured-places').html(" ");

		let locationsContent =''; 

		//'<div class="lightgrey-box-background results-box">';
		//$('.featured-places').append (locationsContent);
			
		for (let i = 0; i < featuredResults.length; i++) {
			let backgroundColor = 'lighterblue-background'; 

			if(i%2) {
				backgroundColor = 'lightblue-background';
			}

		    locationsContent = `<div class="place-result ${backgroundColor}">
		    						<div class="row">
        								<div class="col-6">`;

		    if(featuredResults[i].city) {
		    	locationsContent += featuredResults[i].city + ' ';
		    }

		    if(featuredResults[i].country){ 
		    	locationsContent += featuredResults[i].country + ' ';
			}
		   	//
		   	//if(featuredResults[i].reviews.length	> 0) locationsContent += 'Review: '+featuredResults[i].reviews[0].content +' by ' +featuredResults[i].reviews[0].username;

		    //locationsContent += `<input type="button" class="add-feature-button" placeIndex="${i}" name="${data[i].longName}" locationId="${data[i]._id}" city="${data[i].city}" country="${data[i].country}" value="Add to list"></li>`;
		    
		    locationsContent += `</div>	
		    				<div class="col-6 text-align-right">
		    				<button class="add-feat-${i} add-feature-button button-35-b complimentary-color black-text" 
		    				placeIndex="${i}" name="location # ${i}" 
		    				locationId="${featuredResults[i]._id}" 
		    				value="Let's Go!">Let's Go!</button>
		    				</div>
			   			 </div>	
		      		</div>`;

			$('.featured-places').append (locationsContent);

			//do buttons here
			$(`.add-feat-${i}`).on('click', function(event) {
		  		console.log('add featured button clicked', i);
		  		event.preventDefault();
		  		$(this).off(event);

		  		planTripView(i);

		  	});
		
			//$('.featured-places').append (`<input type="button" class="add-feature-button" placeIndex="${i}" name="${data[i].longName}" locationId="${data[i]._id}" city="${data[i].city}" country="${data[i].country}" value="Add to list"></li>`);
			
		}

		locationsContent ='</div>';
		
		$('.featured-places').append (locationsContent);



	}

	function planTripView(i) {

		$('.adding-place-options-pop-up').removeClass('hide');

		  		let placeAddedName = featuredResults[i].country;

		  		if (featuredResults[i].city) {
		  			placeAddedName = featuredResults[i].city+", "+ placeAddedName;
		  		}
		  		$('.place-options-header').html(`Let's plan your trip to ${placeAddedName}!`);

		  		$('.adding-button').click(function(event) {
			  		event.preventDefault();
			  		$(this).off(event);

			  		let depDate = $('.departure-date').val();
			  		let retDate = $('.return-date').val();
			  		let planNotes = $('.plan-notes').val();

			  		let location = { 
		  			city: featuredResults[i].city,
		  			country:featuredResults[i].country,
		  			Id:featuredResults[i]._id,
		  			departDate: depDate,
		  			returnDate: retDate,
		  			planNotes: planNotes
		  			}

					addLocationToList(location);

					showModal(`You are on your way to ${placeAddedName}!`, 'Ok', null, function() {
						hideModal();
						$('.user-list-section').removeClass('hide');
		  				$('.search-results').html(" ");
		  				$('.add-section').addClass('hide');
		  				$('.list-set').html("");
		  				$('.back-button').off('click');
		  				getAndDisplayUserList();
					}, null);

					//reset the listed places ------still need to check suggestion against user list
					$('.featured-places').html(" ");
			  		//getAndDisplayLocationList();
			  		$('.adding-place-options-pop-up').addClass('hide');
			  	});
	}

	function planTripFromBucketListView(i) {

		$('.adding-place-options-pop-up').removeClass('hide');

		  		let placeAddedName = userBucketList.places[i].country;

		  		if (userBucketList.places[i].city) {
		  			placeAddedName = userBucketList.places[i].city+", "+ placeAddedName;
		  		}
		  		$('.place-options-header').html(`Let's plan your trip to ${placeAddedName}!`);

		  		$('.adding-button').click(function(event) {
			  		event.preventDefault();
			  		$(this).off(event);

			  		let depDate = $('.departure-date').val();
			  		let retDate = $('.return-date').val();
			  		let planNotes = $('.plan-notes').val();

			  		let location = { 
		  			city: userBucketList.places[i].city,
		  			country:userBucketList.places[i].country,
		  			Id:userBucketList.places[i]._id,
		  			departDate: depDate,
		  			returnDate: retDate,
		  			planNotes: planNotes
		  			}

					//addLocationToList(location);

					showModal(`You are on your way to ${placeAddedName}!`, 'Ok', null, function() {
						hideModal();
						$('.user-list-section').removeClass('hide');
		  				$('.search-results').html(" ");
		  				$('.add-section').addClass('hide');
		  				$('.list-set').html("");
		  				$('.back-button').off('click');
		  				getAndDisplayUserList();
					}, null);

					//reset the listed places ------still need to check suggestion against user list
					$('.featured-places').html(" ");
			  		//getAndDisplayLocationList();
			  		$('.adding-place-options-pop-up').addClass('hide');
			  	});
	}


	function ratePlaceView(locationId, placeInd) {

		let starId = "";
		$(`.stars`).html('<i class="far fa-star"></i>');
		$('.trip-review').val('');
		$('.review-place-options-pop-up').removeClass('hide');

		let headerText = "";
		if (userBucketList.places[placeInd].city) {
			headerText	= userBucketList.places[placeInd].city;
		}
		headerText	+= " " + userBucketList.places[placeInd].country; 

		$('.review-options-header').html(`How did you like ${headerText}?`);

		$('.rating').on('click', function(event) {
			ratingCount = parseInt( event.target.closest('span').getAttribute('data'));
			console.log("stars ", ratingCount);

			$(`.stars`).html('<i class="far fa-star"></i>');

			for (let si = 1; si <= ratingCount; si++)
			{

				$(`#star${si}`).html('<i class="fas fa-star"></i>');

			}

		});


		$('.checkit-button').on('click', function(event) {
			
			event.preventDefault();
			//$('.checkit-button').off('click'); 
			$(this).off(event);

			let newReviewdata = {
			locId: locationId,
			userId: userBucketList.user._id,
			 userName: userBucketList.user.username,
			 content: $('.trip-review').val(),
			 rating: ratingCount
			};

			addReview(newReviewdata); 
			console.log('checking off', placeInd);
			checkOffPlace(placeInd);

			$('.review-place-options-pop-up').addClass('hide');

			getListofPlaces();

		});



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

	$('.place-results-header').html("Must see Locations!");


		getLocations("USA", showLocationList);
	}


	function getSearchLocationList() {

		getLocations(showLocationList);
	}

	function diplaySearchResults() {
		$('.search-results').html(" ");

		let searchResultsContent = `<div class="lightgrey-box-background results-box">`;
		$('.search-results').append (searchResultsContent);

		locationSearchResults = data; 
			
				for (var i=0 ; i < locationSearchResults.length ; i++)
				{
				    	
			       
			       searchResultsContent = `<div class="place-result">	`;

			        if(locationSearchResults[i].city)  {
			        	searchResultsContent += locationSearchResults[i].city + ', ';
			        }
			        if(locationSearchResults[i].country) {
			        	searchResultsContent += locationSearchResults[i].country + ' ';
			        }
			        if(locationSearchResults[i].reviews.length	> 0) { 
			        	//searchResultsContent += 'Review: '+data[i].reviews[0].content +' by ' +data[i].reviews[0].username;
			        }


			       searchResultsContent += `<input type="button" class="result-button result-${i}" 
			       	placeIndex="${i}" name="${locationSearchResults[i]._id}" 
			       	locationId="${locationSearchResults[i]._id}" 
			       		city="${locationSearchResults[i].city}" 
			       		country="${locationSearchResults[i].country}" value="Let's Go!"></div> `;
			        		//}
			    	//}

			    	$('.search-results').append (searchResultsContent);


				}

			searchResultsContent = `</div>`;

		 	$('.search-results').append (searchResultsContent);


	}



	function userSearch(searchTerm) {
		console.log("search for ", searchTerm);
		$('.search-results').html(" ");

		//let searchResultsContent = `<div class="lightgrey-box-background results-box"><ul>`;
		$('.place-results-header').html("Top Search Results");
		getLocations(searchTerm, showLocationList); 

		/* getLocations(searchTerm, function(data) {
				
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


			       searchResultsContent += `<input type="button" class="result-button" placeIndex="${i}" 
			       name="${data[i]._id}" locationId="${data[i]._id}" city="${data[i].city}" 
			       country="${data[i].country}" value="Let's go!"></li> `;
			        		//}
			    	//}
				}

			searchResultsContent += `</ul></div>`;

		 	$('.search-results').append (searchResultsContent);

		}); */
		  	
			
	}

	function addPlanToList(location, pIndex){

	let data = {
			placeIndex: pIndex,
			country:location.country, 
			city:location.city, 
			locId:location.Id,
			departDate: location.departDate,
		    returnDate: location.returnDate,
		    planNotes: location.planNotes
			};
		data = JSON.stringify(data);

		console.log('data to send:', data);

		getAPIData( callType='PUT', data, myToken, myUrl = '/api/bucketlist/', function () {
		 	console.log("sent update to server ");
		 });	
	
	}

	function addLocationToList(location){

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

		getAPIData( callType='PUT', data, myToken, myUrl = '/api/bucketlist/', function () {
		 	console.log("sent update to server ");
		 });
	}

	function addReview(reviewData){

		

		reviewData = JSON.stringify(reviewData);

		console.log('review data to send:', reviewData);

		getAPIData( callType='PUT', reviewData, myToken, myUrl = '/api/place/', function () {
		 	console.log("sent review to server ");
		 });
	}

	//----------------login code

	function login() {

		let data = {};

		data.username = $('.username').val();
		data.password = $('.password').val();

		currentUserName = data.username;

									
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

	function welcomePageView() {

	$('.modal-added-section').addClass('hide');
	$('.user-list-section').addClass('hide');
	$('.add-section').addClass('hide');

	//input
 	$('.login-form').submit(function(event) {
	    event.preventDefault();
	    login();
	    $('.join-button-area').addClass('hide');
	  });

 	$('.show-join-button').click(function(event) {
	  	event.preventDefault();
	  	$('.create-account-form').removeClass('hide');
	  	$('.welcome-login').addClass('hide');
		$('.join-button-area').addClass('hide');
	  
		$('.create-account-form').submit(function(event) {
	    	event.preventDefault();
	    	createAccount();
	  	});
	  });

 	


	}

	function showBucketListView() {


		//inputs
/*
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
		});
		*/

	}

	function showModal(text, option1txt,option2txt, affirmCallback, negateCallback) {
		

		let modalContent = `<div class="modal-text">${text}</div>
            <button class="modal-ok-button">${option1txt}</button>`;

        if(option2txt != null) {
            modalContent += `<button class="modal-cancel-button">${option2txt}</button>`;
        }

        $('.gen-modal-content').html(modalContent); 
		
		$('.modal-general-section').removeClass('hide'); 

		
			$('.modal-ok-button').removeClass('hide'); 

			$('.modal-ok-button').on('click', function(event) {
			  	event.preventDefault();
			  	$(this).off(event);
			  	affirmCallback();
	    	} );


		if( option2txt != null) {
			$('.modal-cancel-button').removeClass('hide'); 
			$('.modal-cancel-button').on('click', function(event) {
			  	event.preventDefault();
			  	$(this).off(event);
			  	negateCallback();
	    	} );
		} else {
			$('.modal-cancel-button').addClass('hide');
			
		}


	}

	function hideModal() {
		$('.modal-general-section').addClass('hide'); 
	}

	function showSearchPageView() {

		//rebuild button to get rid of old event handlers
		$('.back-to-list').html('');
		$('.back-to-list').html(`
			<input type="button" name="back-button" 
			class="back-button button-35-b contrast-color black-text" 
			value="Go back to your Bucket List">`);

		getAndDisplayLocationList();

	  	$('.user-list-section').addClass('hide');
	  	$('.add-section').removeClass('hide');

	  	$('.search-button').click(function(event) {
	  		event.preventDefault();
	  		console.log("search clicked", $('.search-box').val() );
	  		userSearch($('.search-box').val());
	  	});

	  	//-----this back button will reload the user List View
	  	$('.back-button').on('click', function(event) {
		  	event.preventDefault();
		  	$('.user-list-section').removeClass('hide');
		  	$('.search-results').html(" ");
		  	$('.add-section').addClass('hide');
		  	$('.list-set').html("");
		  	$('.back-button').off('click');
		  	getAndDisplayUserList();
	    } );


	  	//=== featured 



	}

	welcomePageView(); 
}

$(function() {
  //getCount();
	//startUp();
	main(); 
});
	

	//getAndDisplayUserList();
	  

//---this button loads the Add View
/*
	  $('.add-button').click(function(event) {
	  	event.preventDefault();

	  	showSearchPageView();

	  	

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
*/