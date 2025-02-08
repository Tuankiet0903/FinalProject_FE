import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link để điều hướng
import {
  HomeIcon,
  InboxIcon,
  LayoutDashboardIcon,
  MoreHorizontalIcon,
  ChevronDownIcon,
  PlusIcon,
  ChevronRightIcon,
  CircleIcon,
  UsersIcon,
  HelpCircleIcon,
} from "lucide-react";
import mockSpaces from "../../lib/mockSpaces"; // Mock dữ liệu cho spaces

export default function Sidebar() {
  const [isSpacesOpen, setIsSpacesOpen] = useState(true);
  const [expandedSpaces, setExpandedSpaces] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [spaces, setSpaces] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    // Giả lập gọi API để lấy danh sách Spaces
    const fetchSpaces = async () => {
      setSpaces(mockSpaces);
    };
    fetchSpaces();
  }, []);

  const toggleSpace = (spaceId) => {
    setExpandedSpaces((prev) => ({
      ...prev,
      [spaceId]: !prev[spaceId],
    }));
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <div className="w-72 bg-white h-screen border-r text-black border-gray-200 fixed left-0 top-[72px] shadow-md">
      {/* Tiêu đề sidebar cố định */}
      <div className="p-2 flex items-center gap-2 border-b bg-white sticky top-0 z-10">
        <div className="bg-red-500 px-3 py-2 text-white rounded">
          <span className="font-semibold">P</span>
        </div>
        <span className="font-medium ">PTM-2025</span>
      </div>

      {/* Nội dung sidebar có thể cuộn nhưng không ảnh hưởng tiêu đề */}
      <div className="flex flex-col h-[calc(100vh-72px)] overflow-y-auto custom-scrollbar">
        {/* Điều hướng chính */}
        <nav className="p-4 space-y-2">
          <Link to="/" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
            <HomeIcon className="h-5 w-5 text-black" />
            <span className="text-black">Home</span>
          </Link>

          <Link to="/settings" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
            <InboxIcon className="h-5 w-5 text-black" />
            <span className="text-black">Inbox</span>
          </Link>

          <Link to="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
            <LayoutDashboardIcon className="h-5 w-5 text-black" />
            <span className="text-black">Dashboards</span>
          </Link>

          <Link to="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
            <MoreHorizontalIcon className="h-5 w-5 text-black" />
            <span className="text-black">More</span>
          </Link>
        </nav>

        {/* Danh sách Spaces */}
        <div className="px-4 py-2 flex-grow">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setIsSpacesOpen(!isSpacesOpen)}
              className="flex items-center text-xs font-medium text-black bg-white px-2 py-1 rounded"
            >
              <ChevronDownIcon className={`h-4 w-4 mr-1 transform transition-transform ${isSpacesOpen ? "" : "-rotate-90"}`} />
              Spaces
            </button>
            <button className="text-black bg-white hover:bg-gray-300 p-1 rounded">
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>

          {isSpacesOpen && (
            <div className="space-y-1">
              {spaces.map((space) => (
                <div key={space.id}>
                  <button
                    onClick={() => toggleSpace(space.id)}
                    className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-md hover:bg-gray-100 bg-white text-black"
                  >
                    <span className="text-sm text-black">{space.icon} {space.name}</span>
                    <ChevronRightIcon className={`h-4 w-4 transform transition-transform ${expandedSpaces[space.id] ? "rotate-90" : ""}`} />
                  </button>

                  {/* Danh sách Folder */}
                  {expandedSpaces[space.id] && (
                    <div className="ml-6 space-y-1 mt-1">
                      {space.folders.map((folder) => (
                        <div key={folder.id}>
                          <button
                            onClick={() => toggleFolder(folder.id)}
                            className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-md hover:bg-gray-100 bg-white text-black"
                          >
                            <span className="text-sm text-black">{folder.icon} {folder.name}</span>
                            <ChevronRightIcon className={`h-4 w-4 transform transition-transform ${expandedFolders[folder.id] ? "rotate-90" : ""}`} />
                          </button>

                          {/* Danh sách List trong Folder */}
                          {expandedFolders[folder.id] && folder.lists && (
                            <div className="ml-6 space-y-1 mt-1">
                              {folder.lists.map((list) => (
                                <button
                                  key={list.listId}
                                  onClick={() => setActiveItem(list.name)}
                                  className={`w-full bg-white flex items-center px-2 py-2 text-sm rounded-md ${activeItem === list.name ? "bg-violet-100" : "hover:bg-gray-100"}`}
                                >
                                  <CircleIcon className="h-3 w-3 mr-2" />
                                  <span>{list.name}</span>
                                </button>
                              ))}
                              <button className="w-full bg-white flex items-center px-2 py-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
                                <PlusIcon className="h-4 w-4 mr-2" />
                                <span className="text-sm">Create list</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Nút Invite và Help ở cuối sidebar */}
      <div className="border-t p-2 flex items-center justify-between fixed bottom-0 left-0 w-72 bg-white">
        <button className="flex bg-white items-center gap-1 px-2 py-1">
          <UsersIcon className="h-4 w-4" />
          <span>Invite</span>
        </button>
        <button className="flex bg-white items-center gap-1 px-2 py-1">
          <HelpCircleIcon className="h-4 w-4" />
          <span>Help</span>
        </button>
      </div>
    </div>
  );
}
