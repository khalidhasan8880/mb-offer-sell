import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import api from "../../../hooks/interceptors";

const Banner = () => {
  const [balance, setBalance] = useState('')
  const {user} = useAuth()
  const avatarLetter = user?.displayName || user?.email.charAt(0).toUpperCase();
  console.log(user);
     useEffect(()=>{
      const token = localStorage.getItem("token")
      if (token) {
        api.get(`/get-balance?email=${user?.email}`)
        .then(res=>{
          setBalance(res.data?.balance)
        })
      }
     
     },[user?.email])

    return (
      <section className="bg-gradient-to-r from-blue-600 to-green-400 text-white rounded-lg shadow-lg py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {avatarLetter}
            </div>
            <div className="ml-4">
              <h2 className="my-0 text-white text-2xl">{user?.displayName}</h2>
              <p className="text-gray-200 mt-1 text-lg">{user?.email}</p>
            </div>
          </div>
          <div className="flex-between sm:flex-col sm:text-right mt-5 sm:mt-0">
            <div className="text-white">
              <p className="sm:text-2xl text-lg">Total Balance</p>
              <h2 className="text-2xl">{balance}</h2>
            </div>
            <div>
              <p className="sm:text-2xl text-lg">Monthly Cost:</p>
              <h2 className="text-2xl">$XXX</h2>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Banner;
  