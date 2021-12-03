import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Grid, Button } from "@mui/material";
import UpdateCustomerForm from "./UpdateCustomerForm";
import NewCustomerForm from "./NewCustomerForm";
import CustomerTable from "./CustomerTable";
import OrderForm from "./OrderForm";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [updatedCustomer, setUpdatedCustomer] = useState({});
  const [addedCustomer, setAddedCustomer] = useState({});
  const [addedOrder, setAddedOrder] = useState({});
  const [updateDialog, setUpdateDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [orderDialog, setOrderDialog] = useState(false);

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

  const getAllCustomers = useCallback(() => {
    let url = `http://localhost:8080/api/customers`;
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
    setSelectedRow([]);
    setConfirmationDialog(false);
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
    setOpen(false);
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
    setUpdateDialog(false);
  }

  async function addOrder() {
    // e.preventDefault();
    const order = addedOrder
    order.customerid = selectedRow[0].id;
    console.log("order", order)
    const url = `http://localhost:8080/api/customers/order`;
    try {
    const response = await axios.post(url, order);
      setOrders(response.data);
    } catch (err) {
      alert(err);
    }
    setOrderDialog(false);
  }

  const rowSelection = (id) => {
    if (id) {
      const selectedCutomerId = id[0];
      const selectedCustomer = Object.values(customers).filter(
        (customer) => customer.id === selectedCutomerId
      );
      setSelectedRow(selectedCustomer);
    }
  };

  const handleUpdatedCustomer = (data, key) => {
    if (key === "firstname") {
      setUpdatedCustomer({ ...updatedCustomer, ...{ firstname: data } });
    }
    if (key === "lastname") {
      setUpdatedCustomer({ ...updatedCustomer, ...{ lastname: data } });
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
    if (key === "firstname") {
      setAddedCustomer({ ...addedCustomer, ...{ firstname: data } });
    }
    if (key === "lastname") {
      setAddedCustomer({ ...addedCustomer, ...{ lastname: data } });
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
            updateDialogHandler={updateDialogHandler}
            selectedRows={selectedRow}
            deleteCustomer={deleteCustomer}
            rowSelection={rowSelection}
            open={confirmationDialog}
            confirmationDialogHandler={confirmationDialogHandler}
            orderDialogHandler={orderDialogHandler}
          />
          <OrderForm
            open={orderDialog}
            orderDialogHandler={orderDialogHandler}
            addOrder= {addOrder}
            handleAddOrder={handleAddOrder}
            selectedRows={selectedRow}
          />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}
