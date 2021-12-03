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

export default function CustomerTable(props) {
  const customers = props.customersData;

  const ActionButtons = () => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{marginLeft: 16, minWidth: ".2vw", fontSize: "10px" }}
          onClick={() => {props.confirmationDialogHandler()}}
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
      width: 300,
      renderCell: ActionButtons,
    },
  ];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={(e) => {
            props.rowSelection(e);
          }}
        />
      </div>
      <div>
        <Dialog
          open={props.open}
          onClose={() => {props.confirmationDialogHandler()}}
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
            <Button onClick={() => {props.confirmationDialogHandler()}} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
