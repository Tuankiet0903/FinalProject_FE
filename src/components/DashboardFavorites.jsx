import React from "react";
import { FiStar } from "react-icons/fi"; // Import icon

const DashboardFavorites = () => {
  const favoriteItems = []; // Không có dữ liệu

  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold self-start">Favorites</h3>

      {favoriteItems.length === 0 ? (
        <div className="flex flex-col items-center mt-4">
          <FiStar size={50} className="text-gray-400" />
          <p className="text-gray-500 text-sm mt-2">Your favorite Dashboards will show here.</p>
        </div>
      ) : (
        <ul className="mt-4 self-start">
          {favoriteItems.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardFavorites;
