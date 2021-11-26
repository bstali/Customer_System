import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/customers").then((response) => {
      const customersData = response.data;
      setCustomers(customersData);
      console.log("resDataaaaaa", response.data)
    });
  }, []);
  console.log("customers", customers);
  return (
    <>
      <h1>Customers Details</h1>
    </>
  );
}
