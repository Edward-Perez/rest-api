'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {

    UserId: { 
      type: DataTypes.INTEGER 
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required"
        }
      }
    },

    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: true
    },

    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Course.associate = function(models) {
      Course.belongsTo(models.User);
  };
  return Course;
};