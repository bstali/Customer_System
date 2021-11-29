import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField
} from "@mui/material";
import AddNewCustomer from "./NewCustomerForm";
// import UpdateCustomer from "./NewCustomerForm";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  
  const confirmationDialogOpenHandler = () => {
    setConfirmationDialog(true);
  };
  const confirmationDialogCloseHandler = () => {
    setConfirmationDialog(false);
  };

  const updateDialogOpenHandler = () => {
    setUpdateDialog(true);
  };
  const updateDialogCloseHandler = () => {
    setUpdateDialog(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => {
        const customersData = response.data;
        setCustomers(customersData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteCustomer = () => {
    const url = `http://localhost:8080/api/customers/${selectedRows[0].id}`;
    axios.delete(url).then((response) => {
      const customersData = response.data;
      setCustomers(customersData);
    });
    setSelectedRows([])
  };

  const updateCustomer = () => {
    // e.preventDefault();
    const postData = {
      firstname,
      lastname,
      email,
      contact,
      address
    };

    const url = `http://localhost:8080/api/customers/${selectedRows[0].id}`;
    axios
      .put(url, postData)
      
      .then((response) => {
        console.log("addresponse", response)
      })
      .catch((err) => {
        console.log(err);
      });
      setUpdateDialog(false);
  };

  const rowSelection = (ids) => {
      const selectedIDs = new Set(ids);
      const selectedRowData = Object.values(customers).filter((row) =>
        selectedIDs.has(row.id)
      );

      setSelectedRows(selectedRowData);
  }

  const DeleteButton = () => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          style={{ width: ".2vw", fontSize: "10px" }}
          onClick={confirmationDialogOpenHandler}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16, width: ".2vw", fontSize: "10px" }}
          onClick={updateDialogOpenHandler}
        >
          Update
        </Button>
      </strong>
    );
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "contact", headerName: "Contact", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: DeleteButton,
    },
  ];

  const firstNameChangeHandler = (event) => {
    setFirstname(event.target.value);
  };
  const lastNameChangeHandler = (event) => {
    setLastname(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const contactChangeHandler = (event) => {
    setContact(event.target.value);
  };
  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <h1>Customers Details</h1>
        <div>
          <AddNewCustomer />
          {/* <UpdateCustomer /> */}
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={customers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={rowSelection}
          />
          <pre style={{ fontSize: 10 }}>
            {JSON.stringify(selectedRows, null, 4)}
          </pre>
        </div>

        {/* delete Customer */}
        <div>
          <Dialog
            open={confirmationDialog}
            onClose={confirmationDialogCloseHandler}
          >
            <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to delete this customer?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={deleteCustomer}>Yes</Button>
              <Button onClick={confirmationDialogCloseHandler} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* Updat Customer */}
        <div>
        <Dialog
            open={updateDialog}
            onClose={updateDialogCloseHandler}
          >
        <Paper>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  value={firstname}
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  onChange={firstNameChangeHandler}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={lastname}
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  onChange={lastNameChangeHandler}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  value={email}
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  onChange={emailChangeHandler}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={contact}
                  id="standard-basic"
                  label="Contact"
                  variant="standard"
                  onChange={contactChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={address}
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  sx={{ width: "90%" }}
                  onChange={addressChangeHandler}
                />
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={4} style={{ marginTop: 10 }}>
                <Button variant="contained" onClick={updateCustomer}>Update</Button>
                <Button
                  variant="contained"
                  onClick={updateDialogCloseHandler}
                  style={{ marginLeft: 5 }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Paper>
          
          </Dialog>
        </div>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
}
