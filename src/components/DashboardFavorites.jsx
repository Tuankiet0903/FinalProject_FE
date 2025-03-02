import { useState } from "react";
import { FiStar, FiGrid, FiX } from "react-icons/fi";

// Mock Data for Space with favorite flag
const spaces = [
  { spaceId: 1, name: "Project Requirement", description: "This space contains all project requirements.", favorite: true, createdBy: 1, workspaceId: 1 },
  { spaceId: 2, name: "FE Development", description: "Front-end development tasks and resources.", favorite: false, createdBy: 2, workspaceId: 1 },
  { spaceId: 3, name: "Backend Architecture", description: "Backend services and architecture design.", favorite: true, createdBy: 3, workspaceId: 1 },
  { spaceId: 4, name: "QA Testing", description: "Quality assurance testing tasks and resources.", favorite: false, createdBy: 1, workspaceId: 1 },
  { spaceId: 5, name: "Design UI/UX", description: "UI/UX design and mockups.", favorite: true, createdBy: 2, workspaceId: 1 },
  { spaceId: 6, name: "Design System", description: "Design system guidelines and components.", favorite: true, createdBy: 2, workspaceId: 1 },
];

const DashboardFavorites = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Favorite Section */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-center justify-between pb-1 border-b">
          <h3 className="text-sm font-semibold">Favorites</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs text-gray-500 hover:underline"
          >
            See all
          </button>
        </div>

        <div className="mt-2">
          <ul className="space-y-1">
            {spaces.filter(space => space.favorite).slice(0, 4).map((space) => ( // Only showing the favorite spaces
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
                  </span>
                </div>
                <FiStar className="h-3 w-3 text-yellow-500" /> {/* Star icon on the side for favorites */}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal Hiển thị Tất cả Favorites */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[400px] max-h-[500px] custom-scrollbar overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="text-sm font-semibold">All Favorites</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-2 max-h-[350px] overflow-y-auto">
              <ul className="space-y-1">
                {spaces.filter(space => space.favorite).map((space) => (
                  <li
                    key={space.spaceId}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FiGrid className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs font-medium">
                        {space.name}
                        <span className="text-xs text-gray-500 ml-1">• {space.description}</span>
                      </span>
                    </div>
                    <FiStar className="h-3 w-3 text-yellow-500" />
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

export default DashboardFavorites;
