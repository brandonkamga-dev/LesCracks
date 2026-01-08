'use strict';
const { Image } = require('../models');
const fs = require('fs');
const path = require('path');

class UploadController {
  async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      const image = await Image.create({
        image_url: imageUrl,
        file_name: req.file.originalname,
        file_size: req.file.size,
        mime_type: req.file.mimetype
      });

      res.status(201).json({
        success: true,
        data: { image },
        message: 'Image uploaded successfully'
      });
    } catch (error) {
      console.error('Upload error:', error);
      // Supprimer fichier si erreur DB
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async uploadDocument(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      res.status(201).json({
        success: true,
        data: {
          file_url: fileUrl,
          file_name: req.file.originalname,
          file_size: req.file.size,
          mime_type: req.file.mimetype
        },
        message: 'Document uploaded successfully'
      });
    } catch (error) {
      console.error('Upload error:', error);
      // Supprimer fichier si erreur
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new UploadController();
