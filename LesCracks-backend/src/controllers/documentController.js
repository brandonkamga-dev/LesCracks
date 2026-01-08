/**
 * Document Controller
 * Handles document management
 */

const db = require('../models');
const FileService = require('../services/fileService');

/**
 * Create new document (admin only)
 * POST /api/documents
 */
const create = async (req, res) => {
  try {
    const { title, description, file_url, file_name, file_size, mime_type, id_image, categoryIds, tagIds } = req.body;
    const adminId = req.admin.id_admin;

    if (!title || !file_url) {
      return res.status(400).json({ success: false, message: 'Missing required fields: title, file_url' });
    }

    if (!FileService.validateFileUrl(file_url)) {
      return res.status(400).json({ success: false, message: 'Invalid file URL' });
    }

    if (mime_type && !FileService.validateMimeType(mime_type)) {
      return res.status(400).json({ success: false, message: 'Invalid MIME type' });
    }

    if (file_size && !FileService.validateFileSize(file_size)) {
      return res.status(400).json({ success: false, message: 'File size exceeds maximum allowed size (50MB)' });
    }

    const document = await db.Document.create({
      title,
      description,
      file_url,
      file_name: file_name || FileService.getFileName(file_url),
      file_size,
      mime_type: mime_type || 'application/octet-stream',
      id_image: id_image || null, // No default image
      uploaded_by: adminId,
    });

    if (categoryIds && Array.isArray(categoryIds)) {
      const categories = await db.Category.findAll({ where: { id_category: categoryIds } });
      await document.addCategories(categories);
    }

    if (tagIds && Array.isArray(tagIds)) {
      const tags = await db.Tag.findAll({ where: { id_tag: tagIds } });
      await document.addTags(tags);
    }

    return res.status(201).json({ success: true, message: 'Document created successfully', data: document });
  } catch (error) {
    console.error('Error creating document:', error);
    return res.status(500).json({ success: false, message: 'Error creating document', error: error.message });
  }
};

/**
 * Get all documents (public)
 * GET /api/documents
 */
const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await db.Document.findAndCountAll({
      include: [
        { model: db.Admin, as: 'uploader', attributes: ['id_admin', 'name'] },
        { model: db.Category, as: 'categories', attributes: ['id_category', 'name'], through: { attributes: [] } },
        { model: db.Tag, as: 'tags', attributes: ['id_tag', 'name'], through: { attributes: [] } },
        { model: db.Image, as: 'image', attributes: ['id_image', 'image_url'] },
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: { total: count, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(count / limit) },
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).json({ success: false, message: 'Error fetching documents', error: error.message });
  }
};

/**
 * Get document by ID (public)
 * GET /api/documents/:id
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await db.Document.findByPk(id, {
      include: [
        { model: db.Admin, as: 'uploader', attributes: ['id_admin', 'name', 'email'] },
        { model: db.Category, as: 'categories', attributes: ['id_category', 'name'], through: { attributes: [] } },
        { model: db.Tag, as: 'tags', attributes: ['id_tag', 'name'], through: { attributes: [] } },
        { model: db.Image, as: 'image', attributes: ['id_image', 'image_url'] },
      ],
    });

    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    document.download_count += 1;
    await document.save();

    return res.status(200).json({ success: true, data: document });
  } catch (error) {
    console.error('Error fetching document:', error);
    return res.status(500).json({ success: false, message: 'Error fetching document', error: error.message });
  }
};

/**
 * Update document (admin only)
 * PUT /api/documents/:id
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, file_url, file_name, file_size, mime_type, id_image, categoryIds, tagIds } = req.body;

    const document = await db.Document.findByPk(id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    if (file_url && !FileService.validateFileUrl(file_url)) {
      return res.status(400).json({ success: false, message: 'Invalid file URL' });
    }

    if (mime_type && !FileService.validateMimeType(mime_type)) {
      return res.status(400).json({ success: false, message: 'Invalid MIME type' });
    }

    if (title) document.title = title;
    if (description) document.description = description;
    if (file_url) document.file_url = file_url;
    if (file_name) document.file_name = file_name;
    if (file_size) document.file_size = file_size;
    if (mime_type) document.mime_type = mime_type;
    if (id_image !== undefined) document.id_image = id_image;

    await document.save();

    if (categoryIds !== undefined) await document.setCategories(categoryIds);
    if (tagIds !== undefined) await document.setTags(tagIds);

    return res.status(200).json({ success: true, message: 'Document updated successfully', data: document });
  } catch (error) {
    console.error('Error updating document:', error);
    return res.status(500).json({ success: false, message: 'Error updating document', error: error.message });
  }
};

/**
 * Delete document (admin only)
 * DELETE /api/documents/:id
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await db.Document.findByPk(id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    await FileService.deleteFile(document.file_url);
    await document.destroy();

    return res.status(200).json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({ success: false, message: 'Error deleting document', error: error.message });
  }
};

/**
 * Add category to document (admin only)
 */
const addCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id } = req.body;

    if (!category_id) return res.status(400).json({ success: false, message: 'Missing required field: category_id' });

    const document = await db.Document.findByPk(id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    const category = await db.Category.findByPk(category_id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

    await document.addCategory(category);

    return res.status(200).json({ success: true, message: 'Category added to document successfully' });
  } catch (error) {
    console.error('Error adding category to document:', error);
    return res.status(500).json({ success: false, message: 'Error adding category to document', error: error.message });
  }
};

/**
 * remove category from document (admin only)
 */
const deleteCategory = async (req, res) => {
  try {
    const { id, categoryId } = req.params;
    const document = await db.Document.findByPk(id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    await document.deleteCategory(categoryId);

    return res.status(200).json({ success: true, message: 'Category deleted from document successfully' });
  } catch (error) {
    console.error('Error removing category from document:', error);
    return res.status(500).json({ success: false, message: 'Error removing category from document', error: error.message });
  }
};

/**
 * Add tag to document (admin only)
 */
const addTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag_id } = req.body;

    if (!tag_id) return res.status(400).json({ success: false, message: 'Missing required field: tag_id' });

    const document = await db.Document.findByPk(id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    const tag = await db.Tag.findByPk(tag_id);
    if (!tag) return res.status(404).json({ success: false, message: 'Tag not found' });

    await document.addTag(tag);

    return res.status(200).json({ success: true, message: 'Tag added to document successfully' });
  } catch (error) {
    console.error('Error adding tag to document:', error);
    return res.status(500).json({ success: false, message: 'Error adding tag to document', error: error.message });
  }
};

/**
 * remove tag from document (admin only)
 */
const deleteTag = async (req, res) => {
  try {
    const { id, tagId } = req.params;
    const document = await db.Document.findByPk(id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });

    await document.deleteTag(tagId);

    return res.status(200).json({ success: true, message: 'Tag deleted from document successfully' });
  } catch (error) {
    console.error('Error removing tag from document:', error);
    return res.status(500).json({ success: false, message: 'Error removing tag from document', error: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  addCategory,
  deleteCategory,
  addTag,
  deleteTag,
};
