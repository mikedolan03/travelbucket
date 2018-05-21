
function main() {

	let myToken; 
	//arrays to be filled in with api data
	let locationSearchResults = [];
	let featuredResults = [];
	let userBucketList = []; 
	let menuShowing = false;
	let onlyVisits	= false; 


	function getUserList (callbackFunction) {

		 getAPIData( callType='GET', data={}, myToken, myUrl = '/api/bucketlist', callbackFunction);

	}

	//USER VIEWS - Bucket List Places to Go, Bucket List Visited, Search Page

	//this is the main Bucket List view
	//it can show the places a user has selected to go someday
	//or places they've already checked off.
	function showUserList(data){

		console.log("menu status", menuShowing);

		userBucketList = data; 


		console.log("bucketlist", userBucketList);

		$('.welcome-login').hide().addClass('hide');
		$('.welcome-page').hide().addClass('hide');
			//hide it first then fade it in -  since two tabs uses this code - want to show transition
		$('.user-list-section').hide().addClass('hide');
		$('.user-list-section').fadeIn(300).removeClass('hide');
		$('.join-form-section').hide().addClass('hide');
		$('.list-set').html(" ");
		$('.logout-button').fadeIn(300).removeClass('hide');

		$('.logout-button').click(function() { 
			location.reload(); 
		});

		if(!onlyVisits) { 
			$('.bucklist-title').html(`Hi ${userBucketList.user.firstName}, here is your Bucket List!`); 
						} else {
						$('.bucklist-title').html(`Hi ${userBucketList.user.firstName}, here are the places you've been!`); 

						}
		

		$('.hamburger-menu-button-container').removeClass('hide');
		$('.hamburger-menu-button-container').html(' ');
		$('.hamburger-menu-button-container').html('<button class="show-menu-button blend-button"><i class="fas fa-bars fa-2x"></i></button>');


		$('.tab-show-menu').html('');
		$('.tab-show-menu').html(`
			<button name="show-menu-button" 
			class="show-menu-button blend-button"><i class="fas fa-bars"></i></button>`);

		$('.add-button-tab').html('');
		$('.add-button-tab').html(`
			<input type="button" name="add-button" 
			class="add-button" 
			value="Find a new place">`);

		$('.visited-list').html('');
		$('.visited-list').html(`<input type="button" name="visited-button" 
			class="visited-button" 
			value="Places You've Visited">`)

		$('.back-to-list').html('');
		$('.back-to-list').html(`
			<button class="back-button blend-button">Bucket List</button>`);

		if(onlyVisits) {
				$('.visited-list').addClass('tab-current');
				$('.back-to-list').removeClass('tab-current');
				$('.add-button-tab').removeClass('tab-current');
		} else {
			$('.back-to-list').addClass('tab-current');
			$('.visited-list').removeClass('tab-current');
			$('.add-button-tab').removeClass('tab-current');
		}



		let count = 0;

	 	for (let i = 0; i < userBucketList.places.length; i++) {
		 	let toggle = " ";

		 	if(onlyVisits) {
		 		if(userBucketList.places[i].visited != "true") { 
		 				continue;
		 		}
		 	}

		 	if(!onlyVisits) {
		 		if(userBucketList.places[i].visited == "true") { 
		 				continue;
		 		}
		 	}

		 	count++; 

		 	let backgroundColor = "";

		 	if(count%2) {
		 	 backgroundColor = "lightblue-background"; 
		 	} else {

		 	 backgroundColor = "lighterblue-background"; 
		 	}


		 	if(userBucketList.places[i].visited == "true") {
		 		toggle = "checked";
		 	} else {
		 		toggle = "";
		 	}

		 	let placeName ="";
		 	let tripDate = ""; 
		 	let returningDate	= "";
		 	let notes = "";

		 	if(typeof userBucketList.places[i].place.city != 'undefined') {

		 		if(userBucketList.places[i].place.city != 'undefined') {
		 			placeName = userBucketList.places[i].place.city + ", " + userBucketList.places[i].place.country; 
		 		} else {
		 			placeName = userBucketList.places[i].place.country; 
		 		}

		 	} else {
		 		placeName = userBucketList.places[i].place.country; 
		 	}


		 	if(typeof userBucketList.places[i].departDate != 'undefined' 
		 	&& typeof userBucketList.places[i].departDate != 'null' && userBucketList.places[i].departDate != null) {
		 		tripDate = userBucketList.places[i].departDate;
		 		
		 		//have to convert the date to UTC or else timezones and DST can shift the day by 1. 
			 	let aDate = new Date( tripDate.toString() );
		 		let anotherDate = aDate.getUTCFullYear()+"-"+(aDate.getUTCMonth()+1) +"-" + aDate.getUTCDate(); 
		 		aDate	= new Date( anotherDate);


		 		aDate = aDate.toString().substr(3,13);

		 		
		 		if(onlyVisits) {
		 				tripDate =  '<strong>Traveled there on</strong> '+ aDate;
		 			} else {
		 				tripDate =  '<strong>Traveling there on</strong> '+ aDate;
		 			}


		 	} else {
		 		tripDate = ""; 
		 	}

		 	//Checking to see if the user has added a plan and adjusting messages according;y

		 	if(typeof userBucketList.places[i].returnDate != 'undefined' 
		 	&& typeof userBucketList.places[i].returnDate != 'null' 
		 	&& userBucketList.places[i].returnDate != null) {
		 		returningDate = userBucketList.places[i].returnDate;
		 		let raDate = new Date( returningDate.toString() );
		 		let ranotherDate = raDate.getUTCFullYear()+"-"+(raDate.getUTCMonth()+1) +"-" + raDate.getUTCDate(); 
		 		raDate	= new Date( ranotherDate);
		 		raDate = raDate.toString().substr(3,13);

			 	if(onlyVisits) {
			 		returningDate =  '<strong>Came back on</strong> '+ raDate;

			 	} else {

			 		returningDate =  '<strong>Coming back on</strong> '+ raDate;
			 	}
		 	

		 	} else {
		 		returningDate = ""; 
		 	}

		 	if(typeof userBucketList.places[i].planNotes != 'undefined' 
		 	&& typeof userBucketList.places[i].planNotes != 'null' && userBucketList.places[i].planNotes != '') {
		 		notes = userBucketList.places[i].planNotes;
		 		notes =  '<strong>Things to see:</strong> '+ notes;
		 	} else {
		 		notes = ""; 
		 	}

		 	if(userBucketList.places[i].visited=="false") { 

		 	}

		 	let userListContent = "";
		 	let userListContentReview = "";

			
		 	userListContent = `<div class="bucket-list-item ${backgroundColor} " placeIndex="${i}" >
		  		<div class="row">
        			<div class="col-6">
		  				<div class="check-mark${i} check hide"><i class="far fa-check-circle"></i></div>
		  				<div class="uncheck-mark${i} check"><i class="far fa-circle"></i></div>
		   					<label for="${userBucketList.places[i].locId}" placeIndex="${i}" >${placeName} </label>
		   			</div>
		   			<div class="col-6 text-align-right">
		   				`;

		   			

		   	if(userBucketList.places[i].visited == "false") {
		   					console.log("plan notes", userBucketList.places[i].planNotes);
				if( userBucketList.places[i].departDate != null 
					&& userBucketList.places[i].returnDate != null
					&& userBucketList.places[i].planNotes != " "
					) {
					userListContent += `<button class="btn-plan-${i} button-35-b 
										contrast-color-darker black-text" 
		   								placeIndex="${i}">Edit Trip</button>`;
				}	else {
					userListContent += `
					<button class="btn-plan-${i} button-35-b contrast-color black-text" 
		   				placeIndex="${i}">Plan Trip</button>`
				}	   	 
					
					userListContent += `<button class="checkbox-btn-${i} button-35-b contrast-color black-text" 
					placeIndex="${i}">Been there</button>`;
	
		 	}	

		 	//Since we reuse this code for unvisited and visited, this code checks for the user's reviews
		 	//if we are only showing the visited places

		 	if(onlyVisits) {
		 		let reviewObj = $.grep(userBucketList.places[i].place.reviews, function(robj){return robj.userId === userBucketList.user._id;})[0];
		 		if(!reviewObj) reviewObj = $.grep(userBucketList.places[i].place.reviews, function(robj){return robj.user === userBucketList.user._id;})[0];

		 		console.log("review found:", reviewObj	);

		 		if(reviewObj) {

		 		 userListContentReview = "<p class='complimentary-color-text'>Rating: ";

			   	 if(reviewObj.starRating	> 0) {
			   		for(let iii = 1; iii <= reviewObj.starRating; iii++){
			   			userListContentReview +=`<i class="fas fa-star"></i>`
			   		}
			     }

			   	 userListContentReview +=`</p><p class=""><strong>Review:</strong> ${reviewObj.content}</p> `;

			     }
		 	}	
		   	
		   	userListContent += `
		   	<button class="btn-delete-${i} button-35-b button-trash complimentary-color black-text" 
					placeIndex="${i}"><i class="fas fa-trash-alt"></i></button>
		   	</div>
		   		</div>
		   		<div class = "row">
		   			<div class="col-9">
		   				<p class="">${tripDate}</p> 
		   				<p class="">${returningDate}</p> 
		   				<p class="">${notes}</p>
		   				${userListContentReview} 
		   			</div>
		   		</div>
		   		</div>`;

		  	$('.list-set').append (userListContent);


		  	if(userBucketList.places[i].visited == "true") {
		  		$(`.check-mark${i}`).removeClass('hide');
		  		$(`.uncheck-mark${i}`).addClass('hide');
		  	} 

		  	//INPUT EVENTS for buttons shown on this page

		  	$(`.checkbox-btn-${i}`).click( function(event) {
		  		event.preventDefault();
		  		console.log('checked-i button clicked', userBucketList.places[i]);
		  		let placeIndex = i;
		  		console.log("place ind on client: ", placeIndex);
		  
		  		ratePlaceView(userBucketList.places[i].locId, i);

		  		

	  		});

	  		$(`.btn-plan-${i}`).click( function(event) { 
	  			console.log("clicked plan button", i);
	  			event.preventDefault();

	  			planTripFromBucketListView(i);
	  		});

	  		$(`.btn-delete-${i}`).click( function(event) {

				event.preventDefault();			


			 let placeIndex = parseInt( event.target.closest('button').getAttribute('placeIndex'));
				
		
				
				showModal(`Are you sure you want to delete ${placeName} from your list?`, 'Yes', 'No', 
					function() {
						event.preventDefault();
					 	deletePlace(placeIndex);
							$('.user-list-section').fadeIn(300).removeClass('hide');
				  			$('.search-results').html(" ");
				  			$('.add-section').hide().addClass('hide');
				  			$('.list-set').html("");
				  			$('.back-button').off('click');
				  			//getAndDisplayUserList();  -done as api callback
				  			hideModal();
					}
					, hideModal);


			});


		  	

	 	} //end of for loop over list

	 	console.log("places shown", count);
		
		if(count <=0) {
					$('.list-set').append ("Time to add to your bucket list! Click 'Find a new place' tab to start searching!");
					//add a button
					$('.list-set').append(`<button class="button-35-b complimentary-color black-text add-button" 
					>Find new places!</button>`);
			} 
	 		
		$('.show-menu-button').on('click', function(event) {
			event.preventDefault();
			console.log('clicked drop menu');
	  		showHamburgerMenu(); 
	  	});

	 	

	 	$('.add-button').on('click', function(event) {
	  		event.preventDefault();
	  		console.log("add screen fired"); 

	  		$('.add-button').off('click'); 

	  		showSearchPageView(); 


	  	});

	  	$('.visited-button').on('click', function(event) {
	  		event.preventDefault();
	  		console.log('loading visited list');
	  		$('.visited-button').off('click');
	  		//showUserList(data, true);
	  		getAndDisplayUserListforVisited(); 
	  	})

	  		//-----this back button will reload the user List View
	  	$('.back-button').on('click', function(event) {
		  	event.preventDefault();
		  	console.log('clicked user list button');
		  	$('.user-list-section').fadeIn(300).removeClass('hide');
		  	$('.search-results').html(" ");
		  	$('.add-section').hide().addClass('hide');
		  	$('.list-set').html("");
		  	$('.back-button').off('click');
		  	getAndDisplayUserList();
	    } );

	}

//this view is the page a user can search for and find new places to visit

	function showSearchPageView() {


	$('.hamburger-menu-button-container').html(' ');
		$('.hamburger-menu-button-container').html('<button class="show-menu-button blend-button"><i class="fas fa-bars fa-2x"></i></button>');

		$('.tab-show-menu').html('');
		$('.tab-show-menu').html(`
			<button name="show-menu-button" 
			class="show-menu-button blend-button"><i class="fas fa-bars"></i></button>`);

		$('.add-button-tab').html('');
		$('.add-button-tab').html(`
			<input type="button" name="add-button" 
			class="add-button" 
			value="Find a new place">`);

		$('.visited-list').html('');
		$('.visited-list').html(`<input type="button" name="visited-button" 
			class="visited-button" 
			value="Places You've Visited">`)

		//rebuild button to get rid of old event handlers
		$('.back-to-list').html('');
		$('.back-to-list').html(`
			<button class="back-button blend-button">Bucket List</button>`);

		$('.search-button-container').html('');
		$('.search-button-container').html(`<button name="search-button" 
			class="search-button button-35-b contrast-color" 
			value="Search"><i class="fas fa-search"></i></button>`);
		
		$('.add-button-tab').addClass('tab-current');
		$('.visited-list').removeClass('tab-current');
		$('.back-to-list').removeClass('tab-current');

		$('.search-box').val('');

		getAndDisplayLocationList();

	  	$('.user-list-section').hide().hide().addClass('hide');
	  	$('.add-section').fadeIn(300).removeClass('hide');

	  	$('.search-button').click(function(event) {
	  		event.preventDefault();
	  		console.log("search clicked", $('.search-box').val() );
	  		userSearch($('.search-box').val());
	  	});

	  	$('.show-menu-button').on('click', function(event) {

	  		showHamburgerMenu(); 

	 	 });

	 	$('.add-button').on('click', function(event) {
	  		event.preventDefault();
	  		console.log("add screen fired"); 

	  		$('.add-button').off('click'); 

	  		showSearchPageView(); 

	  	});

	  	$('.visited-button').on('click', function(event) {
	  		event.preventDefault();
	  		console.log('loading visited list');
	  		$('.user-list-section').fadeIn(300).removeClass('hide');
		  	$('.search-results').html(" ");
		  	$('.add-section').hide().addClass('hide');
		  	$('.list-set').html("");
	  		$('.visited-button').off('click');
	  		getAndDisplayUserListforVisited();
	  	})

	  	//-----this back button will reload the user List View
	  	$('.back-button').on('click', function(event) {
		  	event.preventDefault();
		  	$('.user-list-section').fadeIn(300).removeClass('hide');
		  	$('.search-results').html(" ");
		  	$('.add-section').hide().addClass('hide');
		  	$('.list-set').html("");
		  	$('.back-button').off('click');
		  	getAndDisplayUserList();
	    } );

	  	//=== featured 

	}	


	function showHamburgerMenu() {

			if(!menuShowing) {

				$('.hamburger-menu').html(`
					<div class="back-to-listm">
						<button class="back-buttonm blend-button">
							<i class="fas fa-list-alt"></i> Bucket List
						</button>
					</div>
				    <div class="visited-listm">
				    	<button name="visited-button" class="visited-buttonm blend-button" value="Places You've Visited">
				    		<i class="fas fa-map-pin"></i> Places You've Visited
				    	</button>
				    </div>
				    <div class="add-button-tabm">
				    	<button class="add-buttonm blend-button">
				      		<i class="fas fa-search"></i> Find a New Place
				      	</button>
				    </div> 
				    <div class="log-out-m">
				    	<button class="logout-buttonm blend-button">
				     	<i class="fas fa-sign-out-alt"></i> Sign Out
				      	</button>
				    </div>`); 

	 			$('.hamburger-menu').fadeIn(300).removeClass('hide');
	 			//$('.add-button-tab').fadeIn(300).removeClass('hide');
	 			//$('.visited-list').fadeIn(300).removeClass('hide');

	 			menuShowing = true;

	 	$('.logout-buttonm').click(function() { 
			location.reload(); 
		}); 

	 	$('.back-buttonm').on('click', function(event) {
		  	event.preventDefault();
		  	$('.user-list-section').fadeIn(300).removeClass('hide');
		  	$('.search-results').html(" ");
		  	$('.add-section').hide().addClass('hide');
		  	$('.list-set').html("");
		  	$('.back-buttonm').off('click');

		  	$('.hamburger-menu').hide().addClass('hide');
	 			

	 			menuShowing	 = false; 
		  	getAndDisplayUserList();
	    } );

	    $('.visited-buttonm').on('click', function(event) {
	  		event.preventDefault();
	  		console.log('loading visited list');
	  		$('.user-list-section').fadeIn(300).removeClass('hide');
		  	$('.search-results').html(" ");
		  	$('.add-section').hide().addClass('hide');
		  	$('.list-set').html("");
	  		$('.visited-buttonm').off('click');
	  		//showUserList(data, true);

	  		$('.hamburger-menu').hide().addClass('hide');
	 			

	 			menuShowing	 = false; 
	  		getAndDisplayUserListforVisited();
	  	})

	  	$('.add-buttonm').on('click', function(event) {
	  		event.preventDefault();
	  		console.log("add screen fired"); 

	  		$('.add-buttonm').off('click'); 

	  		$('.hamburger-menu').hide().addClass('hide');
	 			

	 			menuShowing	 = false; 

	  		showSearchPageView(); 


	  	});



	 		} else {

	 			$('.hamburger-menu').hide().addClass('hide');
	 			

	 			menuShowing	 = false; 

	 		      }
	}

	//this function will eventually be an ajax call to query the database
	function getLocations (searchTerm, callbackFunction) {

		 getAPIData( callType='GET', data={searchFor:searchTerm}, myToken, myUrl = '/api/place', callbackFunction);


	}

	function showLocationList(data){

		featuredResults = data;

		console.log("locations: ", featuredResults);

		featuredResults = featuredResults.filter(function(placeF) {
			console.log("comparing f: ",placeF);
			return !userBucketList.places.some(function(placeU) {
				
				console.log("comparing u: ", placeU);
	


				return	placeF._id === placeU.place._id;
			});
		});	
		//console.log("locations filterd: ", featuredResults2);

		console.log("locations: ", featuredResults.length	);
		$('.featured-places').html(" ").hide();

		let locationsContent =' '; 

		//'<div class="lightgrey-box-background results-box">';
		//$('.featured-places').append (locationsContent);
			
		for (let i = 0; i < featuredResults.length; i++) {
			let backgroundColor = 'lighterblue-background'; 

			if(i%2) {
				backgroundColor = 'lightblue-background';
			}

		    locationsContent = `<div class="place-result ${backgroundColor} ">
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
			   			 </div>`;

			if(featuredResults[i].reviews.length > 0)
			{
				let totalRating = 0;

					for(let ii = 0; ii < featuredResults[i].reviews.length; ii++ ){

						if(featuredResults[i].reviews[ii].starRating) {
								totalRating += parseInt(featuredResults[i].reviews[ii].starRating);
						}
					
					//console.log("total rating loop", totalRating	);

					}

					//console.log("total rating total", totalRating	);

					totalRating	= totalRating/featuredResults[i].reviews.length; 
					let reviewNumber = Math.floor(Math.random() * Math.floor(featuredResults[i].reviews.length));

			   	locationsContent += `<div class="row">
			   			<div class="col-9">
			   			<p class="complimentary-color-text">Average Rating: `;
			   			//console.log("total rating after divide", totalRating	);
			   	if(totalRating	> 0) {
			   			for(let iii = 1; iii <= totalRating; iii++){
			   				locationsContent +=`<i class="fas fa-star"></i>`
			   			}
			    }

			   	locationsContent +=`</p><p><strong>Review:</strong> ${featuredResults[i].reviews[reviewNumber].username} says "${featuredResults[i].reviews[reviewNumber].content}"</p> 
			   			 </div>
			   		</div>`
			}

		      	 
				locationsContent +=	`</div>`;
		     

			$('.featured-places').append (locationsContent).fadeIn(300);

			//do buttons here
			$(`.add-feat-${i}`).on('click', function(event) {
		  		console.log('add featured button clicked', i);
		  		event.preventDefault();

		  		planTripView(i);

		  	});
		
			
		}

		if(locationsContent == ' ') 
		     {
		     	console.log	('no content');
		     	locationsContent = `<div>
		    						<div class="row">
        							<div class="col-12">No places were found. Try another search! Hint: Type a country name or a big city.
        							</div>
        							</div>`;
		     } else {
		     	locationsContent ='</div>';
		     }

		
		
		$('.featured-places').append (locationsContent).fadeIn(300);



	}

	function planTripView(i) {

		$('.adding-place-options-pop-up').fadeIn(300).removeClass('hide');

		  		let placeAddedName = featuredResults[i].country;

		  		$('.add-plan-button-cont').html(`<button type="submit" 
			class="adding-button blue-background button-95 white-text">Add to list</button>`);

		  		$('.p-close-button').html('<div class="text-align-right"><button class="p-close-window button-35-b complimentary-color">X</button></div>');


		  		if (featuredResults[i].city) {
		  			placeAddedName = featuredResults[i].city+", "+ placeAddedName;
		  		}
		  		$('.place-options-header').html(`Let's plan your trip to ${placeAddedName}!`);
		  			
		  		//make sure the reused modal window values are cleared
		  		$('.departure-date').val(''); 
		  		$('.return-date').val('');
		  		$('.plan-notes').val('');


		  		$('.p-close-window').on('click', function(event) {
        				event.preventDefault();
			  			$(this).off(event);
			  			$('.adding-place-options-pop-up').hide().addClass('hide');
        		})

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
						$('.user-list-section').fadeIn(300).removeClass('hide');
		  				$('.search-results').html(" ");
		  				$('.add-section').hide().addClass('hide');
		  				$('.list-set').html("");
		  				$('.back-button').off('click');
		  				getAndDisplayUserList();
					}, null);

					//reset the listed places ------still need to check suggestion against user list
					$('.featured-places').html(" ");
			  		//getAndDisplayLocationList();
			  		$('.adding-place-options-pop-up').hide().addClass('hide');
			  	});
	}

	function planTripFromBucketListView(i) {

		$('.adding-place-options-pop-up').fadeIn(300).removeClass('hide');

		$('.add-plan-button-cont').html(`<button type="submit" 
			class="adding-button blue-background button-95 white-text">Save Plan</button>`);

             

		  		let placeAddedName = userBucketList.places[i].place.country;

		  		$('.p-close-button').html('<div class="text-align-right"><button class="p-close-window button-35-b complimentary-color">X</button></div>');


		  		if (userBucketList.places[i].city) {
		  			placeAddedName = userBucketList.places[i].place.city+", "+ placeAddedName;
		  		}

		  		$('.place-options-header').html(`Let's plan your trip to ${placeAddedName}!`);

		  		if (userBucketList.places[i].departDate) {
		  			console.log('setting departDate');

		  			$('.departure-date').val(userBucketList.places[i].departDate.toString().substr(0,10)); 
		  		} else {
		  			$('.departure-date').val(''); 
		  		}

		  		if (userBucketList.places[i].returnDate) {

		  			$('.return-date').val(userBucketList.places[i].returnDate.toString().substr(0,10)); 
		  		} else {
		  			$('.return-date').val('');
		  		}

		  		if (userBucketList.places[i].planNotes != '') {

		  			$('.plan-notes').val(userBucketList.places[i].planNotes); 
		  		} else {
		  			$('.plan-notes').val('');
		  		}



		  		$('.p-close-window').on('click', function(event) {
        				event.preventDefault();
			  			$(this).off(event);
			  			$('.adding-place-options-pop-up').hide().addClass('hide');
        		})

		  		$('.adding-button').click(function(event) {
			  		event.preventDefault();
			  		$(this).off(event);

			  		let depDate = $('.departure-date').val();
			  		let retDate = $('.return-date').val();
			  		let planNotes = $('.plan-notes').val();

			  		let location = {
			  		bucketId: userBucketList._id,
			  		placeIndex: i,
		  			departDate: depDate,
		  			returnDate: retDate,
		  			planNotes: planNotes
		  			}

		  	//add a promise here to fire the modal... 
					addPlanToList(location);

					showModal(`You are on your way to ${placeAddedName}!`, 'Ok', null, function() {
						hideModal();
						$('.user-list-section').fadeIn(300).removeClass('hide');
		  				$('.search-results').html(" ");
		  				$('.add-section').hide().addClass('hide');
		  				$('.list-set').html("");
		  				$('.back-button').off('click');
		  				getAndDisplayUserList();
					}, null);

					//reset the listed places ------still need to check suggestion against user list
					$('.featured-places').html(" ");
			  		//getAndDisplayLocationList();
			  		$('.adding-place-options-pop-up').hide().addClass('hide');
			  	});
	}


	function ratePlaceView(locationId, placeInd) {

		$('.rating').off('click');

		let starId = "";
		let ratingCount	= 0;

		if (userBucketList.places[placeInd].departDate) {
		  			console.log('setting departDate');

		  			$('.departure-date2').val(userBucketList.places[placeInd].departDate.toString().substr(0,10)); 
		  		} else {
		  			$('.departure-date2').val(''); 
		  		}

		  		if (userBucketList.places[placeInd].returnDate) {

		  			$('.return-date2').val(userBucketList.places[placeInd].returnDate.toString().substr(0,10)); 
		  		} else {
		  			$('.return-date2').val('');
		  		}

		$('.rating').html(`
							<span class="stars" id="star1" data="1"><i class="far fa-star"></i></span>
							<span class="stars" id="star2" data="2"><i class="far fa-star"></i></span>
							<span class="stars" data="3" id="star3"><i class="far fa-star"></i></span>
							<span class="stars" data="4" id="star4"><i class="far fa-star"></i></span>
							<span class="stars" data="5" id="star5"><i class="far fa-star"></i></span>
		`);	

		$(`.stars`).html('<i class="far fa-star"></i>');
		$('.trip-review').val('');
		$('.review-place-options-pop-up').fadeIn(300).removeClass('hide');

		let headerText = "";
		if (userBucketList.places[placeInd].place.city) {
			headerText	= userBucketList.places[placeInd].place.city;
		}
		headerText	+= " " + userBucketList.places[placeInd].place.country; 
		$('.rp-class-button').html('<div class="text-align-right"><button class="r-close-window button-35-b complimentary-color">X</button></div>');
		$('.review-options-header').html(`How did you like ${headerText}?`);

		$('.rating').on('click', function(event) {
			console.log('rating clicked', headerText);
			ratingCount = parseInt( event.target.closest('span').getAttribute('data'));
			console.log("stars ", ratingCount);

			$(`.stars`).html('<i class="far fa-star"></i>');

			for (let si = 1; si <= ratingCount; si++)
			{

				$(`#star${si}`).html('<i class="fas fa-star"></i>');

			}

		});

		$('.r-close-window').on('click', function(event) {
        		event.preventDefault();
			  	$(this).off(event); 
			  	$('.review-place-options-pop-up').hide().addClass('hide');
        })


		$('.checkit-button').on('click', function(event) {
			
			event.preventDefault();
			//$('.checkit-button').off('click'); 

				if( $('.trip-review').val() == '') {
					console.log("no review was written"); 
					return;
				}

			$(this).off(event);

			console.log('depart date before send:', $('.departure-date').val() );

			let location = {
			  		bucketId: userBucketList._id,
			  		placeIndex: placeInd,
		  			departDate: $('.departure-date2').val(),
		  			returnDate: $('.return-date2').val(),
		  			planNotes: userBucketList.places[placeInd].planNotes
		  			}

		  	
					addPlanToList(location);

			let newReviewdata = {
			locId: userBucketList.places[placeInd].place._id,
			userId: userBucketList.user._id,
			 userName: userBucketList.user.username,
			 content: $('.trip-review').val(),
			 rating: ratingCount
			};

			addReview(newReviewdata); 
			console.log('checking off', placeInd);
			checkOffPlace(placeInd);
			$('.review-place-options-pop-up').hide().addClass('hide');

			showModal(`${headerText} review saved.`, 'Ok', null, hideModal, null);

			//getListofPlaces();

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

		onlyVisits = false;

		getAPIData( callType='GET', data ={}, myToken, myUrl = '/api/bucketlist/', showUserList);

		//getUserList(showUserList);
	}

	function getAndDisplayUserListforVisited() {
		
		onlyVisits	= true;
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

	



	function userSearch(searchTerm) {
		console.log("search for ", searchTerm);
		$('.search-results').html(" ");

		//let searchResultsContent = `<div class="lightgrey-box-background results-box"><ul>`;
		$('.place-results-header').html("Top Search Results");
		getLocations(searchTerm, showLocationList); 

		
		  		
	}

//Called by Plan it button pop-up on User's Bucket List page
	function addPlanToList(location){



	let data = {
			bucketId: location.bucketId,
			placeIndex: location.placeIndex,
			departDate: location.departDate,
		    returnDate: location.returnDate,
		    planNotes: location.planNotes
			};

		data = JSON.stringify(data);

		console.log('data to send:', data);

		getAPIData( callType='PUT', data, myToken, myUrl = '/api/bucketlist/planTrip', function () {
		 	console.log("sent plan update to server ");
		 });	
	
	}

//Called by adding place pop-up on User's Bucket List page
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

		
		if($('.username').val() == '') {

		console.log( "user test failed", $('.username').val() );
			$('.error-text-pass').fadeIn(300).removeClass('hide').animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 ).animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 );
				return;
		 }

		if($('.password').val() == ''){
		 console.log( "pass test failed", $('.password').val() );
		
			$('.error-text-pass').fadeIn(300).removeClass('hide').animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 ).animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 ); 
				return;
		 }

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

	    		//$('.error-text').fadeIn(300).removeClass('hide'); 
	    			$('.error-text-pass').fadeIn(300).removeClass('hide'); 
	    			//username or password were incorrect");
	    		},
	    		400: function() {
	    			//missing a username or password");

	    		//$('.error-text').fadeIn(300).removeClass('hide'); 
	    		$('.error-text-pass').fadeIn(300).removeClass('hide'); 
	    		}
	    	}
			
		 });



	}

	function getAPIData( callType='GET', data ={}, userToken, myUrl = '/api/bucketlist', callback) {
			// show loading modal

			showLoadModal();

		$.ajax({
					 type: callType,
					 data: data,//JSON.stringify(data),
					 beforeSend: function (xhr){ 
					 	console.log(data.authToken);
		        	 xhr.setRequestHeader('Authorization', ('BEARER '+ userToken)); 
		    		 },
					 contentType: 'application/json',
					 url: myUrl
					})					
					 .done( function(data) {
							   console.log('success in getting API');
							   callback(data);
					    	  }) //finally? hide modal 
					 .always( function() {
					 		hideLoadModal();
					 		});
		 			

		/*$.ajax({
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
					    	  }, //finally? hide modal 
					 always: function() {
					 		hideModal();
					 		}
		 			});  */
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
			getAndDisplayUserList();
			});
	}

	function checkOffPlace(_placeIndex) {
		//send a request to the bucket list to change the document entry visited = true
		
		let data= {placeIndex: _placeIndex};
		
		data = JSON.stringify(data);

 
		getAPIData( callType='PUT', data, myToken, myUrl = '/api/bucketlist/checkoff', function () {
			console.log("sent check off update to server ");
			getAndDisplayUserListforVisited();
			});

	}

	function getListofPlaces() {
		
		getAPIData( callType='GET', data ={}, myToken, myUrl = '/api/bucketlist', showUserList);

	}

	function createAccount() {
		console.log('creating account');
		$('.error-text-usepass').hide().addClass('hide');
			if($('.new-username').val() == '') {

		console.log( "user test failed", $('.new-username').val() );
			$('.error-text-usepass').fadeIn(300).removeClass('hide').animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 ).animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 ); 
				return;
		 }

		if($('.new-password').val() == ''){
		 console.log( "pass test failed", $('.new-password').val() );
		
			$('.error-text-usepass').fadeIn(300).removeClass('hide').animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 ).animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 ); 
				return;
		 }

		 if($('.first-name').val() == ''){
		 console.log( "name test failed", $('.first-name').val() );
		
			$('.error-text-usepass').fadeIn(300).removeClass('hide').animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 ).animate({ "padding-left": "+=10px" }, 100 ).animate({ "padding-left": "-=10px" }, 100 ); 
				return;
		 }

		
		let data = {};

		data.username = $('.new-username').val();
		data.password = $('.new-password').val();
		data.firstName = $('.first-name').val();
		data.lastName = $('.last-name').val();
		data.city = $('.city').val();
		data.country =$('.country').val();
		//getAPIData( callType='POST', data, myToken, myUrl = '/api/bucketlist', showUserList);

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

									   $('.create-account-form').hide().addClass('hide');

									   getAPIData( callType='GET', data ={}, myToken, myUrl = '/api/bucketlist/', showUserList);
									}
						});


		  		  	},
		statusCode: { 
						500: function() {
      						//alert( "no user or pass" );
      						$('.error-text-usepass').fadeIn(300).removeClass('hide');
    					},
    					422: function() {
      						//alert( "user taken" );
      						$('.error-text-usertaken').fadeIn(300).removeClass('hide');

    					}
					}

		});
	}

	function welcomePageView() {

	$('.user-list-section').hide().addClass('hide');
	$('.add-section').hide().addClass('hide');

	//input
 	$('.login-form').submit(function(event) {
	    event.preventDefault();
	    login();
	    //$('.join-button-area').hide().addClass('hide');
	  });

 	$('.show-join-button').click(function(event) {
	  	event.preventDefault();
	  	$('.welcome-login').hide().addClass('hide');
		$('.join-button-area').hide().addClass('hide');
	  	$('.create-account-form').fadeIn(300);//removeClass('hide')
	  	
	  
		$('.create-button').click(function(event) {
	    	event.preventDefault();
	    	console.log('create clicked');
	    	createAccount();
	  	});

	  	$('.back-to-login').click(function(event) { 
	  			event.preventDefault();
	  			location.reload(); 

	  	});
	  });

 	


	}

	

	function showModal(text, option1txt,option2txt, affirmCallback, negateCallback) {
		

		/*let modalContent =`<div class="text-align-right">
		<button class="close-window button-35-b complimentary-color">X</button></div>` */

		let modalContent = `<div class="modal-text black-text">${text}</div>`;

        if(option1txt != null) {

            modalContent += `<div class="modal-button-area"><button class="modal-ok-button button-35-b contrast-color">${option1txt}</button>`;
        

	        if(option2txt != null) {
	            modalContent += `<button class="modal-cancel-button button-35-b contrast-color">${option2txt}</button>`;
	        }

	        modalContent += '</div>';
    	}

        

        $('.gen-modal-content').html(modalContent); 

      /*  $('.close-window').on('click', function(event) {
        		event.preventDefault();
			  	$(this).off(event);
			  	hideModal();
        }) */
		
		$('.modal-general-section').fadeIn(300).removeClass('hide'); 

		
			$('.modal-ok-button').fadeIn(300).removeClass('hide'); 

			$('.modal-ok-button').on('click', function(event) {
			  	event.preventDefault();
			  	console.log	('ok button clicked');
			  	$(this).off(event);
			  	affirmCallback();
	    	} );


		if( option2txt != null) {
			$('.modal-cancel-button').fadeIn(300).removeClass('hide'); 
			$('.modal-cancel-button').on('click', function(event) {
			  	event.preventDefault();
			  	$(this).off(event);
			  	negateCallback();
	    	} );
		} else {
			$('.modal-cancel-button').hide().addClass('hide');
			
		}


	}

	function hideModal() {
		$('.modal-general-section').hide().addClass('hide'); 
	}

	function showLoadModal() {
		

		let modalContent = `<div class="modal-text black-text">Loading...<br/><br/><i class="fas fa-spinner fa-pulse fa-3x"></i></div>`;

        
      

        $('.load-modal-content').html(modalContent); 

		
		$('.modal-load-section').removeClass('hide'); 


	}

	function hideLoadModal() {
		$('.modal-load-section').addClass('hide'); 
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
	  		$('.adding-place-options-pop-up').fadeIn(300).removeClass('hide');

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
		  		$('.adding-place-options-pop-up').hide().addClass('hide');
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
	  		$('.adding-place-options-pop-up').fadeIn(300).removeClass('hide');

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
		  		$('.adding-place-options-pop-up').hide().addClass('hide');
		  	});

	  	});

//-----this back button will reload the user List View
	  	$('.back-button').click(function(event) {
	  	event.preventDefault();
	  	$('.user-list-section').fadeIn(300).removeClass('hide');
	  	$('.search-results').html(" ");
	  	$('.add-section').hide().addClass('hide');
	  	$('.list-set').html("");
	  	getAndDisplayUserList();
	    } );




	  });


});
*/