import { Button, Paper, TextField, Dialog, Slide, Grid } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewCustomerForm() {
  // const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
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

  const addCustomer = () => {
    // e.preventDefault();
    const postData = {
      firstname,
      lastname,
      email,
      contact,
      address
    };

    axios
      .post("http://localhost:8080/api/customers", postData)
      
      .then((response) => {
        console.log("addresponse", response)
      })
      .catch((err) => {
        console.log(err);
      });
      setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Customer
      </Button>

      <div>
        <Dialog
          open={open}
          //   onClick={handleClose}
          TransitionComponent={Transition}
          sx={{
            display: "block",
            boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.7)",
            zIndex: 100,
          }}
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
                <Button variant="contained" onClick={addCustomer}>Save</Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  style={{ marginLeft: 5 }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Dialog>
      </div>
    </>
  );
}
