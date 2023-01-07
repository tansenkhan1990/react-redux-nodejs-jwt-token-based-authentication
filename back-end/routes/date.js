const express = require('express');
const router = express.Router();
const dateController = require('../controllers/dateController');

router.post('/', dateController.handleDate);

module.exports = router;