"use client"

import React, { useState, useEffect } from "react"
import {
  ChevronDown,
  ChevronRight,
  Folder,
  Search,
  Snowflake,
  FileText,
  Database,
  Code,
  TestTube,
  MoreVertical,
  CheckCircle,
  X,
  Plus,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import CreateSpaceDialog from "./CreateSpaceDialog"
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
 fetchUserWorkspacesInTeam, 
} from "../../api/workspace";
import ItemDropdown from "../dropdown/ItemDropdown";


export default function SidebarSpaces({ selectedWorkspaceId }) {
  const [isSpacesOpen, setIsSpacesOpen] = useState(true)
  const [expandedSpaces, setExpandedSpaces] = useState({})
  const [expandedFolders, setExpandedFolders] = useState({})
  const [selectedItem, setSelectedItem] = useState(null)
  const [spaces, setSpaces] = useState([])
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [hoveredSpace, setHoveredSpace] = useState(null)
  const [hoveredFolder, setHoveredFolder] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()

  const handleSpaceCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  useEffect(() => {
    if (!selectedWorkspaceId) return

    const fetchSpaces = async () => {
      try {
        const workspaceData = await fetchWorkspaceByID(selectedWorkspaceId);
        const sortedSpaces = workspaceData.spaces
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map(space => ({
              ...space,
              folders: space.folders
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map(folder => ({
                  ...folder,
                  lists: folder.lists.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                }))
            }));
        setSpaces(sortedSpaces || []);
      } catch (error) {
        setNotification("Failed to fetch workspace")
        console.error(notification, error)
      }
    }

    fetchSpaces()
  }, [selectedWorkspaceId, refreshTrigger])

  // Auto-expand spaces and folders when searching
  useEffect(() => {
    if (searchQuery) {
      // Create a map of all spaces to expand
      const spacesToExpand = {}
      const foldersToExpand = {}

      spaces.forEach((space) => {
        if (space.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          spacesToExpand[space.spaceId] = true
        }

        space.folders.forEach((folder) => {
          if (folder.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            spacesToExpand[space.spaceId] = true
          }

          folder.lists.forEach((list) => {
            if (list.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              spacesToExpand[space.spaceId] = true
              foldersToExpand[folder.folderId] = true
            }
          })
        })
      })

      setExpandedSpaces((prev) => ({ ...prev, ...spacesToExpand }))
      setExpandedFolders((prev) => ({ ...prev, ...foldersToExpand }))
    }
  }, [searchQuery, spaces])

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId)
  }

  const toggleSpace = (spaceId, e) => {
    e.stopPropagation()
    setExpandedSpaces((prev) => ({
      ...prev,
      [spaceId]: !prev[spaceId],
    }))
  }

  const toggleFolder = (folderId, e) => {
    e.stopPropagation()
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const handleDeleteSpace = async (spaceId) => {
    try {
      await deleteSpace(spaceId)
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      setNotification("Failed to delete space")
      console.error(notification, error)
    }
  }

  const handleUpdateSpace = async (updatedSpace) => {
    try {
      await updateSpace(updatedSpace)
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      setNotification("Failed to update space")
      console.error(notification, error)
    }
  }

  const handleCreateFolder = async (spaceId, folderName) => {
    try {
      await createFolder({ name: folderName, description: "", spaceId })
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      setNotification("Failed to create folder")
      console.error(notification, error)
    }
  }

  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolder(folderId)
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      setNotification("Failed to delete folder")
      console.error(notification, error)
    }
  }

  const handleUpdateFolder = async (updatedFolder) => {
    try {
      await updateFolder(updatedFolder)
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      setNotification("Failed to update folder")
      console.error(notification, error)
    }
  }

  const handleCreateList = async (folderId, listName) => {
    try {
      await createList({ name: listName, description: "", folderId })
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      setNotification("Failed to create list")
      console.error(notification, error)
    }
  }

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId)
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      setNotification("Failed to delete list")
      console.error(notification, error)
    }
  }

  const handleUpdateList = async (updatedList) => {
    try {
      await updateList(updatedList)
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      setNotification("Failed to update list")
      console.error(notification, error)
    }
  }

  // Filter spaces, folders, and lists based on search query
  const filteredSpaces = spaces.filter((space) => {
    if (!searchQuery) return true

    const spaceMatches = space.name.toLowerCase().includes(searchQuery.toLowerCase())

    const folderMatches = space.folders.some((folder) => folder.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const listMatches = space.folders.some((folder) =>
      folder.lists.some((list) => list.name.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    return spaceMatches || folderMatches || listMatches
  })

  // Filter folders based on search query
  const filterFolders = (folders) => {
    if (!searchQuery) return folders

    return folders.filter((folder) => {
      const folderMatches = folder.name.toLowerCase().includes(searchQuery.toLowerCase())

      const listMatches = folder.lists.some((list) => list.name.toLowerCase().includes(searchQuery.toLowerCase()))

      return folderMatches || listMatches
    })
  }

  // Filter lists based on search query
  const filterLists = (lists) => {
    if (!searchQuery) return lists

    return lists.filter((list) => list.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  // Toggle search input
  const toggleSearch = () => {
    setIsSearching(!isSearching)
    if (isSearching) {
      setSearchQuery("")
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-3 flex-grow overflow-y-auto">
        {/* Header with Search */}
        <div className="flex items-center justify-between mb-3">
          {isSearching ? (
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search spaces, folders, lists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-300"
                autoFocus
              />
              <button className="p-1.5 ml-1 hover:bg-gray-50 rounded-md text-black" onClick={toggleSearch}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <div className="text-sm font-medium text-black">Spaces</div>
                <button
                  onClick={() => setIsCreateSpaceOpen(true)}
                  className="ml-2 p-1 hover:bg-gray-50 rounded-md text-black"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-gray-50 rounded-md text-black" onClick={toggleSearch}>
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Spaces List */}
        <div className="space-y-0.5">
          {/* Main Space (View All Spaces) - only show when not searching */}
          {!searchQuery && (
            <div
              className={`flex items-center px-2 py-2 rounded-md cursor-pointer ${
                selectedItem === "everything" ? "bg-white" : "hover:bg-gray-50"
              }`}
              onClick={() => {
                handleItemClick("everything")
                navigate(`/user/workspace/${selectedWorkspaceId}/allspaces`)
              }}
            >
              <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center mr-2">
                <Snowflake
                  className={`h-3.5 w-3.5 ${selectedItem === "everything" ? "text-purple-600" : "text-black"}`}
                />
              </div>
              <span className={`text-sm ${selectedItem === "everything" ? "text-purple-600" : "text-black"}`}>
                Main Space
              </span>
            </div>
          )}

          {/* Spaces */}
          {filteredSpaces.map((space) => (
            <div key={space.spaceId} className="space-y-0.5 mb-0.5">
              <div
                onClick={() => {
                  handleItemClick(space.spaceId)
                  navigate(`/user/space/${space.spaceId}`)
                }}
                className={`group flex items-center justify-between px-2 py-2 rounded-md cursor-pointer ${
                  selectedItem === space.spaceId ? "bg-white" : "hover:bg-gray-50"
                }`}
                onMouseEnter={() => setHoveredSpace(space.spaceId)}
                onMouseLeave={() => setHoveredSpace(null)}
              >
                <div className="flex items-center">
                  <div className="mr-2 cursor-pointer" onClick={(e) => toggleSpace(space.spaceId, e)}>
                    {hoveredSpace === space.spaceId || expandedSpaces[space.spaceId] ? (
                      <ChevronDown
                        className={`h-4 w-4 ${selectedItem === space.spaceId ? "text-purple-600" : "text-black"}`}
                      />
                    ) : (
                      <ChevronRight
                        className={`h-4 w-4 ${selectedItem === space.spaceId ? "text-purple-600" : "text-black"}`}
                      />
                    )}
                  </div>

                  <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center mr-2">
                    {React.createElement(getSpaceIcon(space.name), {
                      className: `h-3.5 w-3.5 ${selectedItem === space.spaceId ? "text-purple-600" : "text-black"}`,
                    })}
                  </div>
                  <span className={`text-sm ${selectedItem === space.spaceId ? "text-purple-600" : "text-black"}`}>
                    {space.name}
                  </span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ItemDropdown
                    type="space"
                    item={space}
                    onDelete={() => handleDeleteSpace(space.spaceId)}
                    onUpdate={(updatedSpace) => handleUpdateSpace(updatedSpace)}
                    onCreate={(folderName) => handleCreateFolder(space.spaceId, folderName)}
                    trigger={
                      <button className="p-1 hover:bg-gray-50 rounded-md">
                        <MoreVertical className="h-3.5 w-3.5 text-black" />
                      </button>
                    }
                  />
                </div>
              </div>

              {/* Folders */}
              {expandedSpaces[space.spaceId] && (
                <div className="ml-7 space-y-0.5">
                  {filterFolders(space.folders).length === 0 ? (
                    <div className="text-xs text-black italic px-2 py-1">No folders</div>
                  ) : (
                    filterFolders(space.folders).map((folder) => (
                      <div key={folder.folderId} className="space-y-0.5 mb-0.5">
                        <div
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer group ${
                            selectedItem === folder.folderId ? "bg-white" : "text-black hover:bg-gray-50"
                          }`}
                          onClick={() => handleItemClick(folder.folderId)}
                          onMouseEnter={() => setHoveredFolder(folder.folderId)}
                          onMouseLeave={() => setHoveredFolder(null)}
                        >
                          <div className="flex items-center">
                            <div className="mr-2 cursor-pointer" onClick={(e) => toggleFolder(folder.folderId, e)}>
                              {hoveredFolder === folder.folderId || expandedFolders[folder.folderId] ? (
                                <ChevronDown
                                  className={`h-4 w-4 ${selectedItem === folder.folderId ? "text-orange-500" : "text-black"}`}
                                />
                              ) : (
                                <ChevronRight
                                  className={`h-4 w-4 ${selectedItem === folder.folderId ? "text-orange-500" : "text-black"}`}
                                />
                              )}
                            </div>

                            <Folder
                              className={`h-4 w-4 mr-2 ${selectedItem === folder.folderId ? "text-orange-500" : "text-black"}`}
                            />
                            <span
                              className={`text-sm ${selectedItem === folder.folderId ? "text-orange-500" : "text-black"}`}
                            >
                              {folder.name}
                            </span>
                          </div>

                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ItemDropdown
                              type="folder"
                              item={folder}
                              onDelete={() => handleDeleteFolder(folder.folderId)}
                              onUpdate={(updatedFolder) => handleUpdateFolder(updatedFolder)}
                              onCreate={(listName) => handleCreateList(folder.folderId, listName)}
                              trigger={
                                <button className="p-1 hover:bg-gray-50 rounded-md">
                                  <MoreVertical className="h-3.5 w-3.5 text-black" />
                                </button>
                              }
                            />
                          </div>
                        </div>

                        {/* Lists */}
                        {expandedFolders[folder.folderId] && (
                          <div className="ml-6 space-y-0.5">
                            {filterLists(folder.lists).length === 0 ? (
                              <div className="text-xs text-black italic px-2 py-1">No lists</div>
                            ) : (
                              filterLists(folder.lists).map((list) => (
                                <div
                                  key={list.listId}
                                  onClick={() => {
                                    handleItemClick(list.listId)
                                    navigate(
                                      `/user/workspace/${selectedWorkspaceId}/space/${space.spaceId}/folder/${folder.folderId}/list/${list.listId}`,
                                    )
                                  }}
                                  className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer group ${
                                    selectedItem === list.listId ? "bg-white" : "hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <CheckCircle
                                      className={`h-3.5 w-3.5 mr-2 ${selectedItem === list.listId ? "text-green-500" : "text-black"}`}
                                    />
                                    <span
                                      className={`text-sm flex-grow ${selectedItem === list.listId ? "text-green-500" : "text-black"}`}
                                    >
                                      {list.name}
                                    </span>
                                  </div>

                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ItemDropdown
                                      type="list"
                                      item={list}
                                      onDelete={() => handleDeleteList(list.listId)}
                                      onUpdate={(updatedList) => handleUpdateList(updatedList)}
                                      trigger={
                                        <button className="p-1 hover:bg-gray-50 rounded-md">
                                          <MoreVertical className="h-3.5 w-3.5 text-black" />
                                        </button>
                                      }
                                    />
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}

          {/* No results message */}
          {searchQuery && filteredSpaces.length === 0 && (
            <div className="text-center py-4 text-sm text-gray-500">No results found for "{searchQuery}"</div>
          )}
        </div>
      </div>
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
    </div>
  )
}

