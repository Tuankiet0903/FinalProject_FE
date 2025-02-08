import { useState, useEffect } from "react";
import {
  HomeIcon,
  InboxIcon,
  LayoutDashboardIcon,
  MoreHorizontalIcon,
  ChevronDownIcon,
  FolderIcon,
  PlusIcon,
  ChevronRightIcon,
  ListIcon,
  CircleIcon,
  UsersIcon,
  HelpCircleIcon,
  LayoutListIcon,
} from "lucide-react";
import mockSpaces from "../../lib/mockSpaces"; // Mock spaces data

export default function Sidebar() {
  const [isSpacesOpen, setIsSpacesOpen] = useState(true);
  const [expandedSpaces, setExpandedSpaces] = useState({}); // To control space visibility
  const [expandedFolders, setExpandedFolders] = useState({}); // To control folder visibility
  const [spaces, setSpaces] = useState([]);
  const [activeItem, setActiveItem] = useState(null); // To manage active item (Sprint)

  useEffect(() => {
    // Simulating API call
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

  const createNewSpace = () => {
    const newSpace = {
      id: spaces.length + 1,
      name: "New Space",
      icon: "📦",
      folders: [],
    };
    setSpaces([...spaces, newSpace]);
  };

  const createNewFolder = (spaceId) => {
    const newFolder = {
      id: spaces.find((space) => space.id === spaceId).folders.length + 1,
      name: "New Folder",
      icon: "📋",
      lists: [{ listId: 1, name: "New List", icon: "📍" }],
    };
    const updatedSpaces = spaces.map((space) => {
      if (space.id === spaceId) {
        space.folders.push(newFolder);
      }
      return space;
    });
    setSpaces(updatedSpaces);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-72 bg-white h-screen border-r border-gray-200 fixed left-0 top-16 text-black overflow-y-auto custom-scrollbar">
        {/* Project Header */}
        <div className="p-2 flex items-center gap-2 border-b">
          <div className="bg-red-500 text-white rounded p-1">
            <span className="font-semibold">P</span>
          </div>
          <span className="font-medium">PTM-2025</span>
        </div>
        <div className="flex flex-col min-h-full">
          {/* Main Navigation */}
          <nav className="p-4 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
              <HomeIcon className="h-5 w-5 text-black" />
              <span className="text-black">Home</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
              <InboxIcon className="h-5 w-5 text-black" />
              <span className="text-black">Inbox</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
              <LayoutDashboardIcon className="h-5 w-5 text-black" />
              <span className="text-black">Dashboards</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
              <MoreHorizontalIcon className="h-5 w-5 text-black" />
              <span className="text-black">More</span>
            </a>
          </nav>

          {/* Spaces Section */}
          <div className="px-4 py-2 flex-grow overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSpacesOpen(!isSpacesOpen)}
                  className="flex items-center text-xs font-medium text-black bg-white px-2 py-1 rounded"
                >
                  <ChevronDownIcon
                    className={`h-4 w-4 mr-1 transform transition-transform ${isSpacesOpen ? "" : "-rotate-90"}`}
                  />
                  Spaces
                </button>
              </div>
              <button className="text-black bg-white hover:bg-gray-300 p-1 rounded" onClick={createNewSpace}>
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>

            {isSpacesOpen && (
              <div className="space-y-1">
                {spaces.map((space) => (
                  <div key={space.id}>
                    <button
                      onClick={() => toggleSpace(space.id)}
                      className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-md hover:bg-gray-100 group bg-white text-black"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-black">
                          {space.icon} {space.name}
                        </span>
                      </div>
                      <ChevronRightIcon
                        className={`h-4 w-4 transform transition-transform ${expandedSpaces[space.id] ? "rotate-90" : ""}`}
                      />
                    </button>

                    {/* Folders and Lists */}
                    {expandedSpaces[space.id] && (
                      <div className="ml-6 space-y-1 mt-1">
                        {space.folders.map((folder) => (
                          <div key={folder.id}>
                            <button
                              onClick={() => toggleFolder(folder.id)}
                              className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-md hover:bg-gray-100 bg-white text-black"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-black">
                                  {folder.icon} {folder.name}
                                </span>
                              </div>
                              <ChevronRightIcon
                                className={`h-4 w-4 transform transition-transform ${expandedFolders[folder.id] ? "rotate-90" : ""}`}
                              />
                            </button>

                            {/* Lists in folder */}
                            {expandedFolders[folder.id] && folder.lists && (
                              <div className="ml-6 space-y-1 mt-1">
                                {folder.lists.map((list) => (
                                  <button
                                    key={list.listId}
                                    onClick={() => setActiveItem(list.name)}
                                    className={`w-full bg-white flex items-center px-2 py-2 text-sm rounded-md ${
                                      activeItem === list.name ? "bg-violet-100" : "hover:bg-gray-100"
                                    }`}
                                  >
                                    <CircleIcon className="h-3 w-3 mr-2" />
                                    <span>{list.name}</span>
                                  </button>
                                ))}
                                <button className="w-full bg-white flex items-center px-2 py-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
                                  <PlusIcon className="h-4 w-4 mr-2" />
                                  <span className="text-sm" >Create list</span>
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

        {/* Bottom Actions */}
        <div className="border-t p-2 flex items-center justify-between fixed bottom-0 left-0 w-72 bg-white">
          <button className="flex bg-white items-center gap-1 px-2 py-1">
            <UsersIcon className="h-4 w-4" />
            <span>Invite</span>
          </button>
          <button className="flex bg-white items-center gap-1 px-2 py-1 ">
            <HelpCircleIcon className="h-4 w-4" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </div>
  );
}
