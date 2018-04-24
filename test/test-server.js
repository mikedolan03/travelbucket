const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

describe('BlogPost API resource', function() { 

 before(function() {
 	return runServer(TEST_DATABASE_URL)
 });

 beforeEach(function() {
  
 });

 afterEach(function() {
   
 });

 after(function() {
   return closeServer();
 });

describe('Landing Page', function() {

	it('should serve a static page and return 200', function() {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.have.header('content-type','text/html; charset=UTF-8');
			//console.log(res);
		});
	});
});

describe ('logging in a user', function() {

	it('should log in a user and return a token', function() {

		let user = {};
		user.username = 'user';
		user.password = 'pass';
			return chai.request(app)
			.post('/api/auth/login')
			.send(user)
			.then(function(res) {
				console.log(res);
				//expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				expect(res.body).to.include.keys('authToken');
				return(res.body.authToken);
			})
	});
});

});