import { useState } from "react";
import { CalendarIcon, PlusIcon, FolderIcon } from "lucide-react"; // Import icons

export default function Header() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { name: "Overview", key: "overview" },
    { name: "Board", key: "board" },
    { name: "List", key: "list" },
    { name: "Dashboard", key: "dashboard" },
    { name: "Calendar", key: "calendar", icon: <CalendarIcon className="h-4 w-4 ml-1" /> },
    { name: "View", key: "view", icon: <PlusIcon className="h-4 w-4 ml-1" /> },
  ];

  return (
    <div className="w-full bg-white border-b shadow-sm sticky top-0 z-50 pt-2.5 ">
      {/* 🔹 Phần trên: Tiêu đề dự án */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center space-x-2 text-sm font-semibold">
          <FolderIcon className="text-yellow-500" />
          <span>Project Requirement</span>
        </div>
      </div>

      {/* 🔹 Phần dưới: Tabs điều hướng */}
      <div className="flex space-x-2 text-gray-600 text-sm bg-white px-4 py-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === tab.key ? "border border-blue-500 text-blue-500 bg-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tab.name}
            {tab.icon && tab.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
