
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Fragment, useState } from "react";

const AdminDrawer = () => {
  const [state, setState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isNavLinkActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List className="space-y-2">
        <NavLink
          to={`/admin_dashboard/admin_home`}
          className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
            isNavLinkActive("/admin_dashboard/admin_home")
              ? "text-green-400"
              : ""
          }`}>
          Admin Home
        </NavLink>

        <NavLink
          to={`/admin_dashboard/manage_users`}
          className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
            isNavLinkActive("/admin_dashboard/manage_users")
              ? "text-green-400"
              : ""
          }`}>
          Manage Users
        </NavLink>

        <div className="mb-2">
          <button
            type="button"
            className={`group font-semibold w-full text-left flex items-center justify-between rounded-md px-4 py-3 hover:bg-green-100 transition duration-300 ease-in-out transform hover:translate-x-2 ${
              isNavLinkActive("/admin_dashboard/offer") ? "bg-green-100" : ""
            }`}
            onClick={toggleDropdown}>
            <span>Offers</span>
            {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </button>
          {isOpen && (
            <div className="pl-6 mt-2">
              <NavLink
                to={`/admin_dashboard/offer/airtel`}
                className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                  isNavLinkActive("/admin_dashboard/offer/airtel")
                    ? "text-green-400"
                    : ""
                }`}>
                Airtel
              </NavLink>
              <NavLink
                to={`/admin_dashboard/offer/robi`}
                className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                  isNavLinkActive("/admin_dashboard/offer/robi")
                    ? "text-green-400"
                    : ""
                }`}>
                Robi
              </NavLink>
            </div>
          )}
        </div>
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
