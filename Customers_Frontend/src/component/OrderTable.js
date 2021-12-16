import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  Slide,
  CircularProgress,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function OrdersTable(props) {
  const ordersOfCustomer = props.ordersOfCustomer;

  return (
    <Dialog
      open={props.open}
      onClick={() => props.orderDetailsDialogHandler()}
      TransitionComponent={Transition}
      sx={{
        boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.7)",
      }}
    >
      {ordersOfCustomer ? (
        <div
          style={{
            height: "100%",
            minWidth: "80%",
            padding: 20,
            textAlign: "center",
          }}
        >
          <h4>Orders Details</h4>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Meal Name</TableCell>
                  <TableCell align="right">Meal Catagory</TableCell>
                  <TableCell align="right">Restaurant Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersOfCustomer.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="center">{order.mealName}</TableCell>
                    <TableCell align="center">{order.mealCatagory}</TableCell>
                    <TableCell align="center">{order.restaurantName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <CircularProgress />
      )}
    </Dialog>
  );
}
