'use strict';
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

/**
 * Login Admin
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isValidPassword = await admin.verifyPassword(password);
    if (!isValidPassword) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    const token = jwt.sign(
      { id_admin: admin.id_admin, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      data: { token, admin: { id_admin: admin.id_admin, name: admin.name, email: admin.email } },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Register new Admin
 */
const register = async (req, res) => {
  try {
    if (process.env.ALLOW_ADMIN_REGISTRATION !== 'true') {
      return res.status(403).json({ success: false, message: 'Admin registration is disabled' });
    }

    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) return res.status(400).json({ success: false, message: 'Email already in use' });

    const admin = await Admin.create({ name, email, password });

    res.status(201).json({
      success: true,
      data: { id_admin: admin.id_admin, name: admin.name, email: admin.email },
      message: 'Admin registered successfully'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Get current admin info
 */
const me = async (req, res) => {
  try {
    const admin = req.admin;
    if (!admin) return res.status(401).json({ success: false, message: 'User not authenticated' });

    res.json({
      success: true,
      data: { admin: { id_admin: admin.id_admin, name: admin.name, email: admin.email } },
      message: 'Admin info retrieved successfully'
    });
  } catch (error) {
    console.error('Get admin info error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Update admin info
 */
const update = async (req, res) => {
  try {
    const admin = req.admin;
    const { name, email, password } = req.body;

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (password) admin.password = password;

    await admin.save();

    res.json({
      success: true,
      data: { id_admin: admin.id_admin, name: admin.name, email: admin.email },
      message: 'Admin updated successfully'
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Logout (client-side)
 */
const logout = (req, res) => {
  res.json({ success: true, message: 'Logout successful' });
};

/**
 * Verify JWT token
 */
const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ success: false, message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token manquant' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id_admin, { attributes: ['id_admin', 'name', 'email'] });

    if (!admin) return res.status(401).json({ success: false, message: 'Utilisateur non trouvé' });

    res.json({ success: true, data: { admin }, message: 'Token valide' });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
  }
};

module.exports = {
  login,
  register,
  me,
  update,
  logout,
  verifyToken,
};
