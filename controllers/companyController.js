const axios = require('axios');


/**
 * updateCompany
 * Sends request to Vertex to update the company
 *
 * @param {Object} req - The request
 * @param {Object} res - The response
 */
exports.updateCompany = (req, res) => {
	
	/*
		Stuff to update:
		
		[] about_us
		[] annualrevenue
		[] city
		[] name
		[] hubspot_owner_id
		[] hubspot_owner_telesales_id
		[] hubspot_owner_fieldsales_id
		[] hubspot_owner_accountadmin_id
		[] hubspot_owner_engineer_id
		[] hubspot_owner_susmanager_id
		[] hubspot_owner_susengineer_id
		[] hubspot_owner_analyst_id
		[] hubspot_owner_dataadmin_id
		[] hubspot_owner_relationship_id
		[] country
		[] state
		[] description
		 
	*/
	
	let message = req.body.properties
	
	res.send(message)
}