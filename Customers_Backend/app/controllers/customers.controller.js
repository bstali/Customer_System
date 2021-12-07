import db from "../models";
const Customers = db.customers;

// Create and Save a new customer
exports.create = async (req, res) => {
  // Create a customer
  const customer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    contact: req.body.contact,
    email: req.body.email,
  };

  // Save cutomer in the database
  try {
    const data = await Customers.create(customer);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the customer.",
    });
  }
};

// Retrieve all customers from the database.
exports.findAll = async (req, res) => {

  try {
    const data = await Customers.findAll({include: ["orders"]  });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving customers.",
    });
  }
};

// Find a single customer with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Customers.findByPk(id, { include: ["orders"] });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find cutomer with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving customer with id=" + id,
    });
  }
};

// Update a customer by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Customers.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Customer was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update customer with id=${id}. Maybe customer was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating customer with id=" + id,
    });
  }
};

// Delete a customer with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Customers.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Customer was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete customer with id=${id}. Maybe customer was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete customer with id=" + id,
    });
  }
};

// // Delete all customers from the database.
// exports.deleteAll = (req, res) => {};

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {};

