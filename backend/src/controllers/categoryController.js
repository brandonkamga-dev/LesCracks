'use strict';
const { Category } = require('../models');

const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['name', 'ASC']] });

    res.json({
      success: true,
      data: { categories },
      message: 'Categories retrieved successfully'
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({
      success: true,
      data: { category },
      message: 'Category retrieved successfully'
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const category = await Category.create({ name });

    res.status(201).json({
      success: true,
      data: { category },
      message: 'Category created successfully'
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [updated] = await Category.update({ name }, { where: { id_category: id } });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const category = await Category.findByPk(id);

    res.json({
      success: true,
      data: { category },
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.destroy({ where: { id_category: id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({
      success: true,
      data: { deleted: true },
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { getAll, getById, create, update, remove };
