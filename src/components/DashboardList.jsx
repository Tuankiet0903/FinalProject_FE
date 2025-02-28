import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Import icon search

// Mock Data for Space, Folder, and List within a Workspace
const items = [
  {
    spaceId: 1,
    name: "Project Requirement",
    location: "Project Requirement Workspace",
    updated: "Yesterday",
    owner: "TV",
    type: "space",
    workspaceId: 1,
  },
  {
    folderId: 1,
    name: "Sprints 1",
    location: "Sprint 1 (1/13 - 1/26)",
    updated: "Jan 12",
    owner: "TV",
    type: "folder",
    workspaceId: 1,
  },
  {
    listId: 1,
    name: "To Do",
    location: "Sprint 1 (1/13 - 1/26)",
    updated: "Jan 10",
    owner: "TV",
    type: "list",
    workspaceId: 1,
  },
  {
    spaceId: 2,
    name: "FE Development",
    location: "Front-end development workspace",
    updated: "Jan 10",
    owner: "TV",
    type: "space",
    workspaceId: 1,
  },
  {
    folderId: 2,
    name: "Sprint 2",
    location: "Sprint 2 (1/27 - 2/9)",
    updated: "Jan 10",
    owner: "TV",
    type: "folder",
    workspaceId: 1,
  },
  {
    listId: 2,
    name: "In Progress",
    location: "Sprint 2 (1/27 - 2/9)",
    updated: "Jan 9",
    owner: "TV",
    type: "list",
    workspaceId: 1,
  },
];

const DashboardList = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on selected tab and search query
  const filteredItems = items.filter(
    (item) =>
      (selectedTab === "all" ||
        (selectedTab === "space" && item.type === "space") ||
        (selectedTab === "folder" && item.type === "folder") ||
        (selectedTab === "list" && item.type === "list")) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Navigation Tabs + Search */}
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex space-x-4 text-sm font-medium">
          {["all", "space", "folder", "list"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 min-w-[120px] bg-white text-black rounded-md transition-all ${
                selectedTab === tab
                  ? "border border-black font-semibold"
                  : "hover:text-black"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab === "all"
                ? "All"
                : tab === "space"
                ? "Spaces"
                : tab === "folder"
                ? "Folders"
                : "Lists"}
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
            <th className="p-2">Date Updated</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Type</th>
          </tr>
        </thead>
        <tbody>
  {filteredItems.length > 0 ? (
    filteredItems.map((item, index) => (
      <tr
        key={index}
        className="border-b hover:bg-gray-100 text-gray-700 rounded-md"
      >
        <td className="p-2">{item.name}</td>
        <td className="p-2 text-gray-500">{item.location}</td>
        <td className="p-2 text-gray-500">{item.updated}</td>
        <td className="p-2 text-gray-500">{item.owner}</td>
        <td className="p-2 text-gray-500">{item.type}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center text-gray-500 py-4">
        No items found.
      </td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
};

export default DashboardList;
