'use strict';
const { Course, Category, Tag, Image, Admin_Course } = require('../models');
const { Op } = require('sequelize');

const courseController = {
  // GET /api/courses - Lister (avec filtres optionnels)
  getAll: async (req, res) => {
    try {
      const { category, tag, search } = req.query;
      const where = {};
      const include = [
        { model: Category, as: 'category', attributes: ['id_category', 'name'] },
        { model: Image, as: 'image', attributes: ['id_image', 'image_url'] },
        { model: Tag, as: 'tags', attributes: ['id_tag', 'name'], through: { attributes: [] } }
      ];

      if (category) where.id_category = category;
      if (search) {
        where[Op.or] = [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ];
      }

      const courses = await Course.findAll({
        where,
        include,
        order: [['id_course', 'DESC']]
      });

      // Filtre par tag après (car many-to-many)
      let filtered = courses;
      if (tag) {
        filtered = courses.filter(c => c.tags.some(t => t.id_tag == tag));
      }

      res.json({
        success: true,
        data: { courses: filtered },
        message: 'Courses retrieved successfully'
      });
    } catch (error) {
      console.error('Get courses error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // GET /api/courses/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id, {
        include: [
          { model: Category, as: 'category' },
          { model: Image, as: 'image' },
          { model: Tag, as: 'tags', through: { attributes: [] } },
          { model: Admin_Course, as: 'admins', include: [{ model: require('../models').Admin, attributes: ['id_admin', 'name'] }] }
        ]
      });

      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }

      res.json({
        success: true,
        data: { course },
        message: 'Course retrieved successfully'
      });
    } catch (error) {
      console.error('Get course error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // POST /api/courses
  create: async (req, res) => {
    const t = await require('../models').sequelize.transaction();
    try {
      const { title, description, youtube_link, id_category, id_image, tagIds = [] } = req.body;
      const adminId = req.admin.id_admin;

      const course = await Course.create({
        title, description, youtube_link, id_category, id_image
      }, { transaction: t });

      // Associer admin
      await Admin_Course.create({
        id_admin: adminId,
        id_course: course.id_course
      }, { transaction: t });

      // Associer tags
      if (tagIds.length > 0) {
        const tags = await Tag.findAll({ where: { id_tag: tagIds } });
        await course.setTags(tags, { transaction: t });
      }

      await t.commit();

      const created = await Course.findByPk(course.id_course, {
        include: ['category', 'image', 'tags']
      });

      res.status(201).json({
        success: true,
        data: { course: created },
        message: 'Course created successfully'
      });
    } catch (error) {
      await t.rollback();
      console.error('Create course error:', error);
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ success: false, message: 'Invalid category or image ID' });
      }
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // PUT /api/courses/:id
  update: async (req, res) => {
    const t = await require('../models').sequelize.transaction();
    try {
      const { id } = req.params;
      const { title, description, youtube_link, id_category, id_image, tagIds } = req.body;

      const course = await Course.findByPk(id);
      if (!course) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Course not found' });
      }

      await course.update({
        title, description, youtube_link, id_category, id_image
      }, { transaction: t });

      if (tagIds !== undefined) {
        const tags = tagIds.length > 0 ? await Tag.findAll({ where: { id_tag: tagIds } }) : [];
        await course.setTags(tags, { transaction: t });
      }

      await t.commit();

      const updated = await Course.findByPk(id, { include: ['category', 'image', 'tags'] });

      res.json({
        success: true,
        data: { course: updated },
        message: 'Course updated successfully'
      });
    } catch (error) {
      await t.rollback();
      console.error('Update course error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // DELETE /api/courses/:id
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Course.destroy({ where: { id_course: id } });

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }

      res.json({
        success: true,
        data: { deleted: true },
        message: 'Course deleted successfully'
      });
    } catch (error) {
      console.error('Delete course error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // POST /api/courses/:id/click
  incrementClick: async (req, res) => {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id);
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }

      await course.increment('click_count', { by: 1 });

      res.json({
        success: true,
        data: { click_count: course.click_count + 1 },
        message: 'Click counted'
      });
    } catch (error) {
      console.error('Increment click error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = courseController;