import { Navigate } from "react-router-dom";


import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth()
   if (loading) {
    return <Loading></Loading>
   }
   if (user) {
    return children
   }else{
    <Navigate to='/login'></Navigate>
   }
  
    
};

export default PrivetRoute;
