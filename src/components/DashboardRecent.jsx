import { useState } from "react";
import { FiExternalLink, FiFileText, FiLink, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

// Mock Data
const recentFolders = [
  { folderId: 1, name: "Sprints 1", spaceName: "FE", createdAt: "2025-02-25" },
  { folderId: 2, name: "Sprints 2", spaceName: "BE", createdAt: "2025-02-24" },
  { folderId: 3, name: "Sprints 3", spaceName: "QA", createdAt: "2025-02-23" },
  { folderId: 4, name: "Sprints 4", spaceName: "DevOps", createdAt: "2025-02-22" },
  { folderId: 5, name: "Sprints 5", spaceName: "UX/UI", createdAt: "2025-02-21" },
  { folderId: 6, name: "Sprints 6", spaceName: "Testing", createdAt: "2025-02-20" },
  // Thêm dữ liệu mock nhiều hơn để kiểm tra thanh cuộn
  { folderId: 7, name: "Sprints 7", spaceName: "Design", createdAt: "2025-02-19" },
  { folderId: 8, name: "Sprints 8", spaceName: "HR", createdAt: "2025-02-18" },
  { folderId: 9, name: "Sprints 9", spaceName: "Ops", createdAt: "2025-02-17" },
  
  
];

const DashboardRecent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Recent Section */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="text-sm font-semibold">Recent</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-xs text-gray-500 hover:underline"
          >
            See all
          </button>
        </div>

        <div className="mt-2">
          <ul className="space-y-1">
            {recentFolders.slice(0, 4).map((folder) => ( // 🔥 Chỉ hiển thị 4 mục
              <li
                key={folder.folderId}
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FiFileText className="h-3.5 w-3.5 text-gray-500" />
                  <span className="text-xs font-medium">
                    {folder.name}
                    {folder.spaceName && <span className="text-xs text-gray-500 ml-1">• in {folder.spaceName}</span>}
                  </span>
                </div>
                
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal Hiển thị Tất cả Recent */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[400px] max-h-[500px] custom-scrollbar overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="text-sm font-semibold">All Recent</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-2 max-h-[350px] overflow-y-auto"> {/* Thêm thanh cuộn khi quá nhiều dữ liệu */}
              <ul className="space-y-1">
                {recentFolders.map((folder) => (
                  <li
                    key={folder.folderId}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FiFileText className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs font-medium">
                        {folder.name}
                        {folder.spaceName && <span className="text-xs text-gray-500 ml-1">• in {folder.spaceName}</span>}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardRecent;
