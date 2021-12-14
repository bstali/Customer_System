import db from "../models";
const Orders = db.orders;
const Customers = db.customers;
// Create and Save a new order
exports.create = async (req, res) => {
  // Create a order
  const order = {
    mealName: req.body.mealname,
    mealCatagory: req.body.mealcatagory,
    restaurantName: req.body.restaurantname,
    customerId: req.body.customerId,
  };

  // Save order in the database
  try {
    const data = await Orders.create(order);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the order.",
    });
  }
};

// Retrieve all orders from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Orders.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving orders.",
    });
  }
};

// Retrieve all orders of specific customer  from the database.
exports.findAllByCustomerId = async (req, res) => {
  const customerId = req.params.id;
  try {
    if (customerId) {
      const data = await Orders.findAll({ where: { customerId: customerId } });
      res.send(data);
    } else {
      const data = await Orders.findAll();
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving orders.",
    });
  }
};
