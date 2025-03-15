import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import SidebarHeaderDropdown from "./SidebarHeaderDropdown";
import { getAllWorkspaceByUserId, fetchUserWorkspacesInTeam } from "../../api/workspace";
import { getUserFromToken } from "../../api/auth"; // ✅ Đảm bảo đúng đường dẫn

export default function SidebarHeader({ setSelectedWorkspaceId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchAllWorkspace = async () => {
      try {
        // 🔥 Lấy userId từ token
        const user = getUserFromToken();
        if (!user || !user.userId) {
          console.warn("⚠ Không tìm thấy userId từ token.");
          return;
        }

        console.log("👤 Fetching workspaces for userId:", user.userId);

        // ✅ Fetch workspace do user tạo
        const createdWorkspaces = await getAllWorkspaceByUserId();

        // ✅ Fetch workspace mà user được mời vào (ManageMemberWorkSpace)
        const managedWorkspaces = await fetchUserWorkspacesInTeam();

        // 🔥 Gộp tất cả workspace + loại bỏ trùng lặp
        const allWorkspaces = [...createdWorkspaces, ...managedWorkspaces];
        const uniqueWorkspaces = Array.from(new Set(allWorkspaces.map(ws => ws.workspaceId)))
          .map(id => allWorkspaces.find(ws => ws.workspaceId === id));

        console.log("✅ Workspaces fetched:", uniqueWorkspaces);
        setWorkspaces(uniqueWorkspaces);

        // ✅ Chọn workspace đầu tiên làm mặc định
        if (uniqueWorkspaces.length > 0) {
          setCurrentWorkspace(uniqueWorkspaces[0]);
          setSelectedWorkspaceId(uniqueWorkspaces[0].workspaceId);
        }
      } catch (error) {
        console.error("❌ Failed to fetch workspace:", error);
      }
    };

    fetchAllWorkspace();
  }, [setSelectedWorkspaceId]);

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
          workspaces={workspaces}
          currentWorkspace={currentWorkspace} 
          setCurrentWorkspace={handleWorkspaceChange} 
        />
      )}
    </div>
  );
}
