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

var data = {};
data.username = "jenny";
data.password = "bob";

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
		   $('.user-token').text(data.authToken);

		   $.ajax({
			 type: 'POST',
			 data: JSON.stringify({"authToken": data.authToken}),
			 contentType: 'application/json',
			 url: '/api/protected',						
			 success: function(data) {
					   console.log('success in protected');
					   console.log(data);
					   $('.user-token').text(data.authToken);
			    	  }
	
 });

    	  }
	
 });



  }

$(function() {
  //getCount();
  $('form').submit(function(event) {
    event.preventDefault();
    login();
  });

});