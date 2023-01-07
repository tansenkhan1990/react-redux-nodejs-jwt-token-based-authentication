const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');

router.get('/', recordsController.handleRecords);

module.exports = router;