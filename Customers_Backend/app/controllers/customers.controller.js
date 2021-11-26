const db = require("../models");
const Customers = db.customers;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const customer = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    contact: req.body.contact,
    email: req.body.email,
  };

  // Save cutomer in the database
  Customers.create(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer.",
      });
    });
};

// Retrieve all customers from the database.
exports.findAll = (req, res) => {
  const firstname = req.query.firstname;
  var condition = firstname
    ? { firstname: { [Op.like]: `%${firstname}%` } }
    : null;

  Customers.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Find a single customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customers.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customers.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update customer with id=${id}. Maybe customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating customer with id=" + id,
      });
    });
};

// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Customers.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete customer with id=${id}. Maybe customer was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete customer with id=" + id
        });
      });
};

// // Delete all customers from the database.
// exports.deleteAll = (req, res) => {};

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {};
