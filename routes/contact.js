const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/updateContact', contactController.updateContact);

module.exports = router;
