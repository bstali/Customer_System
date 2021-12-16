import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customers from "./CustomersPage";
import AppBar from "./AppBar";
import Orders from "./OrdersPage";

export default function URLs() {
  return (
    <Router>
      <AppBar />

      <Routes>
        <Route exact path="/Customers" element={<Customers />}></Route>
        <Route exact path="/Orders" element={<Orders />}></Route>
      </Routes>
    </Router>
  );
}
