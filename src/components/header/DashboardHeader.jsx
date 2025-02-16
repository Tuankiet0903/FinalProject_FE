import React from "react";
import { FiSearch } from "react-icons/fi"; // Import search icon

const HeaderDashboard = () => {
  return (
    <div className="bg-white py-3 shadow-md rounded-lg mx-auto max-w-screen-xl flex justify-between items-center px-6">
      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-800">Dashboards</h1>

      {/* Search + Button */}
      <div className="flex space-x-4">
        {/* Search Input with Icon */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search Dashboards"
            className="bg-white border border-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* New Dashboard Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          New Dashboard
        </button>
      </div>
    </div>
  );
};

export default HeaderDashboard;
