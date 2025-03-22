import { useState, useEffect } from "react";
import {
  Settings,
  ArrowUpCircle,
  Grid,
  Users,
  Search,
  Plus,
  ChevronRight,
} from "lucide-react";
import { getAllWorkspaceByUserId } from "../../api/workspace";
import CreateWorkspace from "./CreateWorkspace";
import { useNavigate } from "react-router-dom";


export default function SidebarHeaderDropdown({ currentWorkspace, setCurrentWorkspace }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
  const navigate = useNavigate();
  
  const fetchAllWorkspace = async () => {
    try {
      const workspaceData = await getAllWorkspaceByUserId();
      setWorkspaces(workspaceData);
    } catch (error) {
      console.error("Failed to fetch workspace:", error);
    }
  };

  useEffect(() => {
    fetchAllWorkspace();
  }, []);

  return (
    <div className="absolute top-full left-[60px] w-56 bg-white border rounded-md shadow-lg mt-1 py-2 z-20">
      {/* Current Workspace */}
      {currentWorkspace && (
        <div className="px-3 py-2 border-b">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 px-2 py-1 text-white rounded">
              <span className="font-semibold text-sm">{currentWorkspace?.name?.charAt(0)}</span>
            </div>
            <div className="text-left">
              <div className="font-medium text-sm">{currentWorkspace?.name}</div>
              <div className="text-xs text-gray-500">Free Forever</div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="border-b pb-2 text-sm">
        <button className="w-full px-3 py-1 flex items-center gap-2 hover:bg-gray-50 text-gray-700">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button className="w-full px-3 py-1 flex items-center gap-2 hover:bg-gray-50 text-gray-700">
          <ArrowUpCircle className="w-4 h-4" />
          <span>Upgrade</span>
        </button>
        <button className="w-full px-3 py-1 flex items-center gap-2 hover:bg-gray-50 text-gray-700">
          <Grid className="w-4 h-4" />
          <span>Apps</span>
          <ChevronRight className="w-4 h-4 ml-auto" />
        </button>
        <button
      className="w-full px-3 py-1 flex items-center gap-2 hover:bg-gray-50 text-gray-700"
      onClick={() => navigate(`/setting/manage-people/${currentWorkspace.workspaceId}`)} // Điều hướng đến đường dẫn
    >
      <Users className="w-4 h-4" />
      <span>Manage users</span>
    </button>
      </div>

      {/* Switch Workspaces */}
      <div className="pt-2">
        <div className="px-3 mb-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded p-1">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none w-full text-xs focus:outline-none"
            />
            <button className="p-1 bg-purple-600 rounded">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Workspace List */}
        <div className="max-h-40 custom-scrollbar overflow-y-auto">
          {workspaces.map((workspace) => (
            <button 
              key={workspace.workSpaceId} 
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-gray-50 text-sm"
              onClick={() => setCurrentWorkspace(workspace)} // Cập nhật workspace khi click
            >
              <div className="bg-red-500 px-2 py-1 text-white rounded">
                <span className="font-semibold">{workspace.name.charAt(0)}</span>
              </div>
              <div className="text-left">
                <div className="font-medium truncate">{workspace.name}</div>
                <div className="text-xs text-gray-500">Free Forever</div>
              </div>
            </button>
          ))}
        </div>

        {/* New Workspace Button */}
        <button className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-50 mt-2 text-sm" onClick={() => setShowCreateWorkspace(true)}>
          <Plus className="w-4 h-4" />
          <span>New Workspace</span>
        </button>
      </div>
      
{showCreateWorkspace && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg z-60">
      <CreateWorkspace 
        onClose={() => setShowCreateWorkspace(false)} 
        refreshWorkspaces={fetchAllWorkspace} 
        setCurrentWorkspace={setCurrentWorkspace}
      />
    </div>
  </div>
)}



    </div>
  );
}
