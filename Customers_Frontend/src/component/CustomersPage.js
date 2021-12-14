import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Grid, Button } from "@mui/material";
import UpdateCustomerForm from "./UpdateCustomerForm";
import NewCustomerForm from "./NewCustomerForm";
import CustomerTable from "./CustomerTable";
import OrderForm from "./OrderForm";
import OrderTable from "./OrderTable";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersOfCustomer, setOrdersOfCustomer] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [updatedCustomer, setUpdatedCustomer] = useState({});
  const [addedCustomer, setAddedCustomer] = useState({});
  const [addedOrder, setAddedOrder] = useState({});
  const [updateDialog, setUpdateDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [orderDialog, setOrderDialog] = useState(false);
  const [orderDetailsDialog, setOrderDetailsDialog] = useState(false);
//   console.log("customers", customers);
//   console.log("selectedcustomerid", selectedRow);
// console.log("customer orders data", ordersOfCustomer)
  const confirmationDialogHandler = () => {
    setConfirmationDialog(!confirmationDialog);
  };
  const updateDialogHandler = () => {
    setUpdateDialog(!updateDialog);
  };
  const addCustomerDialogHandler = () => {
    setOpen(!open);
  };
  const orderDialogHandler = () => {
    setOrderDialog(!orderDialog);
  };

  const orderDetailsDialogHandler = () => {
    setOrderDetailsDialog(!orderDetailsDialog);
  };

 
  const getAllCustomers = useCallback(() => {
    const url = `http://localhost:8080/api/customers`;
    axios
      .get(url)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllCustomers();
  }, [getAllCustomers]);

  async function deleteCustomer() {
    const url = `http://localhost:8080/api/customers/${selectedRow[0].id}`;
    try {
      const response = await axios.delete(url);
      setCustomers(response.data);
      getAllCustomers();
    } catch (err) {
      alert(err);
    }
    setConfirmationDialog(!confirmationDialog);
  }

  async function addCustomer(e) {
    e.preventDefault();
    const url = `http://localhost:8080/api/customers`;
    try {
      const response = await axios.post(url, addedCustomer);
      setCustomers(response.data);
      getAllCustomers();
    } catch (err) {
      alert(err);
    }
    setOpen(!open);
  }

  async function updateCustomer(e) {
    e.preventDefault();
    const url = `http://localhost:8080/api/customers/${selectedRow[0].id}`;
    try {
      const response = await axios.put(url, updatedCustomer);
      setCustomers(response.data);
      getAllCustomers();
    } catch (err) {
      alert(err);
    }
    setUpdateDialog(!updateDialog);
  }

  async function addOrder() {
    const order = addedOrder;
    order.customerId = selectedRow[0].id;
    const url = `http://localhost:8080/api/customers/order`;
    try {
      const response = await axios.post(url, order);
      setOrders(response.data);
      getAllCustomers();
    } catch (err) {
      alert(err);
    }
    setOrderDialog(!orderDialog);
  }

 const getOrdersOfCustomer = async () => {
    console.log("order api hit")
    const url = `http://localhost:8080/api/customers/orders/${selectedRow[0].id}`;
    try {
      const response = await axios.get(url);
      setOrdersOfCustomer(response.data);
    } catch (err) {
      console.log(err);
    }
    setOrderDetailsDialog(!orderDetailsDialog);
  
  }

  const rowSelection = (id) => {
    console.log("selection function hit");
    if (id) {
      const selectedCutomerId = id[0];
      const selectedCustomer = Object.values(customers).filter(
        (customer) => customer.id === selectedCutomerId
      );
      setSelectedRow(selectedCustomer);
    }
  };


  const handleUpdatedCustomer = (data, key) => {
    // const customUP =  UpdatedCustomer;
    // customUp[key] = data;
    // setUpdatedCustomer({ ...updatedCustomer, ...customUP });
    if (key === "firstName") {
      setUpdatedCustomer({ ...updatedCustomer, ...{ firstName: data } });
    }
    if (key === "lastName") {
      setUpdatedCustomer({ ...updatedCustomer, ...{ lastName: data } });
    }
    if (key === "email") {
      setUpdatedCustomer({ ...updatedCustomer, ...{ email: data } });
    }
    if (key === "contact") {
      setUpdatedCustomer({ ...updatedCustomer, ...{ contact: data } });
    }
    if (key === "address") {
      setUpdatedCustomer({ ...updatedCustomer, ...{ address: data } });
    }
  };

  const handleAddedCustomer = (data, key) => {
    if (key === "firstName") {
      setAddedCustomer({ ...addedCustomer, ...{ firstName: data } });
    }
    if (key === "lastName") {
      setAddedCustomer({ ...addedCustomer, ...{ lastName: data } });
    }
    if (key === "email") {
      setAddedCustomer({ ...addedCustomer, ...{ email: data } });
    }
    if (key === "contact") {
      setAddedCustomer({ ...addedCustomer, ...{ contact: data } });
    }
    if (key === "address") {
      setAddedCustomer({ ...addedCustomer, ...{ address: data } });
    }
  };

  const handleAddOrder = (data, key) => {
    if (key === "mealname") {
      setAddedOrder({ ...addedOrder, ...{ mealname: data } });
    }
    if (key === "mealcatagory") {
      setAddedOrder({ ...addedOrder, ...{ mealcatagory: data } });
    }
    if (key === "restaurantname") {
      setAddedOrder({ ...addedOrder, ...{ restaurantname: data } });
    }
  };

  return (
    <>
      <Grid container>
        <Grid xs={2}></Grid>
        <Grid item xs={8}>
          <h1>Customers Details</h1>

          <Button
            variant="contained"
            onClick={addCustomerDialogHandler}
            style={{ marginBottom: 10, float: "right" }}
          >
            Add Customer
          </Button>
        </Grid>
        <Grid xs={2}></Grid>
      </Grid>

      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <NewCustomerForm
            addCustomer={addCustomer}
            addCustomerDialogHandler={addCustomerDialogHandler}
            handleAddedCustomer={handleAddedCustomer}
            open={open}
          />

          <UpdateCustomerForm
            updateDialogHandler={updateDialogHandler}
            open={updateDialog}
            selectedRows={selectedRow}
            handleUpdatedCustomer={handleUpdatedCustomer}
            updateCustomer={updateCustomer}
          />

          <CustomerTable
            customersData={customers}
            selectedRows={selectedRow}
            updateDialogHandler={updateDialogHandler}
            deleteCustomer={deleteCustomer}
            rowSelection={rowSelection}
            open={confirmationDialog}
            confirmationDialogHandler={confirmationDialogHandler}
            orderDialogHandler={orderDialogHandler}
            getOrdersOfCustomer={getOrdersOfCustomer}
            orderDetailsDialogHandler={orderDetailsDialogHandler}
          />
          <OrderForm
            open={orderDialog}
            orderDialogHandler={orderDialogHandler}
            addOrder={addOrder}
            handleAddOrder={handleAddOrder}
          />

          <OrderTable
            open={orderDetailsDialog}
            orderDetailsDialogHandler={orderDetailsDialogHandler}
            ordersOfCustomer={ordersOfCustomer}
          />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}
