import React, { useState } from "react";
import { FiMaximize2, FiMinimize2, FiTrash2 } from "react-icons/fi";

const Agenda = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [agendaItems, setAgendaItems] = useState([
    { title: "[FE] - Dash Board trang chủ", date: "Jan 12, Sun" },
    { title: "[FE] - Dash Board trang chủ", date: "Jan 12, Sun" },
    { title: "[FE] - Dash Board trang chủ", date: "Jan 12, Sun" },
    { title: "[FE] - Dash Board trang chủ", date: "Jan 12, Sun" },
    { title: "[FE] - Dash Board trang chủ", date: "Jan 12, Sun" },
    { title: "[FE] - Dash Board trang chủ", date: "Jan 12, Sun" },
    { title: "[FE] - Dash Board trang chủ", date: "Jan 12, Sun" },
    { title: "[FE] - Dash Board trang chủ", date: "Jan 12, Sun" },
    { title: "[FE] - Dash Board trang chủ", date: "Jan 12, Sun" },
  ]);

  const handleRemove = (index) => {
    const updatedItems = [...agendaItems];
    updatedItems.splice(index, 1);
    setAgendaItems(updatedItems);
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
            isExpanded || agendaItems.length === 0 ? "text-black" : "text-gray-700"
          }`}
        >
          Agenda
        </h3>
        <div className="flex space-x-4">
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
          <FiTrash2
            className="text-gray-500 hover:text-red-500 cursor-pointer text-lg"
            onClick={() => setAgendaItems([])}
          />
        </div>
      </div>

      {/* List of Items with Scroll */}
      <div className={`overflow-y-auto scrollbar-custom ${isExpanded ? "h-full" : "max-h-80"}`}>
        <ul className="space-y-3">
          {agendaItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-700">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
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

      {agendaItems.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No agenda items available</p>
      )}
    </div>
  );
};

export default Agenda;
