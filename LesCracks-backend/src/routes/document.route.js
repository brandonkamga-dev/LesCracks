const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/documentController');
const { authenticateToken } = require('../middleware/auth');

/**
 * Public Routes
 */

// Get all documents (public)
router.get('/', DocumentController.getAll);

// Get document by ID (public)
router.get('/:id', DocumentController.getById);

/**
 * Admin Routes
 */

// Create new document (admin only)
router.post('/', authenticateToken, DocumentController.create);

// Update document (admin only)
router.put('/:id', authenticateToken, DocumentController.update);

// Add category to document (admin only)
router.post('/:id/categories', authenticateToken, DocumentController.addCategory);

// remove category from document (admin only)
router.delete('/:id/categories/:categoryId', authenticateToken, DocumentController.deleteCategory);

// Add tag to document (admin only)
router.post('/:id/tags', authenticateToken, DocumentController.addTag);

// remove tag from document (admin only)
router.delete('/:id/tags/:tagId', authenticateToken, DocumentController.deleteTag);

// Delete document (admin only)
router.delete('/:id', authenticateToken, DocumentController.remove);

module.exports = router;