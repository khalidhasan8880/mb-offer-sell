const OfferCard = ({ offer, handleBuyClick }) => {
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substr(0, maxLength) + '...';
      }
      return text;
    };
  

    return (
      <div className="relative max-w-md mx-auto my-8 bg-white rounded-md shadow-lg p-6">
        <button
          onClick={()=> handleBuyClick(offer?._id)}
          className="absolute top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-200">
          Buy
        </button>
        <h2 className="font-semibold text-gray-800 text-xl my-2">
          {truncateText(offer.offerName, 40)}
        </h2>
        <div className="flex justify-between mb-2">
          <div className="text-left">
            <p className="text-sm text-gray-600">{truncateText(offer.operator, 30)}</p>
            <p className="text-sm text-gray-600">{truncateText(offer.division, 30)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{truncateText(offer.offerType, 30)}</p>
            <p className="text-sm text-gray-600">{truncateText(offer.price, 30)}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 cursor-pointer underline">
            {truncateText(offer.note, 100)}
          </p>
        </div>
      </div>
    );
  };
  
  export default OfferCard;
  