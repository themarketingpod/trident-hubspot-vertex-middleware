/**
 * trident-hubspot-vertex-middleware - company.js
 * @author Kris Bradbury
 */

const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController.js');

router.post('/updateCompany', companyController.updateCompany);

module.exports = router;
