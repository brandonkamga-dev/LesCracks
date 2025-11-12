'use strict';
const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

// Public
router.get('/', tagController.getAll);
router.get('/:id', tagController.getById);

// Admin only
router.post('/', authenticateToken, validateRequest(schemas.tagCreate), tagController.create);
router.put('/:id', authenticateToken, validateRequest(schemas.tagUpdate), tagController.update);
router.delete('/:id', authenticateToken, tagController.delete);

module.exports = router;