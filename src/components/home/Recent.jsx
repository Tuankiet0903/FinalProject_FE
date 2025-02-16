import React, { useState } from "react";
import { FiMaximize2, FiMinimize2, FiTrash2 } from "react-icons/fi";

const Recent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentItems, setRecentItems] = useState([
    { title: "[FE] - Home", subtitle: "in Sprint 1 (1/13 - 1/26)" },
    { title: "Sprint 1 (1/13 - 1/26)", subtitle: "in Sprint Folder" },
    { title: "[FE] - Dash Board trang chủ", subtitle: "in Sprint 1 (1/13 - 1/26)" },
    { title: "[FE] - Assigned to me", subtitle: "in [FE] - Home" },
    { title: "[FE] - Assigned comments", subtitle: "in [FE] - Home" },
    { title: "[FE] - Agenda", subtitle: "in [FE] - Home" },
    { title: "[FE] - Recents", subtitle: "in [FE] - Home" },
    { title: "[FE] - My Work", subtitle: "in [FE] - Home" },
  ]);

  const handleRemove = (index) => {
    const updatedItems = [...recentItems];
    updatedItems.splice(index, 1);
    setRecentItems(updatedItems);
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow transition-all duration-300 ${
        isExpanded ? "w-full h-screen fixed top-0 left-0 z-50 overflow-auto" : "w-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            isExpanded || recentItems.length === 0 ? "text-black" : "text-gray-700"
          }`}
        >
          Recents
        </h3>
        <div className="flex space-x-4">
          {/* Expand/Minimize Icon */}
          {isExpanded ? (
            <FiMinimize2
              className="text-gray-500 hover:text-gray-700 cursor-pointer text-lg"
              onClick={() => setIsExpanded(false)}
            />
          ) : (
            <FiMaximize2
              className="text-gray-500 hover:text-gray-700 cursor-pointer text-lg"
              onClick={() => setIsExpanded(true)}
            />
          )}
          {/* Clear All Icon */}
          <FiTrash2
            className="text-gray-500 hover:text-red-500 cursor-pointer text-lg"
            onClick={() => setRecentItems([])}
          />
        </div>
      </div>

      {/* List of Items with Custom Scrollbar */}
      <div className={`overflow-y-auto scrollbar-custom ${isExpanded ? "h-full" : "max-h-80"}`}>
        <ul className="space-y-3">
          {recentItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                {/* Circle */}
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-700">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <FiTrash2
                className="text-red-500 hover:text-red-700 cursor-pointer text-sm"
                onClick={() => handleRemove(index)}
              />
            </li>
          ))}
        </ul>
      </div>

      {recentItems.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No recent items available</p>
      )}
    </div>
  );
};

export default Recent;
