import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import api from "../hooks/interceptors";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import Carousel from "./Carousel";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({ isModalOpen, closeModal, selectedOfferId }) {
  const { user } = useAuth();
  const [offer, setOffer] = useState({});
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState(null);

  // carousel Handler
  const sliderRef = useRef(null);
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };
// get selected offer
useEffect(() => {
  if (selectedOfferId) {
    setLoading(true);
    api
      .get(`/get-single-offer/${selectedOfferId}?email=${user?.email}`)
      .then((res) => {
        setOffer(res.data);
        setLoading(false);
      });
  }
}, [selectedOfferId, user]);
  


// confirm button Handler with 3 second countdown
  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      const formElement = document.querySelector("form");
      console.log(formElement);

      const formData = new FormData(formElement);
      const phoneNumber = formData.get("phoneNumber");
      console.log(phoneNumber);
    }

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  let touchStartTime;
  let touchTimeout;

  function handleTouchStart() {
    setIsActive(true);
    setSeconds(3);
    touchStartTime = new Date().getTime();
    touchTimeout = setTimeout(longTap, 3000);
  }

  function handleTouchEnd() {
    setIsActive(false);
    clearTimeout(touchTimeout);
  }

  function longTap() {
    api
      .post("payment", { ...formData, date: touchStartTime })
      .then((res) => {
        console.log(res.data);
        alert("Long tap detected!");
        nextSlide()
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  }
 



// submit data handler 
  function isValidBangladeshPhoneNumber(phoneNumber) {
    var regex = /^(?:\+880|0)(?:\d{9}|\d{10})$/;
    return regex.test(phoneNumber);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // ei jaigai sob time table set korbo kalke ok>>>>>>

    const formData = new FormData(event.target);
    const phoneNumber = formData.get("phoneNumber");
    const paymentMethod = formData.get("paymentMethod");

    if (!phoneNumber) {
      return alert("check your phone number");
    }
    if (!isValidBangladeshPhoneNumber(phoneNumber)) {
      return alert("Invalid Bangladesh phone number");
    }
    if (!paymentMethod) {
      return alert("select a payment method");
    }
    const {offerName, offerType, price, operator, _id} =  offer
    setFormData({
      offerName,offerType, price,operator, OfferId:_id,
      phoneNumber,
      paymentMethod,
      userName: user?.displayName,
      userEmail: user?.email,
    });
    nextSlide();
    // if (seconds === 0) {
    //   api.put('payment')
    //   alert('Payment Successful')
    //   setIsActive(false)
    //   setSeconds(5)
    //   closeModal()
    //  }
  };

// loading animation
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="">
      <Dialog
        fullScreen
        open={isModalOpen}
        onClose={closeModal}
        TransitionComponent={Transition}>
        <CloseIcon
          className="ms-auto mt-3 mr-3 cursor-pointer"
          onClick={closeModal}
        />

        <Carousel sliderRef={sliderRef}>
          <div>
            <h2 className="font-semibold text-gray-800 text-2xl my-2">
              {offer?.offerName}
            </h2>
            <div className="flex justify-between mb-2">
              <div className="text-left">
                <p className="text-sm text-opacity-90 text-blue-500">
                  This offer is only available for:{" "}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  Sim Operator:{" "}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  Offer Type:
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">Price:</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-opacity-90 text-blue-500">
                  {offer?.division}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  {offer?.operator}{" "}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  {offer?.offerType}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  {offer?.price}
                </p>
              </div>
            </div>
            <div className="my-4">
              <p className="text-sm text-opacity-80 text-gray-600 ">
                {<span className="bg-red-500 text-white py-1 px-2">Note:</span>}{" "}
                {offer?.note} Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Tempora sapiente asperiores voluptatibus aut facilis saepe
                illum tempore reiciendis! Eos sint quas sequi molestiae
                blanditiis at porro expedita sapiente debitis consequatur.
              </p>
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
                <FormLabel
                  component="legend"
                  className="text-sm text-gray-600 mb-2">
                  Select Payment Method:
                </FormLabel>
                <RadioGroup name="paymentMethod">
                  <FormControlLabel
                    value="bkash"
                    control={<Radio />}
                    label="Bkash"
                    className="text-sm text-gray-600 mb-2"
                  />
                  <FormControlLabel
                    value="nagad"
                    control={<Radio />}
                    label="Nagad"
                    className="text-sm text-gray-600 mb-2"
                  />
                  <FormControlLabel
                    value="upay"
                    control={<Radio />}
                    label="Upay"
                    className="text-sm text-gray-600 mb-2"
                  />
                </RadioGroup>
              </FormControl>
              <div className="flex justify-center items-center ">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform duration-300 ease-in-out m-2"
                 >
                  Pay with Balance
                </button>
              </div>
            </form>
            <button
              className=" mx-auto block bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform duration-300 ease-in-out m-2"
        >
              Pay with Mobile Bank
            </button>
          </div>
          <div className="text-3xl  ">
            <div className="flex gap-2 items-center">
              <button onClick={prevSlide} className=" left-4 top-4">
                {" "}
                <ArrowBackIcon fontSize="large" />
              </button>
              <h3>hello</h3>
            </div>
            <h2 className="font-semibold text-gray-800 text-2xl my-2">
              {offer?.offerName}
            </h2>
            <h2 className="text-2xl font-bold ">
              Number :{formData?.phoneNumber}
            </h2>
            <div className="flex justify-between mb-2">
              <div className="text-left">
                <p className="text-sm text-opacity-90 text-blue-500">
                  This offer is only available for:{" "}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  Sim Operator:{" "}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  Offer Type:
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">Price:</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-opacity-90 text-blue-500">
                  {offer?.division}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  {offer?.operator}{" "}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  {offer?.offerType}
                </p>
                <p className="text-sm text-opacity-60 text-gray-600">
                  {offer?.price}
                </p>
              </div>
            </div>

           
            <button
              className=" mt-10 mx-auto block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform duration-300 ease-in-out m-2"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}>
              Confirm
            </button>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <h3>আপনার অনুরোধ  আমাদের কাছে পৌঁছানো হয়েছে। আমরা এটি  মেনুয়ালি প্রসেস করে থাকি, তাই দয়া করে ১ থেকে ২০ মিনিট ধরে অপেক্ষা করুন।</h3>
            <p>{"We're currently processing this for you manually. Please hang on for approximately 1 to 20 minutes. We'll make it look beautiful, and you can trust us on that!"}</p>
            <button onClick={closeModal} className="mt-10  bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform duration-300 ease-in-out m-2">Ok</button>
          </div>
        </Carousel>


        {seconds && isActive && (
              <h1
                className="fixed top-1/12 left-1/2 -translate-y-1/12 -translate-x-1/2 font-bold text-5xl text-white bg-gradient-to-r from-blue-500 to-purple-500 p-6   animate-pulse"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}>
                {seconds}
              </h1>
            )}
      </Dialog>
    </div>
  );
}
