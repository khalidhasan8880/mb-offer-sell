
import { Outlet } from "react-router-dom";
import Drawer from "../../components/Drawer";
const AdminDashboard = () => {

  const menuItems = ["Home", "Users", "Offers"] 
  const subOfferMenuItem = ["aritel", "robi", "grameenphone", "banglalink",
   "teletalk"] 
   const mainPath = "admin_dashboard"
  return (
    <>
     <Drawer menuItems={menuItems} subOfferMenuItem={subOfferMenuItem} mainPath={mainPath}></Drawer>
     <Outlet></Outlet>
    </>
  );
};









export default AdminDashboard;





