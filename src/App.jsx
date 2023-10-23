import { Outlet } from "react-router-dom";
import "./App.css";
import BottomNav from "./components/BottomNav";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [isOpenUserDrawer, setIsOpenUserDrawer] = useState(false);

  const openUserDrawer = () => {
    setIsOpenUserDrawer(!isOpenUserDrawer);
  };
  return (
    <>
     
      <Navbar openUserDrawer={openUserDrawer}></Navbar>
      <Outlet></Outlet>
      <BottomNav></BottomNav>
    </>
  );
}

export default App;
