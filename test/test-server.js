const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const {BucketList} = require('../bucketlist/models');
const {User} = require('../users/models');

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

let authTok = '';

chai.use(chaiHttp);



describe('Bucket List Load Page and Log in', function() {

	before(function() {
 		return runServer(TEST_DATABASE_URL);
 	});

 	after(function() {
    	return closeServer();
    });

	it('should serve a static page and return 200', function() {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.have.header('content-type','text/html; charset=UTF-8');
			//console.log(res);
		});
	});


	it('should log in a user and return a token', function() {
		this.timeout(10000);
		let user = {};
		user.username = 'user';
		user.password = 'pass';
			return chai.request(app)
			.post('/api/auth/login')
			.send(user)
			.then(function(res) {
				console.log(req);
				//expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				expect(res.body).to.include.keys('authToken');
				authTok = res.body.authToken; 
				console.log("db", BucketList.db.name); // myDatabase
			})
	});

	describe('BucketList API' , function() { 

		before(function() {
			console.log("-----in logging in-----");

			let user = {
				username: 'user',
				password: 'pass'
			};
			
			return chai.request(app)
			.post('/api/auth/login')
			.send(user)
			.then(function(res) {
				authTok = res.body.authToken;
				console.log("getting auth", authTok );

 
			})
		});

		after(function() {
			//return User.findOne({username: 'user'})
			//.then(function(myuser) {
			//	return BucketList.findOne( {user: myuser._id} )
			//	.then(function(list) {
			//		list.places[1].visited = 'false';
			//	})
			//});
		});

		it('should not allow unauthorized access', function() {

			return chai.request(app)
			.get('/api/bucketlist')
			.then(function(res) {
				//console.log(res);
				expect(res.status).to.equal(401);
				//expect(res.statusMessage).to.equal('Unauthorized');
			})

		});

		it('should add a place to the user list', function() {
			console.log("-----in adding to user list-----");

			this.timeout(10000);

			let newPlaceToAdd = {
			country: 'Argentina',		
			visited: 'false',
			locId: '5add4352f74fb812933cfc88'	
			}

				return chai.request(app)	
					.put('/api/bucketlist')
					.set('Authorization', ('BEARER '+ authTok))
					.send(newPlaceToAdd)
					.then(function(res) { 
						expect(res).to.have.status(200);
						expect(res.body).to.be.a('object');
						return User.findOne({username: 'user'})
						.then(function(myuser) {
							return BucketList.findOne( {user: myuser._id} )
							.then(function(list) { 
								console.log("checking list", list.places);

    							for (var i=0; i < list.places.length; i++) {

        							if (list.places[i].country === 'Argentina') {
            						return true;
        							}

    							}
    							return false;
							} )
							.then(function(found) {
								expect(found).to.be.true;

								BucketList
								.update(
									{user: myuser._id}, 
									{ $pull: {places: {country: 'Argentina' } } },
									{multi: true}
									)
									.then( function(list) {
										console.log("updated", list.places );
									})
							} )	
						})
						.catch( console.log );
						} )
					 

		
		} );

		it('should check off / update db list - place user visited', function() {
			console.log("checking off place in user list");

			this.timeout(10000);
				
			let data= {placeIndex: 1};

			//data = JSON.stringify(data);
					
					return chai.request(app)	
					.put('/api/bucketlist/checkoff')
					.set('Authorization', ('BEARER '+ authTok))
					.send(data)
					.then(function(res) { 
						expect(res).to.have.status(204);
						expect(res.body).to.be.a('object');
						return User.findOne({username: 'user'})
						.then(function(myuser) { 
							return BucketList.findOne( {user: myuser._id} )
							.then(function(list) { 
								expect(list.places[1].visited = 'true');
								return BucketList.findOne( {user: myuser._id} )
								.then(function(list) {
									//console.log("updated with true",list);
								}) 
								
							})
						})

					})
					
		});
						
	});

});

