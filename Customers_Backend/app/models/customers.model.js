module.exports = (sequelize, Sequelize) => {
    const Customers = sequelize.define("customers", {
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      }
    });
  
    return Customers;
  };