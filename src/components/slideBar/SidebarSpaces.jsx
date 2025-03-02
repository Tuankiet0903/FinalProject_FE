import React from 'react';
import { useState, useEffect } from "react";
import { ChevronDownIcon, PlusIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateSpaceDialog from "./CreateSpaceDialog";
import { fetchWorkspaceByID, deleteSpace, updateSpace, createFolder, deleteFolder, updateFolder, createList, deleteList, updateList } from "../../api/workspace";
import ItemDropdown from "../dropdown/ItemDropdown";

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

        if (workspaceData?.spaces?.length > 0) {
          setSpaces(workspaceData.spaces);
        } else {
          console.warn("No spaces found, using mock data.");
          setSpaces(mockSpaces);
        }
      } catch (error) {
        console.error("Failed to fetch workspace:", error);
        setSpaces(mockSpaces);
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

  const handleDeleteSpace = async (spaceId) => {
    try {
      await deleteSpace(spaceId);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to delete space:", error);
    }
  };

  const handleUpdateSpace = async (updatedSpace) => {
    try {
      await updateSpace(updatedSpace);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to update space:", error);
    }
  };

  const handleCreateFolder = async (spaceId, folderName) => {
    try {
      await createFolder({ name: folderName, description: "", spaceId });
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolder(folderId);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to delete folder:", error);
    }
  };

  const handleUpdateFolder = async (updatedFolder) => {
    try {
      await updateFolder(updatedFolder);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to update folder:", error);
    }
  };

  const handleCreateList = async (folderId, listName) => {
    try {
      await createList({ name: listName, description: "", folderId });
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to create list:", error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  const handleUpdateList = async (updatedList) => {
    try {
      await updateList(updatedList);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to update list:", error);
    }
  };

 const handleListClick = (workspaceId, spaceId, folderId, listId) => {
  // Thêm /user vào đầu đường dẫn
  navigate(`/user/workspace/${workspaceId}/space/${spaceId}/folder/${folderId}/list/${listId}`);
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
                <div
                  className="w-full bg-white hover:bg-white flex items-center justify-between px-2 py-2 text-sm rounded-md text-black"
                >
                  <button
                    onClick={() => toggleSpace(space.spaceId)}
                    className="flex items-center flex-grow"
                  >
                    <span className="text-sm text-black">📦 {space.name}</span>
                    <ChevronRightIcon className={`h-4 w-4 ml-2 transform transition-transform ${expandedSpaces[space.spaceId] ? "rotate-90" : ""}`} />
                  </button>
                  <ItemDropdown
                    type="space"
                    item={space}
                    onDelete={() => handleDeleteSpace(space.spaceId)}
                    onUpdate={(updatedSpace) => handleUpdateSpace(updatedSpace)}
                    onCreate={(folderName) => handleCreateFolder(space.spaceId, folderName)}
                  />
                </div>

                {expandedSpaces[space.spaceId] && (
                  <div className="ml-6 space-y-1">
                    {space.folders.map((folder) => (
                      <div key={folder.folderId}>
                        <div
                          className="w-full bg-white hover:bg-white flex items-center justify-between px-2 py-2 text-sm rounded-md text-black"
                        >
                          <button
                            onClick={() => toggleFolder(folder.folderId)}
                            className="flex items-center flex-grow"
                          >
                            <span className="text-sm text-black">📂 {folder.name}</span>
                            <ChevronRightIcon className={`h-4 w-4 ml-2 transform transition-transform ${expandedFolders[folder.folderId] ? "rotate-90" : ""}`} />
                          </button>
                          <ItemDropdown
                            type="folder"
                            item={folder}
                            onDelete={() => handleDeleteFolder(folder.folderId)}
                            onUpdate={(updatedFolder) => handleUpdateFolder(updatedFolder)}
                            onCreate={(listName) => handleCreateList(folder.folderId, listName)}
                          />
                        </div>

                        {expandedFolders[folder.folderId] && folder.lists.length > 0 && (
                          <div className="ml-6 space-y-1">
                            {folder.lists.map((list) => (
                              <div
                                key={list.listId}
                                className="w-full bg-white hover:bg-white flex items-center justify-between px-2 py-2 text-sm rounded-md"
                              >
                                <button
                                  onClick={() => handleListClick(selectedWorkspaceId, space.spaceId, folder.folderId, list.listId)}
                                  className="flex items-center flex-grow"
                                >
                                  <CircleIcon className="h-3 w-3 mr-2" />
                                  <span>{list.name}</span>
                                </button>
                                <ItemDropdown
                                  type="list"
                                  item={list}
                                  onDelete={() => handleDeleteList(list.listId)}
                                  onUpdate={(updatedList) => handleUpdateList(updatedList)}
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
      </div>

      <CreateSpaceDialog 
        open={isCreateSpaceOpen} 
        onOpenChange={setIsCreateSpaceOpen} 
        workspaceId={selectedWorkspaceId} 
        onSpaceCreated={handleSpaceCreated} 
      />
    </>
  );
}