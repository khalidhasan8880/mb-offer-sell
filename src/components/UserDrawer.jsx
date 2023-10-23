import { Fragment, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";

const UserDrawer = () => {
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

  

  const isChildRouteActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List className="space-y-2">
      <NavLink
              to={"/grammenphone"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/grammenphone") ? "text-green-400" : ""
              }`}>
              Grammenphone
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

export default UserDrawer;
