import { useState, useEffect } from "react";
import { ChevronDownIcon, PlusIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import mockSpaces from "../../lib/mockSpaces";
// import mockFolders from "../../lib/mockFolders";
// import mockLists from "../../lib/mockLists";
import CreateSpaceDialog from "./CreateSpaceDialog";
import { fetchWorkspaceByID } from "../../api/workspace";

export default function SidebarSpaces({ selectedWorkspaceId }) {
  const [isSpacesOpen, setIsSpacesOpen] = useState(true);
  const [expandedSpaces, setExpandedSpaces] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [spaces, setSpaces] = useState([]);
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedWorkspaceId) return;
    console.log("Selected workspace ID: ", selectedWorkspaceId);
    const fetchSpaces = async () => {
      try {
        const workspaceData = await fetchWorkspaceByID(selectedWorkspaceId);
        setSpaces(workspaceData.spaces);
      } catch (error) {
        console.error("Failed to fetch workspace:", error);
      }
    };
    fetchSpaces();
  }, [selectedWorkspaceId, refreshTrigger]);

  const handleSpaceCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

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

  const handleListClick = ( workspaceId, spaceId, folderId, listId) => {
    navigate(`/user/kanban/${workspaceId}/${spaceId}/${folderId}/${listId}`);
  };

  return (
    <>
      <div className="px-4 py-2 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setIsSpacesOpen(!isSpacesOpen)}
            className="flex items-center text-xs font-medium text-black bg-white px-2 py-1 rounded"
          >
            <ChevronDownIcon className={`h-4 w-4 mr-1 transform transition-transform ${isSpacesOpen ? "" : "-rotate-90"}`} />
            Spaces
          </button>
          <button
            onClick={() => setIsCreateSpaceOpen(true)}
            className="text-black bg-white hover:bg-gray-300 p-1 rounded"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        {isSpacesOpen && (
          <div className="space-y-1">
            {spaces.map((space) => (
              <div key={space.spaceId}>
                <button
                  onClick={() => toggleSpace(space.spaceId)}
                  className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-md hover:bg-gray-100 bg-white text-black"
                >
                  <span className="text-sm text-black">📦 {space.name}</span>
                  <ChevronRightIcon className={`h-4 w-4 transform transition-transform ${expandedSpaces[space.spaceId] ? "rotate-90" : ""}`} />
                </button>

                {expandedSpaces[space.spaceId] && (
                  <div className="ml-6 space-y-1 mt-1">
                    {space.folders.map((folder) => (
                      <div key={folder.folderId}>
                        <button
                          onClick={() => toggleFolder(folder.folderId)}
                          className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-md hover:bg-gray-100 bg-white text-black"
                        >
                          <span className="text-sm text-black">📂 {folder.name}</span>
                          <ChevronRightIcon className={`h-4 w-4 transform transition-transform ${expandedFolders[folder.folderId] ? "rotate-90" : ""}`} />
                        </button>

                        {expandedFolders[folder.folderId] && folder.lists.length > 0 && (
                          <div className="ml-6 space-y-1 mt-1">
                            {folder.lists.map((list) => (
                              <button
                                key={list.listId}
                                onClick={() => handleListClick( selectedWorkspaceId, space.spaceId, folder.folderId, list.listId)}
                                className="w-full bg-white flex items-center px-2 py-2 text-sm rounded-md hover:bg-gray-100"
                              >
                                <CircleIcon className="h-3 w-3 mr-2" />
                                <span>{list.name}</span>
                              </button>
                            ))}
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

      <CreateSpaceDialog open={isCreateSpaceOpen} onOpenChange={setIsCreateSpaceOpen} workspaceId={selectedWorkspaceId} onSpaceCreated={handleSpaceCreated} />
    </>
  );
}
