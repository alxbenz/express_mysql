'use strict';
module.exports = (sequelize, DataTypes) => {
  const BnzstgrmPosts = sequelize.define(
    'BnzstgrmPosts',
    {
      date: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      headline: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING
      },
      tags: {
        type: DataTypes.STRING
      },
      imageSrc: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  BnzstgrmPosts.associate = function(models) {};
  return BnzstgrmPosts;
};
