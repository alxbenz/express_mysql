'use strict';
module.exports = (sequelize, DataTypes) => {
  const WshlstItem = sequelize.define(
    'WshlstItem',
    {
      itemId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      itemLabel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      itemLink: {
        type: DataTypes.STRING,
        allowNull: false
      },
      itemDescription: {
        type: DataTypes.STRING
      },
      itemPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      itemImage: {
        type: DataTypes.STRING
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isOpen: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isReserved: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      reservedBy: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  WshlstItem.associate = function(models) {};
  return WshlstItem;
};
