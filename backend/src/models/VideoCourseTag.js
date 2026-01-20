'use strict';

module.exports = (sequelize, DataTypes) => {
  const VideoCourseTag = sequelize.define('VideoCourseTag', {
    id_video_course_tag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, len: [2, 50] }
    }
  }, {
    tableName: 'video_course_tags',
    timestamps: false,
    indexes: [{ fields: ['name'] }]
  });

  VideoCourseTag.associate = function(models) {
    VideoCourseTag.belongsToMany(models.VideoCourse, {
      through: 'VideoCourse_VideoCourseTag',
      foreignKey: 'id_video_course_tag',
      otherKey: 'id_video_course',
      as: 'videoCourses'
    });
  };

  return VideoCourseTag;
};