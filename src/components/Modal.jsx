import * as React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import api from "../hooks/interceptors";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({ isModalOpen, closeModal, selectedOfferId }) {
    const {user } = useAuth()
    const [offer, setOffer]= React.useState({})
    const [loading, setLoading]= React.useState(false)
React.useEffect(()=>{
    if (selectedOfferId) {
      setLoading(true)
        api.get(`/get-single-offer/${selectedOfferId}?email=${user?.email}`)
    .then(res=>{
        setOffer(res.data)
        setLoading(false)
    })
    }
},[selectedOfferId, user])
function isValidBangladeshPhoneNumber(phoneNumber) {
  var regex = /^(?:\+880|0)(?:\d{9}|\d{10})$/;
  return regex.test(phoneNumber);
}
const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const phoneNumber = formData.get("phoneNumber");
  const paymentMethod = formData.get("paymentMethod");
if (!phoneNumber) {
  return alert('check your phone number')
}
if (!isValidBangladeshPhoneNumber(phoneNumber)) {
  return alert("Invalid Bangladesh phone number")
}
if (!paymentMethod) {
  return alert('select a payment method')
}

};
if (loading) {
  return <Loading></Loading>
}
  return (
    <div>
      <Dialog

        fullScreen
        open={isModalOpen}
        onClose={closeModal}
        TransitionComponent={Transition}>
          <CloseIcon className="ms-auto mt-3 mr-3 cursor-pointer" onClick={closeModal} />
        

        <div className="container mx-auto p-4 max-w-md">
      <h2 className="font-semibold text-gray-800 text-2xl my-2">{offer?.offerName}</h2>
      <div className="flex justify-between mb-2">
        <div className="text-left">
          <p className="text-sm text-opacity-90 text-blue-500">This offer is only available for: </p>
        <p className="text-sm text-opacity-60 text-gray-600">Sim Operator:  </p>
          <p className="text-sm text-opacity-60 text-gray-600">Offer Type:</p>
          <p className="text-sm text-opacity-60 text-gray-600">Price:</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-opacity-90 text-blue-500">{offer?.division}</p>
        <p className="text-sm text-opacity-60 text-gray-600">{offer?.operator}  </p>
          <p className="text-sm text-opacity-60 text-gray-600">{offer?.offerType}</p>
          <p className="text-sm text-opacity-60 text-gray-600">{offer?.price}</p>
        </div>
      </div>
      <div className="my-4">
        <p className="text-sm text-opacity-80 text-gray-600 ">{ <span className="bg-red-500 text-white py-1 px-2">Note:</span>} {offer?.note} Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sapiente asperiores voluptatibus aut facilis saepe illum tempore reiciendis! Eos sint quas sequi molestiae blanditiis at porro expedita sapiente debitis consequatur.</p>
      </div>

      {/* Input field for phone number */}
      <form action="" onSubmit={handleSubmit}>
        <TextField
        type="phone"
        name="phoneNumber"
        label="Your Number"
        variant="outlined"
        className="w-full "
        
      />
      <FormControl component="fieldset" className="mt-4">
        <FormLabel component="legend" className="text-sm text-gray-600 mb-2">
          Select Payment Method:
        </FormLabel>
        <RadioGroup name="paymentMethod">
          <FormControlLabel value="bkash" control={<Radio />} label="Bkash" className="text-sm text-gray-600 mb-2" />
          <FormControlLabel value="nagad" control={<Radio />} label="Nagad" className="text-sm text-gray-600 mb-2" />
          <FormControlLabel value="upay" control={<Radio />} label="Upay" className="text-sm text-gray-600 mb-2" />
        </RadioGroup>
      </FormControl>
      <div className="mt-5">
      <button
      type="submit"
          className=" bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-200">
          Confirm 
        </button>
       
      </div>
      </form>
    </div>
      </Dialog>
    </div>
  );
}
