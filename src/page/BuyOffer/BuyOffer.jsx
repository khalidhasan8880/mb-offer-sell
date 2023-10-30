import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../hooks/interceptors";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {TextField} from "@mui/material";
import Carousel from "../../components/Carousel";
import SendMoney from "../PaymentSystem/SendMoney";
import PayWithBalance from "../PaymentSystem/PayWithBalance";
const BuyOffer = () => {
  const [paymentSystem, setPaymentSystem] = useState(null);
  const [offer, setOffer] = useState({});
  const [loading, setLoading] = useState(false);
  const { offerId } = useParams();
  const { user } = useAuth();
  const sliderRef = useRef(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
  });
  const [errorMassage, setErrorMassage] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // get selected offer
  useEffect(() => {
    if (offerId) {
      setLoading(true);
      api
        .get(`/get-single-offer/${offerId}?email=${user?.email}`)
        .then((res) => {
          setOffer(res.data);
          setLoading(false);
        });
    }
  }, [offerId, user]);

  function isValidBangladeshPhoneNumber(phoneNumber) {
    var regex = /^(?:\+880|0)(?:\d{9}|\d{10})$/;
    return regex.test(phoneNumber);
  }
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };
  const paymentSystemHandler = (system) => {
    if (!formData?.phoneNumber) {
      setErrorMassage({
        phoneNumber: true,
        message: "please give your number",
      });
      return;
    }
    if (!isValidBangladeshPhoneNumber(formData?.phoneNumber)) {
      setErrorMassage({
        phoneNumber: true,
        message: "please give your number correctly",
      });
      return;
    }
   
    setPaymentSystem(system);
    setErrorMassage({});
    nextSlide();
  };

  

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <section className="">
      <Carousel sliderRef={sliderRef}  className="">
      <div className="max-w-2xl mx-auto">
          <h2 className="font-semibold text-gray-800 text-2xl my-2">
            {offer?.offerName}
          </h2>
          <div className="flex justify-between mb-2 items-center gap-2">
            <p className="text-sm text-opacity-90 text-blue-500">
              Available for:{" "}
            </p>
            <p className="text-sm text-opacity-90 text-blue-500">
              {offer?.division}
            </p>
          </div>
          <div className="flex justify-between mb-2 items-center gap-2">
            <p className="text-sm text-opacity-60 text-gray-600">
              Sim Operator:{" "}
            </p>
            <p className="text-sm text-opacity-60 text-gray-600">
              {offer?.operator}{" "}
            </p>
          </div>
          <div className="flex justify-between mb-2 items-center gap-2">
            <p className="text-sm text-opacity-60 text-gray-600">Offer Type:</p>
            <p className="text-sm text-opacity-60 text-gray-600">
              {offer?.offerType}
            </p>
          </div>
          <div className="flex justify-between mb-2 items-center gap-2">
            <p className="text-sm text-opacity-60 text-gray-600">Price:</p>
            <p className="text-sm text-opacity-60 text-gray-600">
              {offer?.price}
            </p>
          </div>
          <div className="my-4">
            <p className="text-sm text-opacity-80 text-gray-600 ">
              {<span className="bg-red-500 text-white py-1 px-2">Note:</span>}{" "}
              {offer?.note} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Tempora sapiente asperiores voluptatibus aut facilis saepe
              illum tempore reiciendis! Eos sint quas sequi molestiae blanditiis
              at porro expedita sapiente debitis consequatur.
            </p>
          </div>

          {/* Input field for phone number */}
          <div >
              <TextField
                type="phone"
                name="phoneNumber"
                label="Your Number"
                variant="outlined"
                className="w-full"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <p className="text-red-500">
                {errorMassage?.phoneNumber && errorMassage?.message}
              </p>
            </div>
         
            <div className="flex justify-center items-center flex-col gap-3 mt-6">
              <button
                type="submit"
                onClick={() => paymentSystemHandler("Pay with Balance")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform duration-300 ease-in-out m-2">
                Pay with Balance
              </button>
              <button
                onClick={() => paymentSystemHandler("Send Money")}
                className=" mx-auto block bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform duration-300 ease-in-out m-2">
                Send Money
              </button>
            </div>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <button onClick={prevSlide} className=" left-4 top-4">
              {" "}
              <ArrowBackIcon fontSize="large" />
            </button>
            <h3>{paymentSystem}</h3>
          </div>
          {paymentSystem === "Pay with Balance" ? (
            <PayWithBalance
              offer={offer}
              formData={formData}
              nextSlide={nextSlide}></PayWithBalance>
          ) : (
            <SendMoney
              offer={offer}
              formData={formData}
              nextSlide={nextSlide}></SendMoney>
          )}
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-8 p-8 bg-gray-100 rounded-lg shadow-lg">
    <h3 className="font-bold text-center mb-4">🎉 Congratulations! 🥳</h3>
    <p className="text-lg text-center mb-8">You will receive {offer?.offerName}  very soon.<br /> We handle or process it manually .Please wait for next 5-30 minutes to complete. Thank you! 🌟</p>
    <Link to='/' className="w-full bg-green-500  hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-center ">
         Ok 
    </Link>
</div>


      </Carousel>
    </section>
  );
};

export default BuyOffer;
