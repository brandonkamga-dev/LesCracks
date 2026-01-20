const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id_document: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mime_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'id_category',
      },
    },
    id_image: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Image',
        key: 'id_image',
      },
    },
    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Admin',
        key: 'id_admin',
      },
    },
    download_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'Documents',
    timestamps: true,
    indexes: [
      {
        fields: ['category_id'],
      },
      {
        fields: ['uploaded_by'],
      },
    ],
  });

  Document.associate = (models) => {
   Document.belongsTo(models.Admin, {
     foreignKey: 'uploaded_by',
     as: 'uploader',
   });
   Document.belongsTo(models.Image, {
     foreignKey: 'id_image',
     as: 'image',
   });
   Document.belongsToMany(models.Category, {
     through: 'Document_Category',
     foreignKey: 'id_document',
     otherKey: 'id_category',
     as: 'categories',
   });
   Document.belongsToMany(models.Tag, {
     through: 'Document_Tag',
     foreignKey: 'id_document',
     otherKey: 'id_tag',
     as: 'tags',
   });
 };

  return Document;
};
