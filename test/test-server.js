const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

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
				//console.log(res);
				//expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				expect(res.body).to.include.keys('authToken');
			})
			.catch(function(err) {
				console.log(err);
			} )
	});

	it('should add a place to the user list', function() {
		this.timeout(10000);

		let newPlaceToAdd = {
		country: 'Argentina',		
		visited: 'false',
		locId: '5add4352f74fb812933cfc88'	
		}

		return chai.request(app)
		.post('/')
		.send(newPlaceToAdd)
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res.body).to.be.a('object');
		})
		.catch(function(err){ 
			console.log(err);

		})

	} )


});

