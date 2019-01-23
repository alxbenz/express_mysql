'use strict';
module.exports = (sequelize, DataTypes) => {
  const WshlstCategory = sequelize.define(
    'WshlstCategory',
    {
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoryLabel: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  WshlstCategory.associate = function(models) {
  };
  return WshlstCategory;
};
