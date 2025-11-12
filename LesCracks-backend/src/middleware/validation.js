'use strict';
const Joi = require('joi');

// =========================
// SCHEMAS
// =========================
const schemas = {
  // === ADMIN ===
  adminRegister: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'any.required': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 100 characters'
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Invalid email format'
    }),
    password: Joi.string().min(8).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters'
    })
  }),

  adminLogin: Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Invalid email format'
    }),
    password: Joi.string().min(8).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters'
    })
  }),

  adminUpdate: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).optional()
  }),

  // === CATEGORY ===
  categoryCreate: Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
      'any.required': 'Category name is required',
      'string.min': 'Category name must be at least 2 characters',
      'string.max': 'Category name cannot exceed 100 characters'
    })
  }),

  categoryUpdate: Joi.object({
    name: Joi.string().trim().min(2).max(100).optional().messages({
      'string.min': 'Category name must be at least 2 characters',
      'string.max': 'Category name cannot exceed 100 characters'
    }),
    id_category: Joi.number().integer().positive().optional()
  }),

  // === TAG ===
  tagCreate: Joi.object({
    name: Joi.string().trim().min(2).max(50).required().messages({
      'any.required': 'Tag name is required',
      'string.min': 'Tag name must be at least 2 characters',
      'string.max': 'Tag name cannot exceed 50 characters'
    })
  }),

  tagUpdate: Joi.object({
    name: Joi.string().trim().min(2).max(50).optional().messages({
      'string.min': 'Tag name must be at least 2 characters',
      'string.max': 'Tag name cannot exceed 50 characters'
    })
  }),

  // === COURSE ===
  courseCreate: Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
      'any.required': 'Course title is required'
    }),
    description: Joi.string().min(10).max(1000).required().messages({
      'any.required': 'Course description is required'
    }),
    youtube_link: Joi.string().uri().required().messages({
      'any.required': 'YouTube link is required',
      'string.uri': 'Invalid YouTube link'
    }),
    id_category: Joi.number().integer().positive().required().messages({
      'any.required': 'Category ID is required'
    }),
    id_image: Joi.number().integer().positive().allow(null).optional(),
    tagIds: Joi.array().items(Joi.number().integer()).optional()
  }),

  courseUpdate: Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    description: Joi.string().min(10).max(1000).optional(),
    youtube_link: Joi.string().uri().optional(),
    id_category: Joi.number().integer().positive().optional(),
    id_image: Joi.number().integer().positive().allow(null).optional(),
    tagIds: Joi.array().items(Joi.number().integer()).optional()
  }),

  // === EVENT ===
  eventCreate: Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
      'any.required': 'Event title is required'
    }),
    description: Joi.string().min(10).max(1000).required().messages({
      'any.required': 'Event description is required'
    }),
    date: Joi.date().iso().required().messages({
      'any.required': 'Event date is required'
    }),
    time: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .required()
      .messages({
        'any.required': 'Event time is required',
        'string.pattern.base': 'Invalid time format (HH:mm expected)'
      }),
    location: Joi.string().min(3).max(255).required().messages({
      'any.required': 'Location is required'
    }),
    id_category: Joi.number().integer().positive().required().messages({
      'any.required': 'Category ID is required'
    }),
    id_image: Joi.number().integer().positive().allow(null).optional(),
    tagIds: Joi.array().items(Joi.number().integer()).optional()
  }),

  eventUpdate: Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    description: Joi.string().min(10).max(1000).optional(),
    date: Joi.date().iso().optional(),
    time: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .optional()
      .messages({
        'string.pattern.base': 'Invalid time format (HH:mm expected)'
      }),
    location: Joi.string().min(3).max(255).optional(),
    id_category: Joi.number().integer().positive().optional(),
    id_image: Joi.number().integer().positive().allow(null).optional(),
    tagIds: Joi.array().items(Joi.number().integer()).optional()
  })
};

// =========================
// VALIDATION MIDDLEWARE
// =========================
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map((err) => err.message)
    });
  }
  next();
};

module.exports = { validateRequest, schemas };
