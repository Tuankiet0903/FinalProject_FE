import React, { useState, useEffect } from "react";
import { useWorkspaceStore } from "../../../store/workspaceStore";
import { fetchWorkspaceByID, updateWorkspace, deleteWorkspace } from "../../../api/workspace";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function WorkspaceSettings() {
  const navigate = useNavigate();
  const selectedWorkspaceId = useWorkspaceStore((state) => state.selectedWorkspaceId);

  const [workspace, setWorkspace] = useState(null);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceIcon, setWorkspaceIcon] = useState("P");
  const [workspaceIconColor, setWorkspaceIconColor] = useState("bg-red-500");
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const users = [
    { id: 1, name: "Hà Trọng Tấn", initials: "HT", bgColor: "bg-purple-500" },
    { id: 2, name: "Hoang Kiet", initials: "HK", bgColor: "bg-gray-900" },
    { id: 3, name: "Kiệt Tuấn", initials: "KT", bgColor: "bg-purple-500" },
    { id: 4, name: "Tin Huynh", initials: "TH", bgColor: "bg-purple-500" }
  ];

  const colorOptions = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", 
    "bg-yellow-500", "bg-pink-500", "bg-indigo-500", "bg-gray-900"
  ];

  useEffect(() => {
    if (!selectedWorkspaceId) return;

    const fetchWorkspaceData = async () => {
      try {
        const workspaceData = await fetchWorkspaceByID(selectedWorkspaceId);
        if (workspaceData) {
          setWorkspace(workspaceData);
          setWorkspaceName(workspaceData.name);
          
          // Extract first letter for icon if name exists
          if (workspaceData.name) {
            setWorkspaceIcon(workspaceData.name.charAt(0).toUpperCase());
          }
        }
      } catch (error) {
        console.error("Failed to fetch workspace:", error);
        message.error("Failed to load workspace details");
      }
    };

    fetchWorkspaceData();
  }, [selectedWorkspaceId]);

  const handleWorkspaceNameChange = (e) => setWorkspaceName(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  
  const toggleEditMode = () => {
    if (isEditing) {
      // Reset to original values if canceling
      if (workspace) {
        setWorkspaceName(workspace.name);
      }
    }
    setIsEditing(!isEditing);
  };

  const updateWorkspaceDetails = async () => {
    if (!workspace || !workspaceName.trim()) return;

    try {
      const updatedData = {
        name: workspaceName,
        description: workspace.description,
        type: workspace.type,
        // Add iconColor property if you want to save it to backend
      };
      
      const response = await updateWorkspace(workspace.workspaceId, updatedData);
      setWorkspace(response);
      setIsEditing(false);
      message.success("Workspace updated successfully!");
    } catch (error) {
      console.error("Failed to update workspace:", error);
      message.error("Failed to update workspace!");
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    message.info("User selected as new owner. Save changes to confirm.");
  };

  const confirmDeleteWorkspace = async () => {
    if (!selectedWorkspaceId) return;
    
    setIsDeleting(true);
    try {
      await deleteWorkspace(selectedWorkspaceId);
      message.success("Workspace has been deleted successfully");
      setShowDeleteDialog(false);
      // Redirect to user page
      navigate("/user");
    } catch (error) {
      console.error("Error deleting workspace:", error);
      message.error("Failed to delete workspace");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = () => {
    if (selectedUser) {
      const newOwner = users.find(user => user.id === selectedUser);
      console.log("Transferring ownership to:", newOwner.name);
      message.success(`Ownership transferred to ${newOwner.name}`);
    }
    message.success("All changes saved successfully!");
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-8">Workspace Settings</h1>
      
      {/* Workspace Identity */}
      <div className="mb-8 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <h2 className="font-medium text-lg mb-4">Workspace Information</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 ${workspaceIconColor} rounded-lg flex items-center justify-center text-white font-medium text-xl`}>
            {workspaceIcon}
          </div>
          
          {isEditing ? (
            <input 
              type="text" 
              value={workspaceName} 
              onChange={handleWorkspaceNameChange} 
              className="border border-gray-300 rounded px-3 py-2 text-sm flex-grow" 
              placeholder="Enter workspace name"
            />
          ) : (
            <span className="text-gray-700 text-base font-medium">{workspaceName}</span>
          )}
          
          <button 
            onClick={toggleEditMode} 
            className="ml-auto text-sm px-3 py-1.5 text-purple-600 hover:text-purple-700 border border-purple-200 rounded-md hover:bg-purple-50 transition-colors"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        
        {isEditing && (
          <>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Workspace Icon Color</label>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((color, index) => (
                  <div 
                    key={index} 
                    className={`w-8 h-8 ${color} rounded-full cursor-pointer 
                      ${workspaceIconColor === color ? 'ring-2 ring-offset-2 ring-purple-600' : ''}`} 
                    onClick={() => setWorkspaceIconColor(color)}
                  ></div>
                ))}
              </div>
            </div>
            <button 
              onClick={updateWorkspaceDetails} 
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
            >
              Update Workspace
            </button>
          </>
        )}
      </div>

      {/* Transfer Ownership Section */}
      <div className="mb-8 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <h2 className="font-medium text-lg mb-4">Transfer Workspace Ownership</h2>
        <div className="mb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery} 
              onChange={handleSearchChange} 
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full pl-10" 
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <li key={user.id} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 ${user.bgColor} rounded-full flex items-center justify-center text-white font-medium text-sm mr-3`}>
                      {user.initials}
                    </div>
                    <span className="text-gray-700">{user.name}</span>
                  </div>
                  <button 
                    onClick={() => handleUserSelect(user.id)} 
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${selectedUser === user.id ? 
                      'bg-purple-100 text-purple-700 border border-purple-300' : 
                      'bg-purple-600 text-white hover:bg-purple-700'}`}
                  >
                    {selectedUser === user.id ? 'Selected' : 'Select'}
                  </button>
                </li>
              ))
            ) : (
              <li className="py-3 px-4 text-center text-gray-500">No users found</li>
            )}
          </ul>
        </div>
      </div>

      {/* User List */}
      <div className="mb-8 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <h2 className="font-medium text-lg mb-4">User List</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {users.map(user => (
              <li key={user.id} className="flex items-center py-3 px-4 hover:bg-gray-50">
                <div className={`w-8 h-8 ${user.bgColor} rounded-full flex items-center justify-center text-white font-medium text-sm mr-3`}>
                  {user.initials}
                </div>
                <span className="text-gray-700">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Delete Workspace */}
      <div className="mb-8 border border-red-200 rounded-lg p-6 bg-red-50 shadow-sm">
        <h2 className="font-medium text-lg mb-4 text-red-600">Delete Workspace</h2>
        <p className="text-sm text-gray-600 mb-4">
          This action cannot be undone. This will permanently delete your workspace and all associated data.
        </p>
        <button 
          onClick={() => setShowDeleteDialog(true)} 
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
        >
          Delete Workspace
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this workspace? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteDialog(false)} 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteWorkspace} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSave} 
          className="px-6 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}