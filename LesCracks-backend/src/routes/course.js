'use strict';
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

// Public
router.get('/', courseController.getAll);
router.get('/:id', courseController.getById);
router.post('/:id/click', courseController.incrementClick);

// Admin only
router.post('/', authenticateToken, validateRequest(schemas.courseCreate), courseController.create);
router.put('/:id', authenticateToken, validateRequest(schemas.courseUpdate), courseController.update);
router.delete('/:id', authenticateToken, courseController.delete);

module.exports = router;