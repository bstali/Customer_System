import db from "../models";
const Customers = db.customers;
const Orders = db.orders;
import Sequelize from "sequelize";
var faker = require("faker");
// Create and Save a new customer
exports.create = async (req, res) => {
  // Create a customer
  for (var i = 0; i < 100; i++) {
    const customer = new Customers({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.city(),
      contact: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    });
    // firstName: req.body.firstName,
    // lastName: req.body.lastName,
    // address: req.body.address,
    // contact: req.body.contact,
    // email: req.body.email,
    customer.save((err, data) => {
      if (err) {
        console.log(err);
      }
    });
  }
  // Save cutomer in the database
  // try {
  //   const data = await Customers.create(customer);
  //   res.send(data);
  // } catch (err) {
  //   res.status(500).send({
  //     message:
  //       err.message || "Some error occurred while creating the customer.",
  //   });
  // }
};

const getPagination = (page, size) => {

  if (!page || page <= 1  ) {
      let offset = 0;
      let limit = 10;
      return { limit, offset }
  } else {
    let limit = size = 10;
    let offset = page * size - 10;
      return { limit, offset };
  }
};

const getPagingData = (data, page) => {
  const totalCustomers = data.count;
  const customersData = data.rows;
  const currentPage = page ;
  const totalPages = Math.ceil(totalCustomers / 10);

  return {totalCustomers,customersData, totalPages, currentPage };
};

// Retrieve all customers from the database.
exports.findAll = async (req, res) => {
  
  const { page, size } = req.query;
  // console.log("page", page, "size", size)

  const { limit, offset } = getPagination(page, size);
  console.log("limit", limit, "offset", offset)
  try {
    const data = await Customers.findAndCountAll({ 
      limit,
      offset,
       
    // attributes: {
    //   include: [
    //     [
    //       Sequelize.fn("COUNT", Sequelize.col("Orders.customerId")),
    //       "ordersCount",
    //     ],
    //   ],
    // },
    // include: [
    //   {
    //     model: Orders,
    //     attributes: [],
    //   },
    // ],
    // group: ["Customers.id"]
    });
    const response = getPagingData(data, page)
    res.send(response);
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
