require('dotenv').config();

const express = require('express')
const router = express.Router()
const request = require('request-promise-native');
const NodeCache = require('node-cache');
const opn = require('open');
const accessTokenCache = new NodeCache({ deleteOnExpire: true })
const refreshTokenStore = {}
const PORT = process.env.PORT || 8080


/*
	- Install a DB such as Mongo
	- When getting token add it to the DB
	- If token express and needs to be re-issued get updated tokens and     update the DB
	- When making a request get the tokens from the DB and use these to     make request
*/


// Hubspot Configuration
// ------------------------------------- //
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

module.exports = router
