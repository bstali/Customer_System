import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { AppBar } from "@mui/material";

const useStyles = makeStyles({
  navItems: {
    textDecoration: 'none',
    color: 'white',
    padding: '16px 16px',
    fontSize: 20
  },
  active: {
    backgroundColor: '#ffffffe8',
    color: '#14196b',
    transition: '0.5s',
},
});

export default function AavBar() {
  const classes = useStyles();

  return (
    <AppBar>
      <div style={{ display: "flex", textAlign: "center" }}>
        <NavLink
          exact
          to="/Customers"
          className={classes.navItems}
          activeClassName={classes.active}
        >
          Customers
        </NavLink>
        <NavLink
          exact
          to="/Orders"
          className={classes.navItems}
          activeClassName={classes.active}
        >
          Orders
        </NavLink>
      </div>
    </AppBar>
  );
}
