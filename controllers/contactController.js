const axios = require('axios')

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