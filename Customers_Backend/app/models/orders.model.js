module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define("orders", {
    mealname: {
      type: Sequelize.STRING,
    },
    mealcatagory: {
      type: Sequelize.STRING,
    },
    restaurantname: {
      type: Sequelize.STRING,
    },
    customerid: {
      type: Sequelize.INTEGER,
      references: {
        model: "customers",
        key: "id",
      },
    },
  });

  return Orders;
};
