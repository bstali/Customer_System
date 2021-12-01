import { Button, TextField, Dialog, Slide, Grid, Divider } from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateCustomerForm(props) {
  const selectedRows = props.selectedRows;

  return (
    <>
      <div>
        <Dialog
          open={props.open}
          onClose={() => {
            props.handleClose();
          }}
          TransitionComponent={Transition}
          sx={{
            display: "block",
            boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.7)",
            zIndex: 100,
          }}
        >
          <div>
            <h3 style={{ textAlign: "center" }}>Update Customer Details</h3>
            <Divider />
            {selectedRows.map((selectedCustomer) => (
              <Grid container>
                <Grid item xs={6} key={selectedCustomer.id}>
                  <TextField
                    sx={{ margin: 3, width: "80%" }}
                    defaultValue={selectedCustomer.firstname}
                    id="standard-basic"
                    label="First Name"
                    variant="standard"
                    onChange={(e) =>
                      props.handleUpdatedCustomer(e.target.value, "firstname")
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ margin: 3, width: "80%" }}
                    defaultValue={selectedCustomer.lastname}
                    id="standard-basic"
                    label="Last Name"
                    variant="standard"
                    onChange={(e) =>
                      props.handleUpdatedCustomer(e.target.value, "lastname")
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    sx={{ margin: 3, width: "80%" }}
                    defaultValue={selectedCustomer.email}
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    onChange={(e) =>
                      props.handleUpdatedCustomer(e.target.value, "email")
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ margin: 3, width: "80%" }}
                    defaultValue={selectedCustomer.contact}
                    id="standard-basic"
                    label="Contact"
                    variant="standard"
                    onChange={(e) =>
                      props.handleUpdatedCustomer(e.target.value, "contact")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ margin: 3, width: "90%" }}
                    defaultValue={selectedCustomer.address}
                    id="standard-basic"
                    label="Address"
                    variant="standard"
                    onChange={(e) =>
                      props.handleUpdatedCustomer(e.target.value, "address")
                    }
                  />
                </Grid>
                <Grid item xs={8}></Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    float: "right",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      props.updateCustomer(e);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      props.updateDialogHandler();
                    }}
                    style={{ marginLeft: 15 }}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            ))}
          </div>
        </Dialog>
      </div>
    </>
  );
}
