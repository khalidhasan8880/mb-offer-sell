
import { useState } from "react";
import api from "../../hooks/interceptors";
import useAuth from "../../hooks/useAuth";
import ErrorModal from "../../components/ErrorModal";

const PayWithBalance = ({ offer, formData,nextSlide }) => {
  const { user } = useAuth();
  const [error, setError] = useState(null); 
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleFormSubmit = async () => {
    const { offerName, price, operator, offerType, _id } = offer;
    await api
      .post(`/payment/pay-with-balance?email=${user?.email}`, {
        ...formData,
        userEmail: user?.email,
        offerName,
        offerType,
        offerId: _id,
        operator,
        price,
       
        paymentSystem: "pay with balance",
        date: new Date().toISOString(),
      })
      .then((res) => {
        console.log(res?.data);
        
        if (res.response?.data?.error) {
          setError({ error: true, message: "Please check your balance or try again later." });
          setErrorModalOpen(true);
          return 
        }
        nextSlide()
      })
      .catch(() => {
        setError({ error: true, message: "Please check your balance or try again later." });
          setErrorModalOpen(true);
      });
  };
  const handleCloseErrorModal = () => {
    setErrorModalOpen(false); 
    setError(null); 
  };

  return (
    <section>
     <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
  <h2 className="text-3xl font-semibold text-gray-800 mb-4">
    {offer?.offerName}
  </h2>
  <p className="text-xl font-bold mb-4">Number: {formData?.phoneNumber}</p>

  <div className="grid grid-cols-2 gap-4 mb-4">
    <div className="text-left">
      <p className="text-sm text-blue-500">Available For:</p>
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

  <button
    onClick={handleFormSubmit}
    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform duration-300 ease-in-out"
  >
    Confirm
  </button>
</div>

<ErrorModal open={errorModalOpen} onClose={handleCloseErrorModal} error={error} />
    </section>
  );
};

export default PayWithBalance;
