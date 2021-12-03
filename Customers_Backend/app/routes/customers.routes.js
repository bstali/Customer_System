const { orders } = require("../models");

module.exports = (app) => {
  const customers = require("../controllers/customers.controller");
  const orders = require("../controllers/orders.controller");

  var router = require("express").Router();

  // Create a new customer
  router.post("/", customers.create);

  // Retrieve all customers
  router.get("/", customers.findAll);

  // // Retrieve all published customers
  // router.get("/published", customers.findAllPublished);

  // Retrieve a single customer with id
  router.get("/:id", customers.findOne);

  // Update a Tutorial with id
  router.put("/:id", customers.update);

  // Delete a Tutorial with id
  router.delete("/:id", customers.delete);

  // // Delete all Tutorials
  // router.delete("/", tutorials.deleteAll);

  // Create a new order
  router.post("/order", orders.create);

  // Retrieve all orders
  router.get("/:id/orders", orders.findAll);

  app.use("/api/customers", router);
};
