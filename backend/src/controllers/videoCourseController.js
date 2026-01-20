/**
 * VideoCourse Controller
 * Handles video course management
 */

const db = require('../models');
const FileService = require('../services/fileService');

class VideoCourseController {
  /**
   * Create new video course (admin only)
   * POST /api/videoCourses
   */
  async create(req, res) {
    try {
      const { title, description, video_url, id_image } = req.body;
      const adminId = req.admin.id_admin;

      // Validate required fields
      if (!title || !video_url) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: title, video_url',
        });
      }

      // Validate video URL
      if (!FileService.validateVideoUrl(video_url)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid video URL. Must be a valid YouTube URL',
        });
      }

      // Create video course
      const videoCourse = await db.VideoCourse.create({
        title,
        description,
        video_url,
        id_image: id_image || null, // No default image
        uploaded_by: adminId,
      });

      return res.status(201).json({
        success: true,
        message: 'Video course created successfully',
        data: videoCourse,
      });
    } catch (error) {
      console.error('Error creating video course:', error);
      return res.status(500).json({
        success: false,
        message: 'Error creating video course',
        error: error.message,
      });
    }
  }

  /**
   * Get all video courses (public)
   * GET /api/videoCourses
   */
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const offset = (page - 1) * limit;

      const { count, rows } = await db.VideoCourse.findAndCountAll({
        include: [
          {
            model: db.Admin,
            as: 'uploader',
            attributes: ['id_admin', 'name'],
          },
          {
            model: db.VideoCourseCategory,
            as: 'categories',
            attributes: ['id_video_course_category', 'name'],
            through: { attributes: [] },
          },
          {
            model: db.VideoCourseTag,
            as: 'tags',
            attributes: ['id_video_course_tag', 'name'],
            through: { attributes: [] },
          },
          {
            model: db.Image,
            as: 'image',
            attributes: ['id_image', 'image_url'],
          },
        ],
        order: [['created_at', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return res.status(200).json({
        success: true,
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      console.error('Error fetching video courses:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching video courses',
        error: error.message,
      });
    }
  }

  /**
   * Get video course by ID (public)
   * GET /api/videoCourses/:id
   */
  async getById(req, res) {
    try {
      const { id } = req.params;

      const videoCourse = await db.VideoCourse.findByPk(id, {
        include: [
          {
            model: db.Admin,
            as: 'uploader',
            attributes: ['id_admin', 'name', 'email'],
          },
          {
            model: db.VideoCourseCategory,
            as: 'categories',
            attributes: ['id_video_course_category', 'name'],
            through: { attributes: [] },
          },
          {
            model: db.VideoCourseTag,
            as: 'tags',
            attributes: ['id_video_course_tag', 'name'],
            through: { attributes: [] },
          },
          {
            model: db.Image,
            as: 'image',
            attributes: ['id_image', 'image_url'],
          },
        ],
      });

      if (!videoCourse) {
        return res.status(404).json({
          success: false,
          message: 'Video course not found',
        });
      }

      // Increment click count
      videoCourse.click_count += 1;
      await videoCourse.save();

      return res.status(200).json({
        success: true,
        data: videoCourse,
      });
    } catch (error) {
      console.error('Error fetching video course:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching video course',
        error: error.message,
      });
    }
  }

  /**
   * Update video course (admin only)
   * PUT /api/videoCourses/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, video_url, id_image } = req.body;

      const videoCourse = await db.VideoCourse.findByPk(id);

      if (!videoCourse) {
        return res.status(404).json({
          success: false,
          message: 'Video course not found',
        });
      }

      // Validate new video URL if provided
      if (video_url && !FileService.validateVideoUrl(video_url)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid video URL. Must be a valid YouTube URL',
        });
      }

      // Update fields
      if (title) videoCourse.title = title;
      if (description) videoCourse.description = description;
      if (video_url) videoCourse.video_url = video_url;
      if (id_image !== undefined) videoCourse.id_image = id_image;

      await videoCourse.save();

      return res.status(200).json({
        success: true,
        message: 'Video course updated successfully',
        data: videoCourse,
      });
    } catch (error) {
      console.error('Error updating video course:', error);
      return res.status(500).json({
        success: false,
        message: 'Error updating video course',
        error: error.message,
      });
    }
  }

  /**
   * Delete video course (admin only)
   * DELETE /api/videoCourses/:id
   */
  async remove(req, res) {
    try {
      const { id } = req.params;

      const videoCourse = await db.VideoCourse.findByPk(id);

      if (!videoCourse) {
        return res.status(404).json({
          success: false,
          message: 'Video course not found',
        });
      }

      // Delete video course
      await videoCourse.destroy();

      return res.status(200).json({
        success: true,
        message: 'Video course deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting video course:', error);
      return res.status(500).json({
        success: false,
        message: 'Error deleting video course',
        error: error.message,
      });
    }
  }

  /**
   * Add category to video course (admin only)
   * POST /api/videoCourses/:id/categories
   */
  async addCategory(req, res) {
    try {
      const { id } = req.params;
      const { category_id } = req.body;

      if (!category_id) {
        return res.status(400).json({
          success: false,
          message: 'Missing required field: category_id',
        });
      }

      const videoCourse = await db.VideoCourse.findByPk(id);

      if (!videoCourse) {
        return res.status(404).json({
          success: false,
          message: 'Video course not found',
        });
      }

      // Check if category exists
      const category = await db.VideoCourseCategory.findByPk(category_id);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }

      // Add category
      await videoCourse.addCategory(category);

      return res.status(200).json({
        success: true,
        message: 'Category added to video course successfully',
      });
    } catch (error) {
      console.error('Error adding category to video course:', error);
      return res.status(500).json({
        success: false,
        message: 'Error adding category to video course',
        error: error.message,
      });
    }
  }

  /**
   * remove category from video course (admin only)
   * DELETE /api/videoCourses/:id/categories/:categoryId
   */
  async deleteCategory(req, res) {
    try {
      const { id, categoryId } = req.params;

      const videoCourse = await db.VideoCourse.findByPk(id);

      if (!videoCourse) {
        return res.status(404).json({
          success: false,
          message: 'Video course not found',
        });
      }

      // remove category
      await videoCourse.deleteCategory(categoryId);

      return res.status(200).json({
        success: true,
        message: 'Category deleted from video course successfully',
      });
    } catch (error) {
      console.error('Error removing category from video course:', error);
      return res.status(500).json({
        success: false,
        message: 'Error removing category from video course',
        error: error.message,
      });
    }
  }

  /**
   * Add tag to video course (admin only)
   * POST /api/videoCourses/:id/tags
   */
  async addTag(req, res) {
    try {
      const { id } = req.params;
      const { tag_id } = req.body;

      if (!tag_id) {
        return res.status(400).json({
          success: false,
          message: 'Missing required field: tag_id',
        });
      }

      const videoCourse = await db.VideoCourse.findByPk(id);

      if (!videoCourse) {
        return res.status(404).json({
          success: false,
          message: 'Video course not found',
        });
      }

      // Check if tag exists
      const tag = await db.VideoCourseTag.findByPk(tag_id);

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: 'Tag not found',
        });
      }

      // Add tag
      await videoCourse.addTag(tag);

      return res.status(200).json({
        success: true,
        message: 'Tag added to video course successfully',
      });
    } catch (error) {
      console.error('Error adding tag to video course:', error);
      return res.status(500).json({
        success: false,
        message: 'Error adding tag to video course',
        error: error.message,
      });
    }
  }

  /**
   * remove tag from video course (admin only)
   * DELETE /api/videoCourses/:id/tags/:tagId
   */
  async deleteTag(req, res) {
    try {
      const { id, tagId } = req.params;

      const videoCourse = await db.VideoCourse.findByPk(id);

      if (!videoCourse) {
        return res.status(404).json({
          success: false,
          message: 'Video course not found',
        });
      }

      // remove tag
      await videoCourse.deleteTag(tagId);

      return res.status(200).json({
        success: true,
        message: 'Tag deleted from video course successfully',
      });
    } catch (error) {
      console.error('Error removing tag from video course:', error);
      return res.status(500).json({
        success: false,
        message: 'Error removing tag from video course',
        error: error.message,
      });
    }
  }

  /**
   * Get video course statistics (admin only)
   * GET /api/videoCourses/stats/overview
   */
  async getStats(req, res) {
    try {
      const total = await db.VideoCourse.count();
      const totalClicks = await db.VideoCourse.sum('click_count');

      const topVideoCourses = await db.VideoCourse.findAll({
        order: [['click_count', 'DESC']],
        limit: 5,
        attributes: ['id_video_course', 'title', 'click_count'],
      });

      return res.status(200).json({
        success: true,
        data: {
          total,
          totalClicks: totalClicks || 0,
          topVideoCourses,
        },
      });
    } catch (error) {
      console.error('Error fetching video course statistics:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching video course statistics',
        error: error.message,
      });
    }
  }
}

module.exports = new VideoCourseController();