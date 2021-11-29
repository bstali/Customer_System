import { Button, Paper, TextField, Dialog, Slide, Grid } from "@mui/material";
import React, { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateCustomerForm() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Update Customer
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
                id="standard-basic"
                label="First Name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Last Name"
                variant="standard"
              />
            </Grid>
            
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  label="Contact"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  sx={{width: "90%"}}
                />
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={4} style={{marginTop: 10}}>
                <Button variant="contained">Save</Button>
                <Button variant="contained" onClick={handleClose} style={{marginLeft: 5}}>
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
