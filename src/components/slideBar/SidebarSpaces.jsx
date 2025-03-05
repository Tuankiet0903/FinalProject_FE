import React, { useState, useEffect } from "react";
import { ChevronRightIcon, PlusIcon, CircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateSpaceDialog from "./CreateSpaceDialog";
import { fetchUserWorkspaces, deleteSpace, updateSpace, createFolder, deleteFolder, updateFolder, createList, deleteList, updateList } from "../../api/workspace";
import ItemDropdown from "../dropdown/ItemDropdown";

export default function SidebarSpaces() {
  const [isSpacesOpen, setIsSpacesOpen] = useState(true);
  const [expandedSpaces, setExpandedSpaces] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [workspaces, setWorkspaces] = useState([]); 
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const userWorkspaces = await fetchUserWorkspaces();
        setWorkspaces(userWorkspaces);
      } catch (error) {
        console.error("❌ Failed to fetch user workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, [refreshTrigger]);

  const handleSpaceCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const toggleSpace = (workspaceId) => {
    setExpandedSpaces((prev) => ({
      ...prev,
      [workspaceId]: !prev[workspaceId],
    }));
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleSpaceClick = (workspaceId, spaceId) => {
    navigate(`/user/workspace/${workspaceId}`);
  };

  return (
    <div className="px-4 py-2 flex-grow">
      {/* Header Sidebar */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setIsSpacesOpen(!isSpacesOpen)}
          className="flex items-center text-xs font-medium text-gray-700 bg-white px-2 py-1 rounded hover:bg-gray-200 transition"
        >
          <ChevronRightIcon className={`h-4 w-4 mr-1 transform transition-transform ${isSpacesOpen ? "rotate-90" : ""}`} />
          Workspaces
        </button>
        <button
          onClick={() => setIsCreateSpaceOpen(true)}
          className="text-gray-600 bg-white hover:bg-gray-300 p-1 rounded-lg transition"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      {isSpacesOpen && (
        <div className="space-y-1">
          {workspaces.map((workspace) => (
            <div key={workspace.workspaceId}>
              {/* 🔹 Workspace (Cải thiện UI) */}
              <div className="flex items-center justify-between px-3 py-2 text-sm rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition">
                {/* Nút mở dropdown ở bên trái */}
                <button
                  onClick={() => toggleSpace(workspace.workspaceId)}
                  className="text-gray-500 hover:text-black p-2 transition"
                >
                  <ChevronRightIcon className={`h-4 w-4 transform transition-transform ${expandedSpaces[workspace.workspaceId] ? "rotate-90" : ""}`} />
                </button>

                {/* Tên Workspace - Nhấn vào để điều hướng */}
                <button
                  onClick={() => handleSpaceClick(workspace.workspaceId)}
                  className="flex-grow text-left text-gray-700 hover:text-black hover:bg-blue-100 px-2 py-1 rounded-lg transition"
                >
                  🏢 {workspace.name}
                </button>

                {/* Dropdown Menu */}
                <ItemDropdown
                  type="workspace"
                  item={workspace}
                  onUpdate={() => updateSpace(workspace)}
                  onDelete={() => deleteSpace(workspace.workspaceId)}
                  onCreate={(folderName) => createFolder({ name: folderName, description: "", spaceId: workspace.workspaceId })}
                />
              </div>

              {/* 🔹 Danh sách Space */}
              {expandedSpaces[workspace.workspaceId] && (
                <div className="ml-6 space-y-1">
                  {workspace.spaces?.map((space) => (
                    <div key={space.spaceId}>
                      <div className="flex items-center justify-between px-3 py-2 text-sm rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition">
                        {/* Nút mở dropdown ở bên trái */}
                        <button
                          onClick={() => toggleFolder(space.spaceId)}
                          className="text-gray-500 hover:text-black p-2 transition"
                        >
                          <ChevronRightIcon className={`h-4 w-4 transform transition-transform ${expandedFolders[space.spaceId] ? "rotate-90" : ""}`} />
                        </button>

                        {/* Tên Space - Nhấn vào để điều hướng */}
                        <button
                          onClick={() => handleSpaceClick(workspace.workspaceId, space.spaceId)}
                          className="flex-grow text-left text-gray-700 hover:text-black hover:bg-blue-100 px-2 py-1 rounded-lg transition"
                        >
                          📦 {space.name}
                        </button>

                        {/* Dropdown Menu */}
                        <ItemDropdown
                          type="space"
                          item={space}
                          onDelete={() => deleteSpace(space.spaceId)}
                          onUpdate={() => updateSpace(space)}
                          onCreate={(folderName) => createFolder({ name: folderName, description: "", spaceId: space.spaceId })}
                        />
                      </div>

                      {/* 🔹 Danh sách Folder */}
                      {expandedFolders[space.spaceId] && (
                        <div className="ml-6 space-y-1">
                          {space.folders?.map((folder) => (
                            <div key={folder.folderId} className="flex items-center justify-between px-3 py-2 text-sm rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition">
                              <button
                                onClick={() => navigate(`/workspace/${workspace.workspaceId}/space/${space.spaceId}/folder/${folder.folderId}`)}
                                className="flex-grow text-left text-gray-700 hover:text-black hover:bg-blue-100 px-2 py-1 rounded-lg transition"
                              >
                                <CircleIcon className="h-3 w-3 mr-2" />
                                {folder.name}
                              </button>
                              <ItemDropdown
                                type="folder"
                                item={folder}
                                onDelete={() => deleteFolder(folder.folderId)}
                                onUpdate={() => updateFolder(folder)}
                                onCreate={(listName) => createList({ name: listName, description: "", folderId: folder.folderId })}
                              />
                            </div>
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

      <CreateSpaceDialog 
        open={isCreateSpaceOpen} 
        onOpenChange={setIsCreateSpaceOpen} 
        onSpaceCreated={handleSpaceCreated} 
      />
    </div>
  );
}
