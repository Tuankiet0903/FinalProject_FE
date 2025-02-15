import React from "react";
import { FiFileText } from "react-icons/fi"; // Import icon

const DashboardCreated = () => {
  const createdItems = []; // Không có dữ liệu

  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold self-start">Created by Me</h3>

      {createdItems.length === 0 ? (
        <div className="flex flex-col items-center mt-4">
          <FiFileText size={50} className="text-gray-400" />
          <p className="text-gray-500 text-sm mt-2">All Dashboards created by you will show here.</p>
        </div>
      ) : (
        <ul className="mt-4">
          {createdItems.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardCreated;