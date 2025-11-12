'use strict';

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id_image: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'L\'URL de l\'image est requise' },
        // REMPLACE isUrl PAR UNE RÈGLE SOUPLE
        is: {
          args: /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i,
          msg: 'Format d\'URL invalide'
        }
      }
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0 }
    },
    mime_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'Image',
    timestamps: false
  });

  Image.associate = function(models) {
    Image.hasMany(models.Course, { foreignKey: 'id_image', as: 'courses' });
    Image.hasMany(models.Event, { foreignKey: 'id_image', as: 'events' });
  };

  return Image;
};