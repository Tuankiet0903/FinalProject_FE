import { NavLink } from "react-router-dom";
import { HomeIcon, InboxIcon, LayoutDashboardIcon, MoreHorizontalIcon, MessageSquare } from "lucide-react";
import { useWorkspaceStore } from "../../store/workspaceStore";

export default function SidebarNavigation() {
  const { selectedWorkspaceId } = useWorkspaceStore();

  return (
    <nav className="p-4 space-y-2">
      <NavLink 
        to="/user/home" 
        className={({ isActive }) => `flex items-center space-x-3 px-2 py-2 rounded-md ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        <HomeIcon className="h-5 w-5 text-black" />
        <span className="text-black">Home</span>
      </NavLink>

      <NavLink 
        to="/user/inbox" 
        className={({ isActive }) => `flex items-center space-x-3 px-2 py-2 rounded-md ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        <InboxIcon className="h-5 w-5 text-black" />
        <span className="text-black">Inbox</span>
      </NavLink>

      <NavLink 
        to="/user/dashboard" 
        className={({ isActive }) => `flex items-center space-x-3 px-2 py-2 rounded-md ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        <LayoutDashboardIcon className="h-5 w-5 text-black" />
        <span className="text-black">Dashboard</span>
      </NavLink>

      <NavLink
        to={selectedWorkspaceId ? `workspace/${selectedWorkspaceId}/chat` : "#"}
        className={`flex items-center space-x-3 px-2 py-2 rounded-md ${
          selectedWorkspaceId ? "hover:bg-gray-100" : "cursor-not-allowed opacity-50"
        }`}
      >
        <MessageSquare className="h-5 w-5 text-black" />
        <span className="text-black">Chat</span>
      </NavLink>
    </nav>
  );
}
