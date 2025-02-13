import React from "react";
import { FiX } from "react-icons/fi"; // Import icon đóng

const DashboardTemplates = () => {
  const templates = [
    { title: "Simple Dashboard", description: "Manage & prioritize tasks", icon: "📊" },
    { title: "Team Reporting", description: "View progress across teams", icon: "📈" },
    { title: "Time Tracking", description: "Report on time tracking metrics", icon: "⏳" },
  ];

  return (
    <div className="relative bg-white shadow-md rounded-lg mx-auto max-w-screen-xl p-4">
      {/* Header + Close Button */}
      <div className="flex justify-between items-center px-4 py-2">
        <h3 className="text-lg font-semibold text-gray-800">Start with a template</h3>
        <button className="bg-white text-black p-1 rounded-md hover:bg-gray-200 transition">
          <FiX size={18} />
        </button>
      </div>

      {/* Template List */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {templates.map((template, index) => (
          <div
            key={index}
            className="flex items-center p-4 border rounded-lg hover:shadow-md transition"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="text-xl">{template.icon}</span>
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-800">{template.title}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTemplates;
