import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
  Divider,
} from "@mui/material";
import UpdateCustomerForm from "../component/UpdateCustomerForm";
import NewCustomerForm from "../component/NewCustomerForm";
// import NewCustomerForm

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [updatedCustomer, setUpdatedCustomer] = useState({});
  const [open, setOpen] = useState(false);

  const confirmationDialogOpenHandler = () => {
    setConfirmationDialog(true);
    rowSelection();
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllUser = useCallback(() => {
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
    getAllUser();
  }, [getAllUser]);

  const deleteCustomer = () => {
    const url = `http://localhost:8080/api/customers/${selectedRows[0].id}`;
    axios.delete(url).then((response) => {
      const customersData = response.data;
      setCustomers(customersData);
      getAllUser();
    });
    setSelectedRows([]);
    setConfirmationDialog(false);
  };

  const addCustomer = (e) => {
    e.preventDefault();
    const postData = {
      firstname,
      lastname,
      email,
      contact,
      address,
    };

    axios
      .post("http://localhost:8080/api/customers", postData)

      .then((response) => {
        setCustomers(response.data);
        getAllUser();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  const updateCustomer = (e) => {
    e.preventDefault();
    // const postData = {
    //   updatedCustomer
    // };

    const url = `http://localhost:8080/api/customers/${selectedRows[0].id}`;
    axios
      .put(url, updatedCustomer)

      .then((response) => {
        setCustomers(response.data);
        getAllUser();
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
  };

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
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "Contact", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: DeleteButton,
    },
  ];

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
  // const handleFormDatafornewcustomer = (event) => {
  //    // set customer
  //    // axios
  // }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <NewCustomerForm
            addCustomer={addCustomer}
            handleClose={handleClose}
            handleOpen={handleClickOpen}
            open={open}
            firstNameChangeHandler={firstNameChangeHandler}
            firstname={firstname}
            lastNameChangeHandler={lastNameChangeHandler}
            lastname={lastname}
            emailChangeHandler={emailChangeHandler}
            email={email}
            contactChangeHandler={contactChangeHandler}
            contact={contact}
            addressChangeHandler={addressChangeHandler}
            address={address}
          />

          <UpdateCustomerForm
            handleClose={updateDialogCloseHandler}
            handleOpen={updateDialogOpenHandler}
            open={updateDialog}
            selectedRows={selectedRows}
            handleUpdatedCustomer={handleUpdatedCustomer}
            updateCustomer={updateCustomer}
          />

          {/* Customers Table */}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={customers}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              // disableSelectionOnClick
              onSelectionModelChange={rowSelection}
            />
            {/* <pre style={{ fontSize: 10 }}>
              {JSON.stringify(selectedRows, null, 4)}
            </pre> */}
          </div>

          {/* delete Customer */}
          <div>
            <Dialog
              open={confirmationDialog}
              onClose={confirmationDialogCloseHandler}
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirmation"}
              </DialogTitle>
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

          {/* Update Customer */}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      {/* <NewCustomerForm
    
      handleSubmit=handleFormDatafornewcustomer
      /> */}
    </>
  );
}
