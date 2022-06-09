const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    productCode: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    productName: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    productLine: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'productlines',
        key: 'productLine'
      }
    },
    productScale: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    productVendor: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    quantityInStock: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    buyPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    MSRP: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productCode" },
        ]
      },
      {
        name: "productLine",
        using: "BTREE",
        fields: [
          { name: "productLine" },
        ]
      },
    ]
  });
};
