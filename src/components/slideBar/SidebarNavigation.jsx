import { Link } from "react-router-dom";
import { HomeIcon, InboxIcon, LayoutDashboardIcon, MoreHorizontalIcon } from "lucide-react";

export default function SidebarNavigation() {
  return (
    <nav className="p-4 space-y-2">
      <Link to="/home" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
        <HomeIcon className="h-5 w-5 text-black" />
        <span className="text-black">Home</span>
      </Link>

      <Link to="/inbox" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
        <InboxIcon className="h-5 w-5 text-black" />
        <span className="text-black">Inbox</span>
      </Link>

      <Link to="/dashboard" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
        <LayoutDashboardIcon className="h-5 w-5 text-black" />
        <span className="text-black">Dashboard</span>
      </Link>

      <Link to="#" className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-100">
        <MoreHorizontalIcon className="h-5 w-5 text-black" />
        <span className="text-black">More</span>
      </Link>
    </nav>
  );
}
