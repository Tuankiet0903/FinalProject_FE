import { CalendarIcon, PlusIcon, FolderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchWorkspaceById } from "../../api/workspace";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Header() {
  const { workspaceId } = useParams(); // Get workspaceId from URL
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Initialize the navigate function

  const tabs = [
    { name: "Overview", key: "overview", path: "/user/home" },
    { name: "Board", key: "board", path: "/user/board" },
    { name: "List", key: "list", path: "/user/list" },
    { name: "Dashboard", key: "dashboard", path: "/user/dashboardspace" }, // Add path here
    { name: "Calendar", key: "calendar", path: "/user/calendar", icon: <CalendarIcon className="h-4 w-4 ml-1" /> },
    { name: "View", key: "view", path: "/user/view", icon: <PlusIcon className="h-4 w-4 ml-1" /> },
  ];

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const data = await fetchWorkspaceById(workspaceId);
        setWorkspace(data);
      } catch (error) {
        console.error("Failed to fetch workspace details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  if (loading) return <p>Loading workspace...</p>;
  if (!workspace) return <p>Workspace not found</p>;

  return (
    <div className="w-full bg-white border-b shadow-sm relative z-30 pt-2">
      {/* 🔹 Tiêu đề dự án */}
      <div className="flex justify-center items-center px-6 py-3 border-b bg-white">
        <div className="flex items-center space-x-2 text-base font-semibold">
          <FolderIcon className="text-yellow-500 h-5 w-5" />
          <span className="text-gray-800">{workspace.name}</span>
        </div>
      </div>

      {/* 🔹 Tabs điều hướng */}
      <div className="flex justify-center space-x-2 text-gray-600 text-sm bg-white px-4 py-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              navigate(tab.path); // Navigate when clicking the tab
            }}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.key
                ? "bg-blue-100 text-blue-600 font-medium"
                : "hover:bg-gray-200"
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
