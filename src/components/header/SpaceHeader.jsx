// Desc: Header của trang Space
import { CalendarIcon, PlusIcon, FolderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSpaceById } from "../../api/space";

export default function Header() {
  const { spaceId } = useParams(); // Get workspaceId from URL
  const [space,setspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate(); // Khai báo điều hướng

  const tabs = [
    { name: "Overview", key: "overview", path: `/user/space/${spaceId}` },
    { name: "Board", key: "board", path: "/user/board" },
    { name: "List", key: "list", path: "/user/list" },
    { name: "Dashboard", key: "dashboard", path: "/user/dashboardspace " }, // Thêm đường dẫn
    { name: "Calendar", key: "calendar", path: "/user/calendar", icon: <CalendarIcon className="h-4 w-4 ml-1" /> },
    { name: "View", key: "view", path: "/user/view", icon: <PlusIcon className="h-4 w-4 ml-1" /> },
  ];

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const data = await fetchSpaceById(spaceId);
        setspace(data);
      } catch (error) {
        console.error("Failed to fetch space details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [spaceId]);

  if (loading) return <p>Loading Space...</p>;
  if (!space) return <p>Space not found</p>;

  return (
    <div className="w-full bg-white border-b shadow-sm relative z-30 pt-2">
      {/* 🔹 Tiêu đề dự án */}
      <div className="flex justify-center items-center px-6 py-3 border-b bg-white">
        <div className="flex items-center space-x-2 text-base font-semibold">
          <FolderIcon className="text-yellow-500 h-5 w-5" />
          <span className="text-gray-800">{space.name}</span>
        </div>
      </div>

      {/* 🔹 Tabs điều hướng */}
      <div className="flex justify-center space-x-2 text-gray-600 text-sm bg-white px-4 py-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              navigate(tab.path); // Chuyển trang khi nhấn vào tab
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
