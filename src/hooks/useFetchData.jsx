// import { useQuery } from "@tanstack/react-query";
// import api from "./interceptors";
// import useAuth from "./useAuth";

// const useFetchData = (path, queryKey) => {
//   const {user, loading} = useAuth()

//     const {data, isLoading } = useQuery({
//       enabled:!!user?.email && !loading,
//         queryKey:[queryKey],
//         queryFn:async ()=>{
//           const res= await api.get(`${path}?email=${user?.email}`)
//           return res.data
//         }
//     })
//     return [data, isLoading]
// };

// export default useFetchData;