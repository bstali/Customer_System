import { Button, TextField, Dialog, Slide, Grid, Divider } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewCustomerForm(props) {
  console.log("add customer props", props)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/customers")
  //     .then((response) => {
  //       const customersData = response.data;
  //       setCustomers(customersData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [customers]);

  // const addCustomer = () => {
  //   // e.preventDefault();
  //   const postData = {
  //     firstname,
  //     lastname,
  //     email,
  //     contact,
  //     address,
  //   };

  //   axios
  //     .post("http://localhost:8080/api/customers", postData)

  //     .then((response) => {
  //       console.log("addresponse", response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setOpen(false);
  // };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const firstNameChangeHandler = (event) => {
  //   setFirstname(event.target.value);
  // };
  // const lastNameChangeHandler = (event) => {
  //   setLastname(event.target.value);
  // };
  // const emailChangeHandler = (event) => {
  //   setEmail(event.target.value);
  // };
  // const contactChangeHandler = (event) => {
  //   setContact(event.target.value);
  // };
  // const addressChangeHandler = (event) => {
  //   setAddress(event.target.value);
  // };
  return (
    <>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <h1>Customers Details</h1>
          {/* Add Customer */}

          <Button
            variant="contained"
            onClick={()=>{props.handleOpen()}
              }
            style={{ marginBottom: 10, float: "right" }}
          >
            Add Customer
          </Button>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      <div>
        <Dialog
          open={props.open}
          // onClick={handleClose}
          TransitionComponent={Transition}
          sx={{
            boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div>
            <h3 style={{ textAlign: "center" }}>Add Customer Details</h3>
            <Divider />

            <Grid container>
              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  value={props.firstname}
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  onChange={(e)=>{props.firstNameChangeHandler(e)}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  value={props.lastname}
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  onChange={(e) => {props.lastNameChangeHandler(e)}}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  value={props.email}
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  onChange={(e) => {props.emailChangeHandler(e)}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  value={props.contact}
                  id="standard-basic"
                  label="Contact"
                  variant="standard"
                  onChange={(e) => {props.contactChangeHandler(e)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ margin: 3, width: "90%" }}
                  value={props.address}
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  onChange={(e) => {props.addressChangeHandler(e)}}
                />
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid
                item
                xs={4}
                style={{ marginTop: 10, marginBottom: 10, float: "right" }}
              >
                <Button variant="contained" onClick={(e)=>{props.addCustomer(e)}}>
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={()=>{props.handleClose()}}
                  style={{ marginLeft: 15 }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </div>
        </Dialog>
      </div>
    </>
  );
}
