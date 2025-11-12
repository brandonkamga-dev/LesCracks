'use strict';
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { upload } = require('../middleware/upload');
const { authenticateToken } = require('../middleware/auth');

// POST /api/upload/image
router.post('/image', authenticateToken, upload.single('image'), uploadController.uploadImage);

module.exports = router;