require('dotenv').config();

const axios = require('axios')
const sendTestCompanyRequest = require("../api/companyTestApi")
const companyEndpoint = ''

/**
 * sendCompanyDataToVertex 
 * Send the data to vertex so it can be updated
 * @param {Object} companyData - An object containing the data to be sent
 */
 
const sendCompanyDataToVertex = (companyData) => {
	axios.post(companyEndpoint, companyData)
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.error(error)
	})
}

/**
 * formatRequestData
 * Formats the request form HubSpot into the format needed
 * for Vertex
 *
 * @param {Object} requestData - the request coming from Hubspot
 * @return {Object} formattedData - an object formatted for use in Vertex
 */
const formatRequestData = (requestData) => {
	let formattedData = {}
	formattedData.VertexId = requestData.properties.vertex_id.value
	formattedData.HubSpotId = requestData.objectId
	formattedData.RedFlagId = requestData.properties.company_number.value
	formattedData.Name = requestData.properties.name.value
	formattedData.BusinessDescription =  requestData.properties.about_us.value
	formattedData.Turnover = requestData.properties.annualrevenue.value
	formattedData.AddressLine1 = requestData.properties.address.value
	formattedData.AddressLine2 = requestData.properties.address2.value
	formattedData.AddressLine3 = requestData.properties.address3.value
	formattedData.Town = requestData.properties.city.value
	formattedData.County = requestData.properties.state.value
	formattedData.Country = requestData.properties.country.value
	formattedData.Postcode = requestData.properties.zip.value
	formattedData.AccountManager = requestData.properties.hubspot_owner_accountadmin_id.value
	formattedData.TeleSales = requestData.properties.hubspot_owner_telesales_id.value
	formattedData.FieldSales = requestData.properties.hubspot_owner_fieldsales_id.value
	formattedData.AccountAdministrator = requestData.properties.hubspot_owner_accountadmin_id.value
	formattedData.Engineer = requestData.properties.hubspot_owner_engineer_id.value
	formattedData.Analyst = requestData.properties.hubspot_owner_analyst_id.value
	formattedData.DataAdministrator = requestData.properties.hubspot_owner_dataadmin_id.value
	formattedData.RelationshipManager = requestData.properties.hubspot_owner_relationship_id.value
	
	return formattedData
}

/**
 * updateCompany
 * Sends request to Vertex to update the company
 *
 * @param {Object} req - The request
 * @param {Object} res - The response
 */
exports.updateCompany = (req, res) => {
	
	let vertexRequestData = formatRequestData(req.body)
	console.log(vertexRequestData)
	
	updateCompanyTimeline()
	
	res.send(vertexRequestData)
}