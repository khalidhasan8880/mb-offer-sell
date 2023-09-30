import { Link } from "react-router-dom";

const AdminHome = () => {
    return (
        <section>
             <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-lg">
      <Link
      to='/manage/manage_user'
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center"
          >
           
            <span className="text-sm font-semibold text-gray-700">Manage user</span>
          </Link>
      <Link
        to='/manage/add_offer'
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center"
          >
           
            <span className="text-sm font-semibold text-gray-700">Add Offer</span>
          </Link>
      </div>
    </div>
        </section>
    );
};

export default AdminHome;