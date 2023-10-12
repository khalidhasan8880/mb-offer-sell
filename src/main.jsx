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
import AdminDashboard from "./page/AdminPage/AdminDashboard.jsx";
import AdminHome from "./page/AdminPage/AdminHome/AdminHome.jsx";
import AddOffer from "./page/AdminPage/AddOffer/AddOffer.jsx";
import ManageUser from "./page/AdminPage/ManageUser/ManageUser.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "airtel",
        element: <Airtel></Airtel>,
      },
      {
        path: "robi",
        element: <Robi></Robi>,
      },
      {
        path: "grameenphone",
        element: <GrameenPhone></GrameenPhone>,
      },
      {
        path: "banglalink",
        element: <Banglalink></Banglalink>,
      },
      {
        path: "teletalk",
        element: <Teletalk></Teletalk>,
      },
      {
        path: "login",
        element: <SignIn></SignIn>,
      },
      {
        path: "reg",
        element: <Reg></Reg>,
      },
    ],
  },
  {
    path:'admin_dashboard',
    element:<AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
    children:[
      {
        path:'admin_home', 
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'manage_users', 
        element:<AdminRoute><ManageUser></ManageUser></AdminRoute>
      },
      {
        path:'offers', 
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
