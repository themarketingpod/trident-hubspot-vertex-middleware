require('dotenv').config();

const express = require('express')
const router = express.Router()
const request = require('request-promise-native');
const NodeCache = require('node-cache');
const opn = require('open');


const accessTokenCache = new NodeCache({ deleteOnExpire: true })

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


// Routes
// ------------------------------------- //
router.get('/install', (req, res) => {
	res.redirect(authUrl)
})

router.get('/oauth-callback', async(req, res) => {
	console.log('===> Step 3: Handling the request sent by the server');
	
	if (req.query.code) {		
		const authCodeProof = {
			grant_type: 'authorization_code',
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			redirect_uri: REDIRECT_URI,
			code: req.query.code
		};
		
		const token = await exchangeForToken(req.sessionID, authCodeProof)
		
		console.log('===> Step 4: Exchanging authorization code for an access token and refresh token');
		
		
	}
})

module.exports = router
