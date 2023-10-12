import { Navigate } from "react-router-dom";


import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {isAdmin} = useAdmin()
   if (loading) {
    return <Loading></Loading>
   }
   if (user && isAdmin) {
    return children
   }else{
    <Navigate to='/login'></Navigate>
   }
  
    
};

export default AdminRoute;
