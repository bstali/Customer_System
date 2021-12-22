import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CustomerTable(props) {
  const customers = props.customers;
  console.log("customers", customers);
  const currentPage = props.currentPage;

  const showOrders = (e) => {
    return (
      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => props.getOrdersOfCustomer(e.row.id)}
      >
        {e.row.ordersCount}
      </p>
    );
  };
  const ActionButtons = () => {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16, minWidth: ".2vw", fontSize: "10px" }}
          onClick={() => {
            props.confirmationDialogHandler();
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16, minWidth: ".2vw", fontSize: "10px" }}
          onClick={() => props.updateDialogHandler()}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16, minWidth: ".2vw", fontSize: "10px" }}
          onClick={() => props.orderDialogHandler()}
        >
          add Order
        </Button>
      </div>
    );
  };

  const columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "Contact", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    {
      field: "ordersCount",
      headerName: "Orders",
      headerAlign: "center",
      width: 130,
      renderCell: showOrders,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 300,
      renderCell: ActionButtons,
    },
  ];

  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={customers.customersData}
          columns={columns}
          hideFooter={true}
          onSelectionModelChange={(e) => {
            props.rowSelection(e);
          }}
        />
      </div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          marginTop:10
        }}
      >
        {currentPage === 1 ? null : (
          <ArrowBackIcon
            style={{ color: "#1976D2", marginRight: 20, cursor: "pointer" }}
            onClick={() => props.previousPage()}
          />
        )}
        <span>
          Page {currentPage} of {customers.totalPages}
        </span>
        {currentPage === customers.totalPages ? null : (
          <ArrowForwardIcon
            style={{ color: "#1976D2", marginLeft: 20, cursor: "pointer" }}
            onClick={() => props.nextPage()}
          />
        )}
      </div>
      <div>
        <Dialog
          open={props.open}
          onClose={() => {
            props.confirmationDialogHandler();
          }}
        >
          <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete this customer?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                props.deleteCustomer();
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                props.confirmationDialogHandler();
              }}
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
