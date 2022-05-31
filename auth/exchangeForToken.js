const express = require('express')
const request = require('request-promise-native');
const NodeCache = require('node-cache');

const accessTokenCache = new NodeCache({ deleteOnExpire: true })
const refreshTokenStore = {}

const exchangeForToken = async (userId, exchangeProof) => {

	try {
		const responseBody = await request.post('https://api.hubapi.com/oauth/v1/token', {
				form: exchangeProof
		})
		const tokens = JSON.parse(responseBody)
		refreshTokenStore[userId] = tokens.refresh_token
		accessTokenCache.set(userId, tokens.access_token, Math.round(tokens.expires_in * 0.75));
		console.log('       > Received an access token and refresh token');
		return tokens.access_token;
	} catch (e) {
		console.error(`       > Error exchanging ${exchangeProof.grant_type} for access token`);
		// return JSON.parse(e.response.body);
	}
}

module.exports = exchangeForToken