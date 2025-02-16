import React, { useState } from "react";
import { FiMaximize2, FiMinimize2, FiTrash2 } from "react-icons/fi";

const Assign = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([
    { name: "[FE] - Dash Board trang chủ", priority: "High", dueDate: "Tomorrow, 11:15pm" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
    { name: "[FE] - Home", priority: "Medium", dueDate: "-" },
  ]);

  const handleRemove = (index) => {
    const updatedTasks = [...assignedTasks];
    updatedTasks.splice(index, 1);
    setAssignedTasks(updatedTasks);
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
            isExpanded || assignedTasks.length === 0 ? "text-black" : "text-gray-700"
          }`}
        >
          Assigned to me
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
            onClick={() => setAssignedTasks([])}
          />
        </div>
      </div>

      {/* Table with Scrollbar */}
      <div className={`overflow-y-auto scrollbar-custom ${isExpanded ? "h-full" : "max-h-80"}`}>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="text-sm font-medium text-gray-500 p-2">Name</th>
              <th className="text-sm font-medium text-gray-500 p-2">Priority</th>
              <th className="text-sm font-medium text-gray-500 p-2">Due Date</th>
              <th className="text-sm font-medium text-gray-500 p-2"></th>
            </tr>
          </thead>
          <tbody>
            {assignedTasks.map((task, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="text-gray-700 p-2">{task.name}</td>
                <td className="text-gray-500 p-2">{task.priority}</td>
                <td className="text-gray-500 p-2">{task.dueDate}</td>
                <td className="p-2">
                  <FiTrash2
                    className="text-red-500 hover:text-red-700 cursor-pointer text-sm"
                    onClick={() => handleRemove(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {assignedTasks.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No assigned tasks available</p>
      )}
    </div>
  );
};

export default Assign;
