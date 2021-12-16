import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box } from "@mui/material";

export default function Orders() {
  const [allOrders, setAllorders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers/all/orders")
      .then((response) => setAllorders(response.data));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Meal Id",
      width: 130,
      headerClassName: "header",
    },
    {
      field: "mealName",
      headerName: "Meal Name",
      width: 130,
      headerClassName: "header",
    },
    {
      field: "mealCatagory",
      headerName: "Meal Catagory",
      width: 130,
      headerClassName: "header",
    },
    {
      field: "restaurantName",
      headerName: "Restaurant Name",
      width: 200,
      headerClassName: "header",
    },
    {
      field: "customerId",
      headerName: "Customer Id",
      width: 130,
      headerClassName: "header",
    },
  ];

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 70 }}
      >
        <Grid item xs={3}></Grid>
        <Grid item xs={6} >
          <h1>All Orders</h1>
          <Box
            sx={{
              height: 700,
              width: "100%",
              "& .header": {
                backgroundColor: "rgb(102, 181, 255)",
              },
            }}
          >
            <DataGrid
              rows={allOrders}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </Box>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
}
