import { useState, useEffect } from "react";
import { FiFileText, FiGrid, FiStar, FiX } from "react-icons/fi"; // Import icons

// Mock Data for Space with createdBy and createdAt
const spaces = [
  { spaceId: 1, name: "Project Requirement", description: "This space contains all project requirements.", favorite: true, createdBy: 1, workspaceId: 1, createdAt: "2025-02-28" },
  { spaceId: 2, name: "FE Development", description: "Front-end development tasks and resources.", favorite: false, createdBy: 2, workspaceId: 1, createdAt: "2025-02-27" },
  { spaceId: 3, name: "Backend Architecture", description: "Backend services and architecture design.", favorite: true, createdBy: 1, workspaceId: 1, createdAt: "2025-02-26" },
  { spaceId: 4, name: "QA Testing", description: "Quality assurance testing tasks and resources.", favorite: false, createdBy: 3, workspaceId: 1, createdAt: "2025-02-25" },
  { spaceId: 5, name: "Design UI/UX", description: "UI/UX design and mockups.", favorite: true, createdBy: 2, workspaceId: 1, createdAt: "2025-02-24" },
  { spaceId: 6, name: "Design System", description: "Design system guidelines and components.", favorite: true, createdBy: 1, workspaceId: 1, createdAt: "2025-02-23" },
];

const DashboardCreated = () => {
  const [createdItems, setCreatedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userId = 1; // Giả sử đây là ID người dùng hiện tại, bạn sẽ thay thế bằng ID thực tế của người dùng.
    
    // Lọc các space mà người dùng đã tạo
    const createdSpaces = spaces.filter(space => space.createdBy === userId);
    setCreatedItems(createdSpaces);
  }, []);

  return (
    <>
      {/* Created by Me Section */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-center justify-between pb-1 border-b">
          <h3 className="text-sm font-semibold">Created by Me</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs text-gray-500 hover:underline"
          >
            See all
          </button>
        </div>

        <div className="mt-2">
          {createdItems.length > 0 ? (
            <ul className="space-y-1">
              {createdItems.slice(0, 4).map((space) => ( // Hiển thị 4 không gian đã tạo
                <li
                  key={space.spaceId}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {/* Using FiGrid for the space icon */}
                    <FiGrid className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs p-0 font-medium">
                      {space.name}
                      <span className="text-xs text-gray-500 ml-1">• {space.description}</span>
                      <span className="text-xs text-gray-400 ml-1">• {space.createdAt}</span>
                    </span>
                  </div>
                  {space.favorite && <FiStar className="h-3 w-3 text-yellow-500" />} {/* Star icon on the side for favorites */}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-4">
              Bạn chưa tạo Space nào
            </div>
          )}
        </div>
      </div>

      {/* Modal Hiển thị Tất cả Created by Me */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[400px] max-h-[500px] custom-scrollbar overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="text-sm font-semibold">All Created by Me</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-2 max-h-[350px] overflow-y-auto">
              {createdItems.length > 0 ? (
                <ul className="space-y-1">
                  {createdItems.map((space) => (
                    <li
                      key={space.spaceId}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FiGrid className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-xs font-medium">
                          {space.name}
                          <span className="text-xs text-gray-500 ml-1">• {space.description}</span>
                          <span className="text-xs text-gray-400 ml-1">• {space.createdAt}</span>
                        </span>
                      </div>
                      {space.favorite && <FiStar className="h-3 w-3 text-yellow-500" />}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  Bạn chưa tạo Space nào
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardCreated;