'use strict';
const { Tag } = require('../models');

const tagController = {
  // GET /api/tags - Lister tous les tags
  getAll: async (req, res) => {
    try {
      const tags = await Tag.findAll({
        order: [['name', 'ASC']]
      });

      res.json({
        success: true,
        data: { tags },
        message: 'Tags retrieved successfully'
      });
    } catch (error) {
      console.error('Get tags error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // GET /api/tags/:id - Détail
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const tag = await Tag.findByPk(id);

      if (!tag) {
        return res.status(404).json({ success: false, message: 'Tag not found' });
      }

      res.json({
        success: true,
        data: { tag },
        message: 'Tag retrieved successfully'
      });
    } catch (error) {
      console.error('Get tag error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // POST /api/tags - Créer (admin)
  create: async (req, res) => {
    try {
      const { name } = req.body;

      const tag = await Tag.create({ name });

      res.status(201).json({
        success: true,
        data: { tag },
        message: 'Tag created successfully'
      });
    } catch (error) {
      console.error('Create tag error:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ success: false, message: 'Tag name already exists' });
      }
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // PUT /api/tags/:id - Modifier (admin)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const [updated] = await Tag.update(
        { name },
        { where: { id_tag: id } }
      );

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Tag not found' });
      }

      const updatedTag = await Tag.findByPk(id);

      res.json({
        success: true,
        data: { tag: updatedTag },
        message: 'Tag updated successfully'
      });
    } catch (error) {
      console.error('Update tag error:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ success: false, message: 'Tag name already exists' });
      }
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // DELETE /api/tags/:id - Supprimer (admin)
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Tag.destroy({ where: { id_tag: id } });

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Tag not found' });
      }

      res.json({
        success: true,
        data: { deleted: true },
        message: 'Tag deleted successfully'
      });
    } catch (error) {
      console.error('Delete tag error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = tagController;