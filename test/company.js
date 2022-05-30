let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let should = chai.should();

chai.use(chaiHttp);

/**
 * Test the 
 */
describe('/POST api/v1/company/updateCompany', () => {
	it('It should post a request to the Vertex API tp update company info', (done) => {
		let company = {
			"properties": {
				"about_us": {
					"value": "Hello I am a test"
				},
				"annualrevenue": {	
				},
				"city": {
				},
				"name": {
				},
				"hubspot_owner_id": {
				},
				"hubspot_owner_telesales_id": {
				},
				"hubspot_owner_fieldsales_id": {
				},
				"hubspot_owner_accountadmin_id": {
				},
				"hubspot_owner_engineer_id": {
				},
				"hubspot_owner_susmanager_id": {
				},
				"hubspot_owner_susengineer_id": {
				},
				"hubspot_owner_analyst_id": {
				},
				"hubspot_owner_dataadmin_id": {
				},
				"hubspot_owner_relationship_id": {
				},
				"country": {
				},
				"state": {
				},
				"description": {
				}
			}
		}
		chai.request(server)
			.post('/api/v1/company/updateCompany')
			.send(company)
			.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
				done();
			});
	});
})
