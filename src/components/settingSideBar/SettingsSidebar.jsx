import { Link, useNavigate } from "react-router-dom"; // Import Link để điều hướng
import {
  ArrowLeft,
  Users,
  Sparkles,
  Settings,
  Grid,
  Shield,
  Users2,
  ImportIcon as FileImport,
  Trash2,
  User,
  Briefcase,
  Bell,
  AppWindowIcon,
  Cloud,
  Calendar,
  LogOut,
} from "lucide-react";

function SettingsSidebar() {
  const navigate = useNavigate();

  const workspaceItems = [
    { icon: Users, label: "People", path: "/setting/manage-people" }, // Thêm đường dẫn
    { icon: Sparkles, label: "Upgrade", path: "/setting/upgrade" }, // Cập nhật đường dẫn
    { icon: Settings, label: "Settings", path: "/setting/workspace-settings" },
    { icon: Grid, label: "Spaces" },
    { icon: Shield, label: "Security & Permissions" },
    { icon: Users2, label: "Teams" },
    { icon: FileImport, label: "Imports / Exports" },
    { icon: Trash2, label: "Trash" },
  ];

  const personalItems = [
    { icon: User, label: "My Settings", path: "/setting/profile" }, // Thêm đường dẫn
    { icon: Briefcase, label: "Workspaces" },
    { icon: Bell, label: "Notifications" },
    { icon: AppWindowIcon, label: "Apps" },
    { icon: Cloud, label: "Cloud Storage" },
    { icon: Calendar, label: "Calendar" },
    { icon: LogOut, label: "Log out" },
  ];


  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="h-14 border-b border-gray-200 px-4 flex items-center">
        <a href="/user" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Workspace
        </a>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <p className="text-sm font-medium text-gray-500">PTM-2025</p>
        </div>
        <nav className="px-2">
          {workspaceItems.map((item) =>
            item.path ? ( // Kiểm tra nếu có đường dẫn thì dùng Link
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ) : (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            )
          )}
        </nav>
        <div className="mt-4 px-4 py-2">
          <p className="text-sm font-medium text-gray-500">TÚ NGUYỄN VĂN</p>
        </div>
        <nav className="px-2">
          {personalItems.map((item) =>
            item.path ? ( // Kiểm tra nếu có đường dẫn thì dùng Link
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ) : (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            )
          )}
        </nav>
      </div>
    </div>
  );
}

export default SettingsSidebar;
