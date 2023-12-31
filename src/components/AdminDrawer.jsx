
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useLocation } from "react-router-dom";
import { Fragment, useState } from "react";

const AdminDrawer = () => {
  const [state, setState] = useState(false);
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };



  const isNavLinkActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List className="space-y-2">
      <NavLink
          to={`/dashboard/orders`}
          className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
            isNavLinkActive("/dashboard/orders")
              ? "text-green-400"
              : ""
          }`}>
          Orders
        </NavLink>
        <NavLink
          to={`/dashboard/add_offer`}
          className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
            isNavLinkActive("/dashboard/add_offer")
              ? "text-green-400"
              : ""
          }`}>
          Add Offer
        </NavLink>
        <NavLink
          to={`/dashboard/manage_offers`}
          className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
            isNavLinkActive("/dashboard/manage_offers")
              ? "text-green-400"
              : ""
          }`}>
          Manage Offers
        </NavLink>
        <NavLink
          to={`/dashboard/balance_request`}
          className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
            isNavLinkActive("/dashboard/balance_request")
              ? "text-green-400"
              : ""
          }`}>
          Balance Requests
        </NavLink>
        <NavLink
          to={`/dashboard/withdraw_request`}
          className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
            isNavLinkActive("/dashboard/withdraw_request")
              ? "text-green-400"
              : ""
          }`}>
          Withdraw Requests
        </NavLink>
        
       

      
      </List>
    </Box>
  );

  return (
    <div>
      <Fragment key={"left"}>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <SwipeableDrawer
          anchor={"left"}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}>
          <div className="flex justify-end">
            <Button onClick={toggleDrawer(false)}>
              <MenuIcon />
            </Button>
          </div>
          {list()}
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
};

export default AdminDrawer;
