const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orderdetails', {
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'orderNumber'
      }
    },
    productCode: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'productCode'
      }
    },
    quantityOrdered: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priceEach: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    orderLineNumber: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orderdetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderNumber" },
          { name: "productCode" },
        ]
      },
      {
        name: "productCode",
        using: "BTREE",
        fields: [
          { name: "productCode" },
        ]
      },
    ]
  });
};
