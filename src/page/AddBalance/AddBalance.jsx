import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import api from "../../hooks/interceptors";
import ErrorModal from "../../components/ErrorModal";
import CopyToClipboard from "../../components/CopyClipboard";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const AddBalance = () => {
    const { user } = useAuth();
    const [error, setError] = useState(null); 
    const [errorModalOpen, setErrorModalOpen] = useState(false);
  const navigate = useNavigate()
    const [sendMoneyFormData, setSendMoneyFormData] = useState({
      paymentMethod:"",
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
       
        if (!sendMoneyFormData?.amount) {
          setErrorMassage({ amount: true, message: "please give your number" });
          return;
        }
        if (!sendMoneyFormData?.paymentMethod) {
          setErrorMassage({ paymentMethod: true, message: "please select your mobile bank" });
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
          .post(`/add-balance?email=${user?.email}`, {
            ...sendMoneyFormData,
            userEmail: user?.email,
            status:"pending",
            date: new Date().toISOString(),
          })
          .then((res) => {
            navigate('/')
          })
          .catch(() => {
            setError({ error: true, message: "An error occurred. Please try again later." });
            setErrorModalOpen(true);
          });
      };
      const handleCloseErrorModal = () => {
        setErrorModalOpen(false); 
        setError(null); 
      };
    return (
        <section>

<div className="flex gap-2 items-center mt-3">
        <h1 className="text-2xl font-semibold">01619167602</h1>
        <CopyToClipboard textToCopy="01619167602" />
      </div>
      <h2 className="text-base text-gray-700 mt-2 mb-3">
      অনুগ্রহ করে এই নাম্বারে পেমেন্ট পাঠান: Bkash, Nagad, অথবা Rocket। পেমেন্ট সম্পূর্ণ হলে, পেইমেন্টের প্রামান হিসেবে Transaction ID এবং টাকার পরিমান লিখুন। ধন্যবাদ।
      </h2>
      <p className="text-gray-500 text-sm font-extralight mb-3">Transaction Id পেতে টাকা পাঠানোর পর আপনার মেসেজ চেক করুন।</p>
                    <FormControl component="fieldset" className="mt-4">
              <FormLabel
                component="legend"
                className="text-sm text-gray-600 mb-2">
                Select Payment Method:
              </FormLabel>
              <RadioGroup
                name="paymentMethod"
                value={sendMoneyFormData.paymentMethod}
                onChange={handleInputChange}
                >
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
              <p className="text-red-500">
                {errorMassage?.paymentMethod && errorMassage?.message}
              </p>
            </FormControl>
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
   
  <CustomButton onClick={handleFormSubmit}  className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-auto block mt-2' label='Confirm'></CustomButton>

  <ErrorModal open={errorModalOpen} onClose={handleCloseErrorModal} error={error} />
        </section>
    );
};

export default AddBalance;