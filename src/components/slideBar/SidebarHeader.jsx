import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import SidebarHeaderDropdown from "./SidebarHeaderDropdown";
import mockWorkspaces from "../../lib/mockWorkspaces";
import { getAllWorkspace } from "../../api/workspace";

export default function SidebarHeader({ setSelectedWorkspaceId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);

  useEffect(() => {
    const fetchAllWorkspace = async () => {
      try {
        const workspaceData = await getAllWorkspace();
        if (workspaceData && workspaceData.length > 0) {
          setCurrentWorkspace(workspaceData[0]);
          setSelectedWorkspaceId(workspaceData[0].workspaceId);
        }
      } catch (error) {
        console.error("Failed to fetch workspace:", error);
      }
    };
    fetchAllWorkspace();
  }, []);

  const handleWorkspaceChange = (workspace) => {
    setCurrentWorkspace(workspace);
    setSelectedWorkspaceId(workspace.workspaceId);
    setIsOpen(false);
  };

  return (
    <div className="p-2 flex items-center gap-2 border-b bg-white sticky top-0 z-10 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-red-500 px-3 py-2 text-white rounded">
          <span className="font-semibold">{currentWorkspace?.name?.charAt(0) || "W"}</span>
        </div>
        <span className="font-medium">{currentWorkspace ? currentWorkspace.name : "Loading..."}</span>
        <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-200" />
      </button>

      {isOpen && (
        <SidebarHeaderDropdown 
          currentWorkspace={currentWorkspace} 
          setCurrentWorkspace={handleWorkspaceChange} 
        />
      )}
    </div>
  );
}
