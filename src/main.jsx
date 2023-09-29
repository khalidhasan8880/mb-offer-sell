import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Airtel from './page/Airtel/Airtel.jsx';
import Robi from './page/Robi/Robi.jsx';
import GrameenPhone from './page/GrameenPhone/GrameenPhone.jsx';
import Banglalink from './page/Banglalink/Banglalink.jsx';
import Teletalk from './page/Teletalk/Teletalk.jsx';
import Home from './page/Home/Home.jsx';
import Reg from './page/Login&Reg/Reg.jsx';
import SignIn from './page/Login&Reg/Login.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'airtel',
        element:<Airtel></Airtel>
      },
      {
        path:'robi',
        element:<Robi></Robi>
      },
      {
        path:'grameenphone',
        element:<GrameenPhone></GrameenPhone>
      },
      {
        path:'banglalink',
        element:<Banglalink></Banglalink>
      },
      {
        path:'teletalk',
        element:<Teletalk></Teletalk>
      },
      {
        path:'login',
        element:<SignIn></SignIn>
      },
      {
        path:'reg',
        element:<Reg></Reg>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
