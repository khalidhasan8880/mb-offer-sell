import {  TextField , Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel, } from "@mui/material";
  import { useState } from "react";
  import api from "../../hooks/interceptors";
  import useAuth from "../../hooks/useAuth";
  import ErrorModal from "../../components/ErrorModal";
  
  const Deposit = () => {
    const { user, balance } = useAuth();
    const [error, setError] = useState(null); 
    const [errorModalOpen, setErrorModalOpen] = useState(false);
  
    const [depositFormData, setDepositFormData] = useState({
      paymentMethod:"",
      amount: "",
      transactionId: "",
    });
    const [errorMassage, setErrorMassage] = useState({});
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setDepositFormData({
        ...depositFormData,
        [name]: value,
      });
    };
  
    const handleFormSubmit = () => {
 
      if (!depositFormData?.amount) {
        setErrorMassage({ amount: true, message: "please give your number" });
        return;
      }
      if (depositFormData?.amount > balance) {
        setErrorMassage({ amount: true, message: "you don't have enough balance to deposit" });
        return;
      }
      if (!depositFormData?.paymentMethod) {
        setErrorMassage({ paymentMethod: true, message: "please select your mobile bank" });
        return;
      }
  
      if (!depositFormData?.transactionId) {
        setErrorMassage({
          transactionId: true,
          message: "please select a payment method",
        });
        return;
      }
  
      api
        .post(`deposit-balance`, {
          ...depositFormData,
          userEmail: user?.email,
          date: new Date().toISOString(),
        })
        .then((res) => {
          console.log(res.data);
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
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h3>যেই মোবাইল ব্যাংকে টাকা ফেরত নিতে চান সেই মোবাইল ব্যাংক সিলেক্ট করুন । টাকার পরিমান  এবং যেই নাম্বারে টাকা ফেরত নিতে চান সেই নাম্বার লিখে  সাববিট করুন </h3>
        <div className="space-y-4 mt-2">         
          <FormControl component="fieldset" className="mt-4">
                <FormLabel
                  component="legend"
                  className="text-sm text-gray-600 mb-2">
                  Select Payment Method:
                </FormLabel>
                <RadioGroup
                  name="paymentMethod"
                  value={depositFormData.paymentMethod}
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
              value={depositFormData.amount}
              onChange={handleInputChange}
              required
            />
            {errorMassage?.amount && (
              <p className="text-red-500 text-sm mt-1">{errorMassage.message}</p>
            )}
          </div>
        
          <div className="mt-4">
            <TextField
              type="number"
              name="number"
              label="Number"
              variant="outlined"
              fullWidth
              value={depositFormData.number}
              onChange={handleInputChange}
              required
            />
            {errorMassage?.number && (
              <p className="text-red-500 text-sm mt-1">{errorMassage.message}</p>
            )}
          </div>
        
          <button
      onClick={handleFormSubmit}
      className={` w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform duration-300 ease-in-out `}
      disabled={ balance < 1}
    >
      Submit
    </button>
        </div>
        <ErrorModal open={errorModalOpen} onClose={handleCloseErrorModal} error={error} />
      </div>
    );
  };
  
  export default Deposit;
  