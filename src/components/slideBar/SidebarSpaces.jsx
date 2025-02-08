import { useState, useEffect } from "react";
import { ChevronDownIcon, PlusIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import mockSpaces from "../../lib/mockSpaces"; // Mock dữ liệu cho Spaces

export default function SidebarSpaces() {
  const [isSpacesOpen, setIsSpacesOpen] = useState(true);
  const [expandedSpaces, setExpandedSpaces] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [spaces, setSpaces] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    setSpaces(mockSpaces);
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
  );
}
