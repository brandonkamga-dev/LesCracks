'use strict';
const { Tag } = require('../models');

const getAll = async (req, res) => {
  try {
    const tags = await Tag.findAll({ order: [['name', 'ASC']] });

    res.json({
      success: true,
      data: { tags },
      message: 'Tags retrieved successfully'
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ success: false, message: 'Tag not found' });

    res.json({ success: true, data: { tag }, message: 'Tag retrieved successfully' });
  } catch (error) {
    console.error('Get tag error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const create = async (req, res) => {
  try {
    const tag = await Tag.create({ name: req.body.name });

    res.status(201).json({
      success: true,
      data: { tag },
      message: 'Tag created successfully'
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Tag name already exists' });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const update = async (req, res) => {
  try {
    const [updated] = await Tag.update(
      { name: req.body.name },
      { where: { id_tag: req.params.id } }
    );

    if (!updated) return res.status(404).json({ success: false, message: 'Tag not found' });

    const tag = await Tag.findByPk(req.params.id);

    res.json({ success: true, data: { tag }, message: 'Tag updated successfully' });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Tag name already exists' });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await Tag.destroy({ where: { id_tag: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Tag not found' });

    res.json({ success: true, data: { deleted: true }, message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Delete tag error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { getAll, getById, create, update, remove };
