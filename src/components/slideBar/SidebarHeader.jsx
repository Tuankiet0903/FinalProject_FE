import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import SidebarHeaderDropdown from "./SidebarHeaderDropdown";
import mockWorkspaces from "../../lib/mockWorkspaces"; // Import dữ liệu giả lập

export default function SidebarHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);

  useEffect(() => {
    // Giả lập việc lấy workspace đầu tiên làm workspace hiện tại
    setCurrentWorkspace(mockWorkspaces[0]);
  }, []);

  return (
    <div className="p-2 flex items-center gap-2 border-b bg-white sticky top-0 z-10 relative">
      {/* Workspace Info */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-red-500 px-3 py-2 text-white rounded">
          <span className="font-semibold">{currentWorkspace ? currentWorkspace.name.charAt(0) : "W"}</span>
        </div>
        <span className="font-medium">{currentWorkspace ? currentWorkspace.name : "Loading..."}</span>
        <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-200" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <SidebarHeaderDropdown 
          currentWorkspace={currentWorkspace} 
          setCurrentWorkspace={setCurrentWorkspace} 
        />
      )}
    </div>
  );
}
