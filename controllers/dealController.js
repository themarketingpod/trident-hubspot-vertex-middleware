require('dotenv').config();

const axios = require('axios')
const dealEndpoint = ''

/**
 * sendDealDataToVertex 
 * Send the data to vertex so it can be updated
 * @param {Object} companyData - An object containing the data to be sent
 */
 
const sendDealDataToVertex = (dealData) => {
	axios.post(dealEndpoint, dealData)
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
	
	return formattedData
}

/**
 * updatDeal
 * Sends request to Vertex to update the deal
 *
 * @param {Object} req - The request
 * @param {Object} res - The response
 */
exports.updateDeal = (req, res) => {
	
	let vertexRequestData = formatRequestData(req.body)
	sendDealDataToVertex(vertexRequestData)
	
	res.send(vertexRequestData)
}