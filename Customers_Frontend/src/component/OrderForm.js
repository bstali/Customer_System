import { Button, TextField, Dialog, Slide, Grid, Divider } from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderForm(props) {
  const selectedRow = props.selectedRows;
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
            <h3 style={{ textAlign: "center" }}>Add Order Details</h3>
            <Divider />
            {selectedRow.map((selectedCustomer) => (
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  // value={props.firstname}
                  id="standard-basic"
                  label="Meal Name"
                  variant="standard"
                  onChange={(e) =>
                    props.handleAddOrder(e.target.value, "mealname")
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  // value={props.lastname}
                  id="standard-basic"
                  label="Meal Catagory"
                  variant="standard"
                  onChange={(e) =>
                    props.handleAddOrder(e.target.value, "mealcatagory")
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  sx={{ margin: 3, width: "80%" }}
                  // value={props.email}
                  id="standard-basic"
                  label="Restaurant Name"
                  variant="standard"
                  onChange={(e) =>
                    props.handleAddOrder(e.target.value, "restaurantname")
                  }
                />
              </Grid>
              <Grid item xs={6}>
                
              {/* <TextField
                    sx={{ margin: 3, width: "90%" }}
                    defaultValue={selectedCustomer.id}
                    id="standard-basic"
                    label="Cutomer ID"
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(e) =>
                      props.handleAddOrder(e.target.value, "customerid")
                    }
                  /> */}
               
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid
                item
                xs={4}
                style={{ marginTop: 10, marginBottom: 10, float: "right" }}
              >
                <Button variant="contained" onClick={() => props.addOrder()}>
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    props.orderDialogHandler();
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
