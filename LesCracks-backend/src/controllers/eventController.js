'use strict';
const { Event, Category, Tag, Image, Admin_Event } = require('../models');
const { Op } = require('sequelize');

const eventController = {
  // GET /api/events
  getAll: async (req, res) => {
    try {
      const { category, tag, search, date } = req.query;
      const where = {};
      const include = [
        { model: Category, as: 'category', attributes: ['id_category', 'name'] },
        { model: Image, as: 'image', attributes: ['id_image', 'image_url'] },
        { model: Tag, as: 'tags', attributes: ['id_tag', 'name'], through: { attributes: [] } }
      ];

      if (category) where.id_category = category;
      if (date) where.date = date;
      if (search) {
        where[Op.or] = [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ];
      }

      const events = await Event.findAll({
        where,
        include,
        order: [['date', 'DESC'], ['time', 'DESC']]
      });

      let filtered = events;
      if (tag) {
        filtered = events.filter(e => e.tags.some(t => t.id_tag == tag));
      }

      res.json({
        success: true,
        data: { events: filtered },
        message: 'Events retrieved successfully'
      });
    } catch (error) {
      console.error('Get events error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // GET /api/events/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id, {
        include: [
          { model: Category, as: 'category' },
          { model: Image, as: 'image' },
          { model: Tag, as: 'tags', through: { attributes: [] } }
        ]
      });

      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      res.json({
        success: true,
        data: { event },
        message: 'Event retrieved successfully'
      });
    } catch (error) {
      console.error('Get event error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // POST /api/events
  create: async (req, res) => {
    const t = await require('../models').sequelize.transaction();
    try {
      const {
        title, description, date, time, location,
        id_category, id_image, tagIds = []
      } = req.body;
      const adminId = req.admin.id_admin;

      const event = await Event.create({
        title, description, date, time, location, id_category, id_image
      }, { transaction: t });

      await Admin_Event.create({
        id_admin: adminId,
        id_event: event.id_event
      }, { transaction: t });

      if (tagIds.length > 0) {
        const tags = await Tag.findAll({ where: { id_tag: tagIds } });
        await event.setTags(tags, { transaction: t });
      }

      await t.commit();

      const created = await Event.findByPk(event.id_event, {
        include: ['category', 'image', 'tags']
      });

      res.status(201).json({
        success: true,
        data: { event: created },
        message: 'Event created successfully'
      });
    } catch (error) {
      await t.rollback();
      console.error('Create event error:', error);
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ success: false, message: 'Invalid category or image ID' });
      }
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // PUT /api/events/:id
  update: async (req, res) => {
    const t = await require('../models').sequelize.transaction();
    try {
      const { id } = req.params;
      const { title, description, date, time, location, id_category, id_image, tagIds } = req.body;

      const event = await Event.findByPk(id);
      if (!event) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      await event.update({
        title, description, date, time, location, id_category, id_image
      }, { transaction: t });

      if (tagIds !== undefined) {
        const tags = tagIds.length > 0 ? await Tag.findAll({ where: { id_tag: tagIds } }) : [];
        await event.setTags(tags, { transaction: t });
      }

      await t.commit();

      const updated = await Event.findByPk(id, { include: ['category', 'image', 'tags'] });

      res.json({
        success: true,
        data: { event: updated },
        message: 'Event updated successfully'
      });
    } catch (error) {
      await t.rollback();
      console.error('Update event error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // DELETE /api/events/:id
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Event.destroy({ where: { id_event: id } });

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      res.json({
        success: true,
        data: { deleted: true },
        message: 'Event deleted successfully'
      });
    } catch (error) {
      console.error('Delete event error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // POST /api/events/increment/:id/click
  incrementClick: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      await event.increment('click_count', { by: 1 });

      res.json({
        success: true,
        data: { click_count: event.click_count + 1 },
        message: 'Click counted'
      });
    } catch (error) {
      console.error('Increment click error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = eventController;