
import { Link } from 'react-router-dom';

import robi from '../../../assets/robi.png';
import airtel from '../../../assets/airtel.png';
import teletalk from '../../../assets/teletalk.png';
import banglalink from '../../../assets/banglalink.png';
import grameenphone from '../../../assets/grameenphone.png';

const operators = [
  { name: 'Robi', path: '/robi', image: robi },
  { name: 'Airtel', path: '/airtel', image: airtel },
  { name: 'Grameenphone', path: '/grameenphone', image: grameenphone },
  { name: 'Banglalink', path: '/banglalink', image: banglalink },
  { name: 'Teletalk', path: '/teletalk', image: teletalk },
];

const SelectOperator = () => {

  

  return (
    <section className="bg-gradient-to-b from-green-600/10 to-blue-400/10 rounded-xl  py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <h2 className="text-3xl mb-6  text-green-500 tracking-tighter font-black">Choose Your Operator </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-lg">
        {operators.map((operator, index) => (
          <Link
            to={operator.path}
            key={index}
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center"
          >
            <img src={operator.image} alt={operator.name} className="w-16 h-16 object-contain mb-2" />
            <span className="text-sm font-semibold text-gray-700">{operator.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SelectOperator;
