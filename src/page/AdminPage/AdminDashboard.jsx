
import { Outlet } from "react-router-dom";
import AdminDrawer from "../../components/AdminDrawer";
const AdminDashboard = () => {

  const menuItems = ["Admin Home", "Users", "Offers"] 
  const subOfferMenuItem = ["aritel", "robi", "grameenphone", "banglalink",
   "teletalk"] 
   const mainPath = "admin_dashboard"
  return (
    <>
     <AdminDrawer menuItems={menuItems} subOfferMenuItem={subOfferMenuItem} mainPath={mainPath}></AdminDrawer>
     <Outlet></Outlet>
    </>
  );
};









export default AdminDashboard;





