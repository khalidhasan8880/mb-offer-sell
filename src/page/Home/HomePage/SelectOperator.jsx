
import { Link } from "react-router-dom";
import robi from '../../../assets/robi.png'
import airtel from '../../../assets/airtel.png'
import teletalk from '../../../assets/teletalk.png'
import banglalink from '../../../assets/banglalink.png'
import grameenphone from '../../../assets/grameenphone.png'
const SelectOperator = () => {
  return (
    <section className="bg-gray-200">
    <h3 className="text-4xl text-center my-4 font-bold text-green-500 ">Choose Your Operator</h3>
    <div className="flex flex-wrap justify-center gap-4 lg:pb-7 lg:pt-3">
      <Link
        to="/robi"
        className="flex flex-col items-center justify-center bg-white p-4 rounded-lg w-32 h-32 hover:bg-gray-100  transition duration-300 ease-in-out"
      >
        <img
          src={robi}
          alt="Robi"
          className="w-20 h-20 object-contain"
        />
      </Link>
      <Link
        to="/airtel"
        className="flex flex-col items-center justify-center bg-white p-4 rounded-lg w-32 h-32 hover:bg-gray-100  transition duration-300 ease-in-out"
      >
        <img
          src={airtel}
          alt="Airtel"
          className="w-20 h-20 object-contain"
        />
      </Link>
      <Link
        to="/grameenphone"
        className="flex flex-col items-center justify-center bg-white p-4 rounded-lg w-32 h-32 hover:bg-gray-100  transition duration-300 ease-in-out"
      >
        <img
          src={grameenphone}
          alt="Grameenphone"
          className="w-20 h-20 object-contain"
        />
      </Link>
      <Link
        to="/banglalink"
        className="flex flex-col items-center justify-center bg-white p-4 rounded-lg w-32 h-32 hover:bg-gray-100  transition duration-300 ease-in-out"
      >
        <img
          src={banglalink}
          alt="Banglalink"
          className="w-20 h-20 object-contain"
        />
      </Link>
      <Link
        to="/teletalk"
        className="flex flex-col items-center justify-center bg-white p-4 rounded-lg w-32 h-32 hover:bg-gray-100  transition duration-300 ease-in-out"
      >
        <img
          src={teletalk}
          alt="Teletalk"
          className="w-20 h-20 object-contain"
        />
      </Link>
    </div>
  </section>
  
  
  );
};

export default SelectOperator;
