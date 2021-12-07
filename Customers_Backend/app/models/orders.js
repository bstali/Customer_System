const customers = require("./customers");

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("orders", {
    mealName: {
      type: DataTypes.STRING,
    },
    mealCatagory: {
      type: DataTypes.STRING,
    },
    restaurantName: {
      type: DataTypes.STRING,
    },
  }); 
  
  Orders.associate = function (models) {
    // associations can be defined here
    Orders.belongsTo(models.customers, {foreignKey: "id", as:"customer"})
  };
  
  return Orders;  
};