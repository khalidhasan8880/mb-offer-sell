import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import { forwardRef } from "react";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({ isModalOpen, handleCancel, children}) {

  return (
    <div className="">
      <Dialog
        fullScreen
        open={isModalOpen}
        onClose={handleCancel}
        TransitionComponent={Transition}>
        <CloseIcon
          className="ms-auto mt-3 mr-3 cursor-pointer"
          onClick={handleCancel}
        />

      {
        children
      }
      </Dialog>
    </div>
  );
}
