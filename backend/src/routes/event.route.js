'use strict';
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

router.get('/', eventController.getAll);
router.get('/:id', eventController.getById);
router.post('/:id/click', eventController.incrementClick);

router.post('/', authenticateToken, validateRequest(schemas.eventCreate), eventController.create);
router.put('/:id', authenticateToken, validateRequest(schemas.eventUpdate), eventController.update);

// Add category to event (admin only)
router.post('/:id/categories', authenticateToken, eventController.addCategory);

// remove category from event (admin only)
router.delete('/:id/categories/:categoryId', authenticateToken, eventController.removeCategory);

// Add tag to event (admin only)
router.post('/:id/tags', authenticateToken, eventController.addTag);

// remove tag from event (admin only)
router.delete('/:id/tags/:tagId', authenticateToken, eventController.removeTag);

router.delete('/:id', authenticateToken, eventController.remove);

module.exports = router;