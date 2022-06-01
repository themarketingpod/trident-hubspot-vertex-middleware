require('dotenv').config();

const express = require('express')
const router = express.Router()
const request = require('request-promise-native');
const NodeCache = require('node-cache');
const opn = require('open');


const accessTokenCache = new NodeCache({ deleteOnExpire: true })
const refreshTokenStore = {}

const PORT = process.env.PORT || 8080

const exchangeForToken = require('../auth/exchangeForToken');



// Hubspot Configuration
// ------------------------------------- //
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

let SCOPES = []

if (process.env.SCOPE) {
	SCOPES = (process.env.SCOPE.split(/ |, ?|%20/)).join(' ')
	console.log(SCOPES)
}

const REDIRECT_URI = `http://localhost:${PORT}/auth/oauth-callback`

const authUrl = 
	'https://app.hubspot.com/oauth/authorize' +
	`?client_id=${encodeURIComponent(CLIENT_ID)}` + 
	`&scope=${encodeURIComponent(SCOPES)}` + 
	`&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`



// OAuth flow
// ------------------------------------- //
const refreshAccessToken = async (userId) => {
	const refreshTokenProof = {
		grant_type: 'refresh_token',
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		redirect_uri: REDIRECT_URI,
		refresh_token: refreshTokenStore[userId]
	};
	return await exchangeForTokens(userId, refreshTokenProof);
};

const getAccessToken = async (userId) => {
	// If the access token has expired, retrieve
	// a new one using the refresh token
	if (!accessTokenCache.get(userId)) {
		console.log('Refreshing expired access token');
		await refreshAccessToken(userId);
	}
	return accessTokenCache.get(userId);
};

// Routes
// ------------------------------------- //
router.get('/install', (req, res) => {
	res.redirect(authUrl)
})

router.get('/oauth-callback', async(req, res) => {
	if (req.query.code) {		
		const authCodeProof = {
			grant_type: 'authorization_code',
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			redirect_uri: REDIRECT_URI,
			code: req.query.code
		};
		
		const tokens = await exchangeForToken(req.sessionID, authCodeProof)
		
		console.log(tokens)
		 
		refreshTokenStore[req.sessionID] = tokens.refresh_token
		accessTokenCache.set(req.sessionID, tokens.access_token, Math.round(tokens.expires_in * 0.75)); 
		
		if (tokens.message) {
			return res.redirect(`/error?msg=${token.message}`);
		}
		 
		console.log(refreshTokenStore)
		
	}
})

const isAuthorized = (userId) => {
	console.log(userId)
	console.log(refreshTokenStore)
	return refreshTokenStore[userId] ? true : false;
};


router.get('/api-test', async (req, res) => {
	
	if (isAuthorized(req.sessionID)) {
		console.log('here')
		const accessToken = await getAccessToken(req.sessionID);
		const contact = await getContact(accessToken);
		res.write(`<h4>Access token: ${accessToken}</h4>`);
		displayContactName(res, contact);
	} else {
		res.write(`<a href="/install"><h3>Install the app</h3></a>`);
	}
	res.end();
})

module.exports = router
