'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id_course: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: true, len: [3, 255] }
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: { notEmpty: true, len: [10, 1000] }
    },
    youtube_link: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: { isUrl: true, notEmpty: true }
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Category', key: 'id_category' }
    },
    id_image: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Image', key: 'id_image' }
    },
    click_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'Course',
    indexes: [
      { fields: ['title', 'description'], type: 'FULLTEXT' },
      { fields: ['click_count'] }
    ],
    timestamps: false
  });

  Course.associate = function(models) {
    Course.belongsTo(models.Category, { foreignKey: 'id_category', as: 'category' });
    Course.belongsTo(models.Image, { foreignKey: 'id_image', as: 'image' });
    Course.belongsToMany(models.Admin, {
      through: models.Admin_Course,
      foreignKey: 'id_course',
      otherKey: 'id_admin',
      as: 'admins'
    });
    Course.belongsToMany(models.Tag, {
      through: models.Course_Tag,
      foreignKey: 'id_course',
      otherKey: 'id_tag',
      as: 'tags'
    });
  };

  return Course;
};