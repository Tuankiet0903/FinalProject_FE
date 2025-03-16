import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus, Folder, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateSpaceDialog from "./CreateSpaceDialog";
import {
  fetchWorkspaceByID,
  deleteSpace,
  updateSpace,
  createFolder,
  deleteFolder,
  updateFolder,
  createList,
  deleteList,
  updateList,
} from "../../api/workspace";
import ItemDropdown from "../dropdown/ItemDropdown";

export default function SidebarSpaces({ selectedWorkspaceId }) {
  const [isSpacesOpen, setIsSpacesOpen] = useState(true);
  const [expandedSpaces, setExpandedSpaces] = useState({});
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  const handleSpaceCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  useEffect(() => {
    if (!selectedWorkspaceId) return;

    const fetchSpaces = async () => {
      try {
        const workspaceData = await fetchWorkspaceByID(selectedWorkspaceId);
        setSpaces(workspaceData?.spaces || []);
      } catch (error) {
        console.error("Failed to fetch workspace:", error);
      }
    };

    fetchSpaces();
  }, [selectedWorkspaceId, refreshTrigger]);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
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
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete space:", error);
    }
  };

  const handleUpdateSpace = async (updatedSpace) => {
    try {
      await updateSpace(updatedSpace);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to update space:", error);
    }
  };

  const handleCreateFolder = async (spaceId, folderName) => {
    try {
      await createFolder({ name: folderName, description: "", spaceId });
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolder(folderId);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete folder:", error);
    }
  };

  const handleUpdateFolder = async (updatedFolder) => {
    try {
      await updateFolder(updatedFolder);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to update folder:", error);
    }
  };

  const handleCreateList = async (folderId, listName) => {
    try {
      await createList({ name: listName, description: "", folderId });
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to create list:", error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  const handleUpdateList = async (updatedList) => {
    try {
      await updateList(updatedList);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to update list:", error);
    }
  };

  return (
    <>
      <div className="px-3 py-2 flex-grow bg-white">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setIsSpacesOpen(!isSpacesOpen)}
            className="flex items-center text-xs font-semibold text-gray-800"
          >
            <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${isSpacesOpen ? "" : "-rotate-90"}`} />
            Spaces
          </button>
          <button
            onClick={() => setIsCreateSpaceOpen(true)}
            className="text-gray-600 hover:text-black transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {isSpacesOpen && (
          <div className="space-y-1">
            {spaces.map((space) => (
              <div key={space.spaceId}>
                <div
                  onClick={() => {
                    handleItemClick(space.spaceId);
                    navigate(`/user/space/${space.spaceId}`);
                  }}
                  className={`flex items-center justify-between w-full px-2 py-2 text-sm rounded-md transition cursor-pointer ${
                    selectedItem === space.spaceId ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`}
                >
                  <button onClick={() => toggleSpace(space.spaceId)} className="mr-2">
                    <ChevronRight className={`h-4 w-4 transform transition-transform ${expandedSpaces[space.spaceId] ? "rotate-90" : ""}`} />
                  </button>

                  <span className="flex-grow text-left font-medium">{space.name}</span>

                  <ItemDropdown
                    type="space"
                    item={space}
                    onDelete={() => handleDeleteSpace(space.spaceId)}
                    onUpdate={(updatedSpace) => handleUpdateSpace(updatedSpace)}
                    onCreate={(folderName) => handleCreateFolder(space.spaceId, folderName)}
                  />
                </div>

                {expandedSpaces[space.spaceId] && (
                  <div className="ml-5 space-y-1">
                    {space.folders.map((folder) => (
                      <div key={folder.folderId}>
                        <div className="flex items-center justify-between px-3 py-2 text-sm rounded-md transition cursor-pointer hover:bg-gray-100">
                          <button onClick={() => toggleFolder(folder.folderId)} className="mr-2">
                            <ChevronRight className={`h-4 w-4 transform transition-transform ${expandedFolders[folder.folderId] ? "rotate-90" : ""}`} />
                          </button>
                          <div className="flex items-center flex-grow">
                            <Folder className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{folder.name}</span>
                          </div>
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
                                className="flex items-center justify-between px-4 py-2 text-sm rounded-md transition cursor-pointer hover:bg-gray-100"
                                onClick={() => navigate(`/user/workspace/${selectedWorkspaceId}/space/${space.spaceId}/folder/${folder.folderId}/list/${list.listId}`)}
                              >
                                <List className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{list.name}</span>
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
      <div
        className="flex items-center px-2 py-2 text-sm text-gray-600 hover:text-black transition cursor-pointer"
        onClick={() => navigate(`/user/workspace/${selectedWorkspaceId}/allspaces`)}
      >
        <ChevronRight className="h-4 w-4 mr-2" />
        <span>View all Spaces</span>
      </div>
      <div
        className="flex items-center px-2 py-2 text-sm text-gray-600 hover:text-black transition cursor-pointer"
        onClick={() => navigate(`/setting/manage-people/${selectedWorkspaceId}`)}
      >
        <ChevronRight className="h-4 w-4 mr-2" />
        <span>Invite People</span>
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