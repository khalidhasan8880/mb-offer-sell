import { Avatar } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { green, blueGrey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import Drawer from "./Drawer";
import SimpleBadge from "./Badge";
import { useEffect, useState } from "react";
import api from "../hooks/interceptors";

export default function Navbar() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(["dw sd ", "helw dw sd  o"]);
  const [isOpenNotifications, setIsOpenNotification] = useState(false);

  useEffect(() => {
    api.get(`/notifications?email=${user?.email}`).then((res) => {
      // setNotifications(res.data);
    });
  }, [user?.email]);
  const openNotificationBox = () => {
    setIsOpenNotification(true);
  };
  const closeNotificationBox = () => {
    setIsOpenNotification(false);
  };
  return (
    <>
      <nav className="flex-between py-1 container mx-auto rounded-full w-full mt-2 bg-gradient-to-r from-green-600/10 to-blue-700/30 ">
        <Drawer></Drawer>
        {user ? (
          <div className="flex gap-x-5 items-center">
            <button onClick={openNotificationBox}>
              <SimpleBadge badgeContent={notifications?.length}></SimpleBadge>
            </button>
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
          </div>
        ) : (
          <Link to="/login" className="font-semibold mr-4">
            Login
          </Link>
        )}
      </nav>

      {/* notification box  */}
      {isOpenNotifications && (
        <div className="absolute rounded-2xl top-14 p-3 min-h-[250px] right-4 sm:w-96 max-w-sm  backdrop-blur-2xl ">
          {notifications?.map((n) => (
            <Link
            onClick={closeNotificationBox}
              to={"/orders"}
              className=" p-2 rounded-lg w-full block mt-2  bg-green-200"
              key={n?._id}>
             {n.split(" ").slice(0, 15).join(" ")}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
