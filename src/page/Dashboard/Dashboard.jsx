
import { Outlet } from "react-router-dom";
import AdminDrawer from "../../components/AdminDrawer";
import useAdmin from "../../hooks/useAdmin";
import UserDrawer from "../../components/UserDrawer";
const Dashboard = () => {
    const {isAdmin} = useAdmin()
    console.log(isAdmin);
  return (
    <>
     { isAdmin ? <AdminDrawer></AdminDrawer>: <UserDrawer></UserDrawer>}
     <Outlet></Outlet>
    </>
  );
};









export default Dashboard;





