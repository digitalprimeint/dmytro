var DataTypes = require("sequelize").DataTypes;
var _customers = require("./customers");
var _employees = require("./employees");
var _offices = require("./offices");
var _orderdetails = require("./orderdetails");
var _orders = require("./orders");
var _payments = require("./payments");
var _productlines = require("./productlines");
var _products = require("./products");

function initModels(sequelize) {
  var customers = _customers(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var offices = _offices(sequelize, DataTypes);
  var orderdetails = _orderdetails(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var productlines = _productlines(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);

  orders.belongsToMany(products, { as: 'productCode_products', through: orderdetails, foreignKey: "orderNumber", otherKey: "productCode" });
  products.belongsToMany(orders, { as: 'orderNumber_orders', through: orderdetails, foreignKey: "productCode", otherKey: "orderNumber" });
  orders.belongsTo(customers, { as: "customerNumber_customer", foreignKey: "customerNumber"});
  customers.hasMany(orders, { as: "orders", foreignKey: "customerNumber"});
  payments.belongsTo(customers, { as: "customerNumber_customer", foreignKey: "customerNumber"});
  customers.hasMany(payments, { as: "payments", foreignKey: "customerNumber"});
  customers.belongsTo(employees, { as: "salesRepEmployeeNumber_employee", foreignKey: "salesRepEmployeeNumber"});
  employees.hasMany(customers, { as: "customers", foreignKey: "salesRepEmployeeNumber"});
  employees.belongsTo(employees, { as: "reportsTo_employee", foreignKey: "reportsTo"});
  employees.hasMany(employees, { as: "employees", foreignKey: "reportsTo"});
  employees.belongsTo(offices, { as: "officeCode_office", foreignKey: "officeCode"});
  offices.hasMany(employees, { as: "employees", foreignKey: "officeCode"});
  orderdetails.belongsTo(orders, { as: "orderNumber_order", foreignKey: "orderNumber"});
  orders.hasMany(orderdetails, { as: "orderdetails", foreignKey: "orderNumber"});
  products.belongsTo(productlines, { as: "productLine_productline", foreignKey: "productLine"});
  productlines.hasMany(products, { as: "products", foreignKey: "productLine"});
  orderdetails.belongsTo(products, { as: "productCode_product", foreignKey: "productCode"});
  products.hasMany(orderdetails, { as: "orderdetails", foreignKey: "productCode"});

  return {
    customers,
    employees,
    offices,
    orderdetails,
    orders,
    payments,
    productlines,
    products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
