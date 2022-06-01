const axios = require('axios')
const contactEndpoint = ''

/**
 * sendContactDataToVertex 
 * Send the data to vertex so it can be updated
 * @param {Object} companyData - An object containing the data to be sent
 */
 
const sendContactDataToVertex = (dealData) => {
	axios.post(contactEndpoint, dealData)
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
	let formattedData = requestData
	
	return formattedData
	
}

exports.updateContact = (req, res) => {
	let vertexRequestData = formatRequestData(req.body)
	console.log(vertexRequestData)
	
	res.send(vertexRequestData)
}