const express = require('express')
const router = express.Router()

const {getAllTransactions} = require('../controllers/finances')

router.get('/', getAllTransactions);

module.exports = router