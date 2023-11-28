import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Airtel from "./page/Airtel/Airtel.jsx";
import Robi from "./page/Robi/Robi.jsx";
import GrameenPhone from "./page/GrameenPhone/GrameenPhone.jsx";
import Banglalink from "./page/Banglalink/Banglalink.jsx";
import Teletalk from "./page/Teletalk/Teletalk.jsx";
import Home from "./page/Home/Home.jsx";
import Reg from "./page/Login&Reg/Reg.jsx";
import SignIn from "./page/Login&Reg/Login.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import AdminRoute from "./AdminRoute/AdminRoute.jsx";
import ManageOffer from "./page/AdminPage/ManageOffer/ManageOffer.jsx";
import AdminHome from "./page/AdminPage/AdminHome/AdminHome.jsx";
import AddOffer from "./page/AdminPage/AddOffer/AddOffer.jsx";
import ManageUser from "./page/AdminPage/ManageUser/ManageUser.jsx";
import BuyOffer from "./page/BuyOffer/BuyOffer.jsx";
import Orders from "./page/AdminPage/Orders.jsx/Orders.jsx";
import PrivetRoute from "./PrivetRoute/PrivetRoute.jsx";
import Dashboard from "./page/Dashboard/Dashboard.jsx";
import Profile from "./page/Profile/Profile.jsx";
import First from "./TestSome/First.jsx";
import UserOrders from "./page/UserOrders.jsx/UserOrders.jsx";
import AddBalance from "./page/AddBalance/AddBalance.jsx";
import BalanceRequest from "./page/AdminPage/BalanceRequest/BalanceRequest.jsx";
import Deposit from "./page/Deposit/Deposit.jsx";
import Transaction from "./page/Transaction/Transaction.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/test_some",
        element: <First></First>,
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "add_balance",
        element: <AddBalance></AddBalance>
      },
      {
        path: "airtel",
        element: <Airtel></Airtel>,
      },
      {
        path: "airtel/buy/:offerId",
        element:<BuyOffer></BuyOffer>,
      },
      {
        path: "robi",
        element: <Robi></Robi>,
      },
      {
        path: "robi/buy/:offerId",
        element:<BuyOffer></BuyOffer>,
      },
      {
        path: "grameenphone",
        element: <GrameenPhone></GrameenPhone>,
      },
      {
        path: "grameenphone/buy/:offerId",
        element:<BuyOffer></BuyOffer>,
      },
      {
        path: "banglalink",
        element: <Banglalink></Banglalink>,
      },
      {
        path: "banglalink/buy/:offerId",
        element:<BuyOffer></BuyOffer>,
      },
      {
        path: "teletalk",
        element: <Teletalk></Teletalk>,
      },
      {
        path: "teletalk/buy/:offerId",
        element:<BuyOffer></BuyOffer>,
      },
      // {
      //   path: "buy/:offerId",
      //   element: <BuyOffer></BuyOffer>
      // },
      {
        path: "login",
        element: <SignIn></SignIn>,
      },
      {
        path: "reg",
        element: <Reg></Reg>,
      },
      {
        path: "profile",
        element: <PrivetRoute><Profile></Profile></PrivetRoute>,
      },
      {
        path: "orders",
        element: <PrivetRoute><UserOrders></UserOrders></PrivetRoute>,
      },
      {
        path: "deposit",
        element: <PrivetRoute><Deposit></Deposit></PrivetRoute>,
      },
      {
        path: "transaction",
        element: <PrivetRoute><Transaction></Transaction></PrivetRoute>,
      },
    ],
  },
  {
    path:'dashboard',
    element:<AdminRoute><Dashboard></Dashboard></AdminRoute>,
    children:[
      {
        path:'', 
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'balance_request', 
        element:<AdminRoute><BalanceRequest></BalanceRequest></AdminRoute>
      },
      {
        path:'orders', 
        element:<AdminRoute><Orders></Orders></AdminRoute>
      },
      // {
      //   path:'manage_deposit', 
      //   element:<AdminRoute></AdminRoute>
      // },
      {
        path:'manage_users', 
        element:<AdminRoute><ManageUser></ManageUser></AdminRoute>
      },
      {
        path:'manage_offers', 
        element:<AdminRoute><ManageOffer></ManageOffer></AdminRoute>
      },
      {
        path:'add_offer', 
      element:<AdminRoute><AddOffer></AddOffer></AdminRoute>
      },
      {
        path:'offer/airtel', 
        element:<AdminRoute></AdminRoute>
      },
      {
        path:'offer/robi', 
        element:<AdminRoute><ManageOffer></ManageOffer></AdminRoute>
      },
      {
        path:'offer/airtel', 
        element:<AdminRoute><ManageOffer></ManageOffer></AdminRoute>
      },
      {
        path:'offer/airtel', 
        element:<AdminRoute><ManageOffer></ManageOffer></AdminRoute>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
