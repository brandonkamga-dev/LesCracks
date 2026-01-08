const express = require('express');
const router = express.Router();
const VideoCourseController = require('../controllers/videoCourseController');
const { authenticateToken } = require('../middleware/auth');

/**
 * Public Routes
 */

// Get all video courses (public)
router.get('/', VideoCourseController.getAll);

// Get video course by ID (public)
router.get('/:id', VideoCourseController.getById);

/**
 * Admin Routes
 */

// Create new video course (admin only)
router.post('/', authenticateToken, VideoCourseController.create);

// Get video course statistics (admin only)
router.get('/stats/overview', authenticateToken, VideoCourseController.getStats);

// Update video course (admin only)
router.put('/:id', authenticateToken, VideoCourseController.update);

// Add category to video course (admin only)
router.post('/:id/categories', authenticateToken, VideoCourseController.addCategory);

// remove category from video course (admin only)
router.delete('/:id/categories/:categoryId', authenticateToken, VideoCourseController.deleteCategory);

// Add tag to video course (admin only)
router.post('/:id/tags', authenticateToken, VideoCourseController.addTag);

// remove tag from video course (admin only)
router.delete('/:id/tags/:tagId', authenticateToken, VideoCourseController.deleteTag);

// Delete video course (admin only)
router.delete('/:id', authenticateToken, VideoCourseController.remove);

module.exports = router;