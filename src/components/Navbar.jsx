import { Avatar } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { green, blueGrey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import Drawer from "./Drawer";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="flex-between py-1 container mx-auto rounded-full w-full mt-2 bg-gradient-to-r from-green-600/10 to-blue-700/30 ">
      <Drawer></Drawer>
      {user ? (
        <Link to="/profile">
          <Avatar
            sx={{ bgcolor: green[500], width: 29, height: 29 }}
            className="mr-3">
            {user?.displayName ? (
              user.displayName.charAt(0)
            ) : (
              <PersonIcon sx={{ color: blueGrey[50] }}></PersonIcon>
            )}
          </Avatar>
        </Link>
      ) : (
        <Link to="/login" className="font-semibold mr-4">
          Login
        </Link>
      )}
    </nav>
  );
}
