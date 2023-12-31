import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import api from "../../../hooks/interceptors";
import { Link } from "react-router-dom";
import Greeting from "../../../components/Greeting";

const Banner = () => {
  const { user, balance, estimateCost } = useAuth();
  const avatarLetter = user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase();
console.log(balance);
  return (
    <section className="overflow-hidden tracking-tight sm:flex items-center justify-between bg-gradient-to-r from-blue-600/20 to-green-400/30  rounded-lg shadow-lg py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 items-start">
        <div className="flex items-center">
          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg">
            {avatarLetter}
          </div>
          <div className="ml-4">
            <Greeting className="font-bold text-2xl text-black/60 tracking-tight"></Greeting>
            <h2 className="my-0 font-extrabold text-black/60">{user?.displayName}</h2>           
          </div>
        </div>
        <div className="flex flex-wrap gap-y-4 w-full justify-between sm:flex-col items-center sm:items-start  ">
        <h2 className={`text-2xl font-bold ${balance >= 0 ? 'text-teal-500':'text-red-500'}`}>Balance : {balance || "..." } ৳</h2>
        <Link
          className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-200 "
          to="/add_balance">
          Add Balance
        </Link>
        </div>
      </div>
      <div className="flex-between flex-wrap items-end sm:flex-col  sm:text-right mt-5 sm:mt-0">
        <h2 className="text-2xl font-bold sm:mb-2 text-black/60">Total Cost</h2>
        <div>
          <h2 className="text-sm font-semibold text-black/60">This Month: {estimateCost?.monthlyCost} ৳</h2>
          <h2 className="text-sm font-semibold text-black/60">This Year: {estimateCost?.yearlyCost} ৳</h2>
        </div>
      </div>
    </section>
  );
};

export default Banner;
