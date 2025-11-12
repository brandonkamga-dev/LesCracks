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
router.delete('/:id', authenticateToken, eventController.delete);

module.exports = router;