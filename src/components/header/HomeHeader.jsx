import React from "react";

const HeaderHome = () => {
  return (
    <div className="bg-white py-3 shadow-md rounded-lg mx-auto max-w-[calc(100%-3rem)] flex justify-between items-center px-6">
      {/* Title + Breadcrumb */}
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-semibold text-gray-800">Home</h1>
        <span className="text-gray-500">|</span>
      </div>

      {/* Settings Button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
        Manage cards
      </button>
    </div>
  );
};

export default HeaderHome;
