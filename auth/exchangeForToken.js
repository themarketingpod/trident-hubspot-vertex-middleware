const express = require('express')
const request = require('request-promise-native');
const NodeCache = require('node-cache');



const exchangeForToken = async (userId, exchangeProof) => {

	try {
		
		const responseBody = await request.post('https://api.hubapi.com/oauth/v1/token', {
				form: exchangeProof
		})
		
		const tokens = JSON.parse(responseBody)
		return tokens;
		
	} catch (e) {
		console.error(`       > Error exchanging ${exchangeProof.grant_type} for access token`);
		// return JSON.parse(e.response.body);
	}
}

module.exports = exchangeForToken