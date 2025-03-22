const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');

// POST /shorten
router.post('/shorten', shortenUrl);

// GET /:shortCode
router.get('/:shortCode', redirectUrl);

module.exports = router;
