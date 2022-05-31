let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let should = chai.should();
let testCompanyJson = require('../assets/json/company.json')

chai.use(chaiHttp);

/**
 * Test the request
 */
describe('/POST api/v1/company/updateCompany', () => {
	it('It should post a request to the Vertex API to update company info', (done) => {
		let company = testCompanyJson
		
		chai.request(server)
			.post('/api/v1/company/updateCompany')
			.send(company)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.include('success')
			done();
			});
	});
})
