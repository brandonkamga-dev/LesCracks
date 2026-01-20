'use strict';
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Créer dossier uploads s'il n'existe pas
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtre : images seulement
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Images only (jpeg, jpg, png, gif, webp)'));
  }
};

// Filtre : documents
const documentFileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt|xls|xlsx|ppt|pptx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype; // Allow any mimetype for documents

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Documents only (pdf, doc, docx, txt, xls, xlsx, ppt, pptx)'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFileFilter
});

const documentUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB for documents
  fileFilter: documentFileFilter
});

// Gestion d'erreur Multer
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Max 5MB.'
      });
    }
  } else if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  next();
};

module.exports = { upload, documentUpload, handleUploadError };