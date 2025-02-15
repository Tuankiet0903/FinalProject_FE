import React from "react";
import { FiBarChart2 } from "react-icons/fi"; // Import icon

const DashboardRecent = () => {
  const recentItems = []; // Mảng trống để hiển thị icon nếu không có dữ liệu

  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold self-start">Recent</h3>

      {recentItems.length === 0 ? (
        <div className="flex flex-col items-center mt-4">
          <FiBarChart2 size={50} className="text-gray-400" />
          <p className="text-gray-500 text-sm mt-2">Your recently opened Dashboards will show here.</p>
        </div>
      ) : (
        <ul className="mt-4">
          {recentItems.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardRecent;
