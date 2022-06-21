const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});

// Use a session to keep track of client ID
app.use(
  session({
    secret: Math.random().toString(36).substring(2),
    resave: false,
    saveUninitialized: true,
  })
);

// Get Routes
// ------------------------------------- //

const Auth = require('./routes/auth');
const Company = require('./routes/company');
const Contact = require('./routes/contact');
const Deal = require('./routes/deal');

// Use the routes!
// ------------------------------------- //

app.use('/auth', Auth);
app.use('/api/v1/company', Company);
app.use('/api/v1/contact', Contact);
// app.use('/api/v1/deal', Deal)

// Run the App!!
// ------------------------------------- //

const server = app.listen(PORT, () => {
  console.log(`server listening on port ${PORT} ...`);
});

module.exports = server;
