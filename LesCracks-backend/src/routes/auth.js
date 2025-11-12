'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest, schemas } = require('../middleware/validation');

// @route   POST /api/auth/login
// @desc    Login Admin
// @access  Public
router.post('/login', validateRequest(schemas.adminLogin), authController.login);

// @route   POST /api/auth/register
// @desc    Register a new Admin
// @access  Private
router.post('/register', validateRequest(schemas.adminRegister), authController.register);

// @route   GET /api/auth/me
// @desc    Get current admin info
// @access  Private
router.get('/me', authenticateToken, authController.me);

// @route   PUT /api/auth/update
// @desc    Update admin info
// @access  Private
router.put('/update', authenticateToken, validateRequest(schemas.adminUpdate), authController.update);

// @route   POST /api/auth/logout
// @desc    Logout
// @access  Private
router.post('/logout', authenticateToken, authController.logout);

// @route   GET /api/auth/verify
// @desc    Verify
// @access  Private
router.get('/verify', authenticateToken, authController.verifyToken);


module.exports = router;


