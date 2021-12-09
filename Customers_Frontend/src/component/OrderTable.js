import React, {useState, useEffect} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import _ from "lodash"

export default function OrdersTable(props) {
  const selectedRow = props.selectedRows;
  const orders = selectedRow.map(selectedCustomer => selectedCustomer.orders[0])

  return (
    <div style={{ height: 200, width:"80%", marginTop: 50 }}>
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
          {orders.map((order) => (
            <TableRow
              key={order.id}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{order.mealName}</TableCell>
              <TableCell align="right">{order.mealCatagory}</TableCell>
              <TableCell align="right">{order.restaurantName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
