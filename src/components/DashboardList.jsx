import React, { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Import icon search

const DashboardList = () => {
  const allDashboards = [
    { name: "Dashboard", location: "Project Requirement", updated: "Yesterday", owner: "TV", type: "all" },
    { name: "My Personal Dashboard", location: "Personal", updated: "Jan 12", owner: "TV", type: "my" },
    { name: "Sprint Reporting", location: "Sprint 1 (1/13 - 1/26)", updated: "Jan 10", owner: "TV", type: "all" },
    { name: "Sprint Reporting", location: "Sprint 2 (1/27 - 2/9)", updated: "Jan 10", owner: "TV", type: "workspace" },
    { name: "Sprint Reporting", location: "Sprint 3 (2/10 - 2/23)", updated: "Jan 10", owner: "TV", type: "workspace" },
    { name: "Sprint Folder", location: "Folder", updated: "Jan 10", owner: "TV", type: "workspace" },
  ];

  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter dashboards based on selected tab and search query
  const filteredDashboards = allDashboards.filter(
    (dashboard) =>
      (selectedTab === "all" || dashboard.type === selectedTab) &&
      dashboard.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Navigation Tabs + Search */}
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex space-x-4 text-sm font-medium">
          {["all", "my", "workspace"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 min-w-[120px] bg-white text-black rounded-md transition-all ${
                selectedTab === tab
                  ? "border border-black font-semibold"
                  : "hover:text-black"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab === "all" ? "All" : tab === "my" ? "My Dashboards" : "Workspace"}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse mt-4">
        <thead>
          <tr className="border-b text-gray-500 text-sm font-medium">
            <th className="p-2">Name</th>
            <th className="p-2">Location</th>
            <th className="p-2">Date Viewed</th>
            <th className="p-2">Date Updated</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Sharing</th>
          </tr>
        </thead>
        <tbody>
          {filteredDashboards.length > 0 ? (
            filteredDashboards.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 text-gray-700">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-gray-500">{item.location}</td>
                <td className="p-2 text-gray-500">-</td>
                <td className="p-2 text-gray-500">{item.updated}</td>
                <td className="p-2 text-gray-500">{item.owner}</td>
                <td className="p-2 text-gray-500">-</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
                No dashboards found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardList;
