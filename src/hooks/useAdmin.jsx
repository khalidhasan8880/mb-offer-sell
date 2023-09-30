
import { useContext, useEffect, useState } from "react";
import api from "./interceptors";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (!loading && !!localStorage.getItem('token')) {
        api.post(`/isAdmin?email=${user?.email}`).then((res) => {
            setData(res.data);
            setIsAdminLoading(false)
          });
    }
  }, [user, loading]);
    return {isAdmin: data?.isAdmin, isAdminLoading}
};

export default useAdmin;
