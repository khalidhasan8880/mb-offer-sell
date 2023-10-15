import {  TextField } from "@mui/material";
import { useState } from "react";
import CopyToClipboard from "../../components/CopyClipboard";
import api from "../../hooks/interceptors";
import useAuth from "../../hooks/useAuth";

const SendMoney = ({ offer, formData, nextSlide }) => {
  const { user } = useAuth();
  const [sendMoneyFormData, setSendMoneyFormData] = useState({
    amount: "",
    transactionId: "",
  });
  const [errorMassage, setErrorMassage] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSendMoneyFormData({
      ...sendMoneyFormData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    const { offerName, price, operator, offerType, _id } = offer;

    if (!sendMoneyFormData?.amount) {
      setErrorMassage({ amount: true, message: "please give your number" });
      return;
    }

    if (!sendMoneyFormData?.transactionId) {
      setErrorMassage({
        transactionId: true,
        message: "please select a payment method",
      });
      return;
    }

    api
      .post(`payment/send-money?email=${user?.email}`, {
        ...formData,
        ...sendMoneyFormData,
        userEmail: user?.email,
        offerName,
        offerType,
        offerId: _id,
        operator,
        price,
        paymentSystem: "send money",
        date: new Date().toISOString(),
      })
      .then((res) => {
        console.log(res.data);
        alert("Long tap detected!");
        nextSlide()
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex gap-2 items-center mt-3">
        <h1 className="text-2xl font-semibold">01619167602</h1>
        <CopyToClipboard textToCopy="01619167602" />
      </div>
      <h2 className="text-base text-gray-700 mt-2 mb-3">
      দয়া করে এই নাম্বারে পেমেন্ট পাঠান: Bkash, Nagad, অথবা Rocket। পেমেন্ট সম্পূর্ণ হলে, আমাদের জানানোর জন্য আপনি Transaction ID এবং টাকার পরিমান লিখুন। ধন্যবাদ।
      </h2>
      <p className="text-gray-500 text-sm font-extralight">Transaction Id পেতে  আপনি আপনার মেসেজ চেক করুন টাকা পাঠানোর পর। </p>
      <div className="space-y-4 mt-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {offer?.offerName}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-left">
            <p className="text-sm text-gray-600">This offer is only available for:</p>
            <p className="text-sm text-gray-600">Sim Operator:</p>
            <p className="text-sm text-gray-600">Offer Type:</p>
            <p className="text-sm text-gray-600">Price:</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-500">{offer?.division}</p>
            <p className="text-sm text-gray-600">{offer?.operator}</p>
            <p className="text-sm text-gray-600">{offer?.offerType}</p>
            <p className="text-sm text-gray-600">{offer?.price}</p>
          </div>
        </div>
        <div className="mt-4">
          <TextField
            type="number"
            name="amount"
            label="Amount"
            variant="outlined"
            fullWidth
            value={sendMoneyFormData.amount}
            onChange={handleInputChange}
            required
          />
          {errorMassage?.amount && (
            <p className="text-red-500 text-sm mt-1">{errorMassage.message}</p>
          )}
        </div>
        <div className="mt-4">
          <TextField
            type="text"
            name="transactionId"
            label="Transaction Id"
            variant="outlined"
            fullWidth
            value={sendMoneyFormData.transactionId}
            onChange={handleInputChange}
            required
          />
          {errorMassage?.transaction && (
            <p className="text-red-500 text-sm mt-1">{errorMassage.message}</p>
          )}
        </div>
        <button
    onClick={handleFormSubmit}
    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform duration-300 ease-in-out"
  >
    Confirm
  </button>
      </div>
    </div>
  );
};

export default SendMoney;
