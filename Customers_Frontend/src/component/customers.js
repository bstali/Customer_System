import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => {
        const customersData = response.data;
        setCustomers(customersData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("customers", customers);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "contact", headerName: "Contact", width: 130 },
    { field: "address", headerName: "Addresse", width: 130 },
  ];

  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <h1>Customers Details</h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={customers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
}
