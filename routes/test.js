/**
 * trident-hubspot-vertex-middleware - test.js
 * @author Kris Bradbury
 */

const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController.js');

router.post('/getContact', testController.getContact);

module.exports = router;
