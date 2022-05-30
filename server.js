const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require("morgan")
const rateLimit = require("express-rate-limit");
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(morgan("dev"))

// Rate Limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 500
});

// Get Routes
const Company = require('./routes/company')

// Use the routes!
app.use('/api/v1/company', Company)


const PORT = process.env.PORT || 8080

	const server = app.listen(PORT, () => {
		console.log(`server listening on port ${PORT} ...`)
	})
	
	module.exports = server


