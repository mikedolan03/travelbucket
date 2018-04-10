// client-side js
/*function getCount() {

/*$.post( '/api/auth/login', 
	{ "username": "jenny", "password": "bob" },
	function(data) {
    $('.user-token').text(data);
  }  
  );*/

/*$.get( '/api/users', function(data) {
    $('.user-token').text(data[0].username);
  }  );
  

//  $.get('/api/auth/login', function(data) {
  //  $('.user-token').text(data);
  //});

$.ajax({
  type: "POST",
  url: '/api/auth/login',
  data: { "username": "jenny", "password": "bob" },
  success: function(data) {
    $('.user-token').text(data);
  },
  dataType: jSON
});

} */

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
  $('.login-form').submit(function(event) {
    event.preventDefault();
    login();
  });
  $('.create-account-form').submit(function(event) {
    event.preventDefault();
    createAccount();
  });

});