import { Button, TextField, Dialog, Slide, Grid, Divider } from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewCustomerForm(props) {
  return (
    <>
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
                  // value={props.firstname}
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  onChange={(e) =>
                    props.handleAddedCustomer(e.target.value, "firstName")
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  // value={props.lastname}
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  onChange={(e) =>
                    props.handleAddedCustomer(e.target.value, "lastName")
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  // value={props.email}
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  onChange={(e) =>
                    props.handleAddedCustomer(e.target.value, "email")
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  // value={props.contact}
                  id="standard-basic"
                  label="Contact"
                  variant="standard"
                  onChange={(e) =>
                    props.handleAddedCustomer(e.target.value, "contact")
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ margin: 3, width: "90%" }}
                  // value={props.address}
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  onChange={(e) =>
                    props.handleAddedCustomer(e.target.value, "address")
                  }
                />
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid
                item
                xs={4}
                style={{ marginTop: 10, marginBottom: 10, float: "right" }}
              >
                <Button
                  variant="contained"
                  onClick={(e) => {
                    props.addCustomer(e);
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    props.addCustomerDialogHandler();
                  }}
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
