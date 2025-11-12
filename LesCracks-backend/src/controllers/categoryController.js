'use strict';
const { Category } = require('../models');

const categoryController = {
  // GET /api/categories - Lister toutes les catégories
  getAll: async (req, res) => {
    try {
      const categories = await Category.findAll({
        order: [['name', 'ASC']]
      });

      res.json({
        success: true,
        data: { categories },
        message: 'Categories retrieved successfully'
      });
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // GET /api/categories/:id - Détail d'une catégorie
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      res.json({
        success: true,
        data: { category },
        message: 'Category retrieved successfully'
      });
    } catch (error) {
      console.error('Get category error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // POST /api/categories - Créer une catégorie (admin)
  create: async (req, res) => {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Category name is required'
        });
      }

      const category = await Category.create({ name });
      
      res.status(201).json({
        success: true,
        data: { category },
        message: 'Category created successfully'
      });
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // PUT /api/categories/:id - Modifier une catégorie (admin)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Category name is required'
        });
      }

      const [updatedRows] = await Category.update(
        { name },
        { where: { id_category: id } }
      );

      if (updatedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      const updatedCategory = await Category.findByPk(id);
      
      res.json({
        success: true,
        data: { category: updatedCategory },
        message: 'Category updated successfully'
      });
    } catch (error) {
      console.error('Update category error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // DELETE /api/categories/:id - Supprimer une catégorie (admin)
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedRows = await Category.destroy({
        where: { id_category: id }
      });

      if (deletedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      res.json({
        success: true,
        data: { deleted: true },
        message: 'Category deleted successfully'
      });
    } catch (error) {
      console.error('Delete category error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

module.exports = categoryController;