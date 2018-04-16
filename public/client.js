
var USER_LIST = {
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

	]

}

var LOCATIONS = {
	"locations" : [
		{
			"locId": "12345", 
			"country": "Spain",
			"city":"Barcelona",
			"reviews" : [
				{
					"userId": "468", 
					"content" : "Epic trip!",
					"starRating" : "5"
				},
				{
					"userId": "357", 
					"content" : "Great food.",
					"starRating" : "4"
				}
			]
		},
		{
			"locId": "123456",
			"country": "USA",
			"city":"New York",
			"reviews" : [
				{
					"userId": "123", 
					"content" : "great place",
					"starRating" : "3"
				},
				{
					"userId": "321", 
					"content" : "cool scene",
					"starRating" : "4"
				}
			]
		},
		{
			"country": "Peru",
			"city":"Lima",
			"reviews" : [
				{
					"userId": "567", 
					"content" : "great architecture",
					"starRating" : "5"
				},
				{
					"userId": "789", 
					"content" : "second dryest world capital!",
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

 $('body').append ('<ul>');
	
 for (let i = 0; i < data.userList.length; i++) {
	$('body').append (
	'<li>' +data.userList[i].city + ' ' + data.userList[i].country + '</li>');
 }

 $('body').append ('</ul>');


}

function getAndDisplayUserList() {

	getUserList(showUserList);
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

  $('.login-form').submit(function(event) {
    event.preventDefault();
    login();
  });
  $('.create-account-form').submit(function(event) {
    event.preventDefault();
    createAccount();
  });

});