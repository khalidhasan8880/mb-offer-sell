import { Fragment, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Drawer
 = () => {
  const [state, setState] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
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

  const toggleOffers = () => {
    setIsOffersOpen(!isOffersOpen);
  };

  const isChildRouteActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List className="space-y-2">
      <NavLink
              to={"/"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/") ? "text-green-400" : ""
              }`}>
             Home 
              </NavLink>
        <div
          className={`flex justify-between px-4 py-3 rounded-md hover:bg-green-100 font-semibold cursor-pointer ${
            isOffersOpen ? "bg-green-300" : ""
          }`}
          onClick={toggleOffers}>
          Offers
          {isOffersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        {isOffersOpen && (
          <div className="ml-4">
            <NavLink
              to={"/airtel"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/airtel") ? "text-green-400" : ""
              }`}>
              Airtel
            </NavLink>
            <NavLink
              to={"/robi"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/robi") ? "text-green-400" : ""
              }`}>
              Robi
            </NavLink>
            <NavLink
              to={"/grameenphone"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/grameenphone") ? "text-green-400" : ""
              }`}>
              Grameenphone
            </NavLink>
            <NavLink
              to={"/banglalink"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/banglalink") ? "text-green-400" : ""
              }`}>
              Banglalink
            </NavLink>
            <NavLink
              to={"/teletalk"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/teletalk") ? "text-green-400" : ""
              }`}>
              Teletalk
            </NavLink>
          </div>
        )}
         <NavLink
              to={"/orders"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/orders") ? "text-green-400" : ""
              }`}>
             Orders
              </NavLink>
         <NavLink
              to={"/deposit"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/deposit") ? "text-green-400" : ""
              }`}>
             Deposit
              </NavLink>
         <NavLink
              to={"/transaction"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/transaction") ? "text-green-400" : ""
              }`}>
             Transaction
              </NavLink>
         <NavLink
              to={"/rules"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/rules") ? "text-green-400" : ""
              }`}>
             Rules
              </NavLink>
         <NavLink
              to={"/qna"}
              className={`block px-4 py-3 rounded-md hover:bg-green-100 font-semibold ${
                isChildRouteActive("/qna") ? "text-green-400" : ""
              }`}>
                Q & A
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

export default Drawer
;
