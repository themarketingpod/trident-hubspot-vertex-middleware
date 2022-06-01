const express = require('express')
const router = express.Router()
const dealController = require('../controllers/dealController')

router.post('/updateDeal', dealController.updateDeal)

module.exports = router