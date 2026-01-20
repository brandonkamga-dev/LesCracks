const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const VideoCourse = sequelize.define('VideoCourse', {
    id_video_course: {
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
    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
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
    click_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'video_courses',
    timestamps: true,
    indexes: [
      {
        fields: ['uploaded_by'],
      },
    ],
  });

  VideoCourse.associate = (models) => {
    VideoCourse.belongsTo(models.Admin, {
      foreignKey: 'uploaded_by',
      as: 'uploader',
    });
    VideoCourse.belongsTo(models.Image, {
      foreignKey: 'id_image',
      as: 'image',
    });
    VideoCourse.belongsToMany(models.VideoCourseCategory, {
      through: 'VideoCourse_VideoCourseCategory',
      foreignKey: 'id_video_course',
      otherKey: 'id_video_course_category',
      as: 'categories',
    });
    VideoCourse.belongsToMany(models.VideoCourseTag, {
      through: 'VideoCourse_VideoCourseTag',
      foreignKey: 'id_video_course',
      otherKey: 'id_video_course_tag',
      as: 'tags',
    });
  };

  return VideoCourse;
};