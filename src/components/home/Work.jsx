import React, { useState } from "react";
import { FiMaximize2, FiMinimize2, FiTrash2 } from "react-icons/fi";

const MyWork = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tasks, setTasks] = useState([
    { title: "[FE] - Dash Board trang chủ", status: "Today", dueDate: "Tomorrow, 11:15pm" },
  ]);

  const handleRemove = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
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
            isExpanded || tasks.length === 0 ? "text-black" : "text-gray-700"
          }`}
        >
          My Work
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
            onClick={() => setTasks([])}
          />
        </div>
      </div>
      {/* List of Tasks */}
      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              {/* Circle */}
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-700">{task.title}</p>
                <p className="text-sm text-gray-500">
                  {task.status} - {task.dueDate}
                </p>
              </div>
            </div>
            <FiTrash2
              className="text-red-500 hover:text-red-700 cursor-pointer text-sm"
              onClick={() => handleRemove(index)}
            />
          </li>
        ))}
      </ul>
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No tasks available</p>
      )}
    </div>
  );
};

export default MyWork;