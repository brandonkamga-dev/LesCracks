'use strict';

module.exports = (sequelize, DataTypes) => {
  const VideoCourseCategory = sequelize.define('VideoCourseCategory', {
    id_video_course_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, len: [2, 100] }
    }
  }, {
    tableName: 'video_course_categories',
    timestamps: false,
    indexes: [{ fields: ['name'] }]
  });

  VideoCourseCategory.associate = function(models) {
    VideoCourseCategory.belongsToMany(models.VideoCourse, {
      through: 'VideoCourse_VideoCourseCategory',
      foreignKey: 'id_video_course_category',
      otherKey: 'id_video_course',
      as: 'videoCourses'
    });
  };

  return VideoCourseCategory;
};