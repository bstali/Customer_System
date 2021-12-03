const db = require("../models");
const Orders = db.orders;
const Op = db.Sequelize.Op;

// Create and Save a new order
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.mealname) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
  
    // Create a order
    const order = {
      mealname: req.body.mealname,
      mealcatagory: req.body.mealcatagory,
      restaurantname: req.body.restaurantname,
      customerid: req.body.customerid,
    };
  
    // Save order in the database
    try {
      const data = await Orders.create(order);
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the order.",
      });
    }
  };
  
  // Retrieve all orders from the database.
  exports.findAll = async (req, res) => {
    const mealname = req.query.mealname;
    var condition = mealname
      ? { mealname: { [Op.like]: `%${mealname}%` } }
      : null;
    try {
      const data = await Orders.findAll({ where: condition });
  
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    }
  };
  