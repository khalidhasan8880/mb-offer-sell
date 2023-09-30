
const OfferCard = ({ offer,handleBuyClick }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    }
    return text;
  };



  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-md shadow-lg overflow-hidden hover:shadow-xl transition duration-200 ease-in-out transform hover:scale-105 relative">
      <button
        onClick={handleBuyClick}
        className="absolute top-4 right-4 bg-teal-500 text-white px-5 py-2 rounded-full hover:bg-teal-600 transition duration-200">
        Buy
      </button>
      <div className="p-6">
        <h2 className="offer_card_title font-semibold text-gray-800 mb-2">
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
        <div className="mt-8">
          <p className="text-sm text-gray-600 mb-2">
            <span className="cursor-pointer underline">
              {truncateText(offer.note, 100)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
