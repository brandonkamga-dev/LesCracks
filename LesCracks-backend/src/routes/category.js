'use strict';
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', categoryController.getAll);

// @route   GET /api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get('/:id', categoryController.getById);

// @route   POST /api/categories
// @desc    Create new category
// @access  Private (admin)
router.post('/', authenticateToken, validateRequest(schemas.categoryCreate), categoryController.create);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private (admin)
router.put('/:id', authenticateToken, validateRequest(schemas.categoryUpdate), categoryController.update);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private (admin)
router.delete('/:id', authenticateToken, categoryController.delete);

module.exports = router;