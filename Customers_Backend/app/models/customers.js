const orders = require("./orders");

module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define("customers", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    contact: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
  });

  Customers.associate = function (models) {
    // associations can be defined here
    Customers.hasMany(models.orders, { as: "orders" });
  };

  return Customers;
};
