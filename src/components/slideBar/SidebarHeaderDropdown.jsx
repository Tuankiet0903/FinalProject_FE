import { useState } from "react";
import {
  Settings,
  ArrowUpCircle,
  Grid,
  Users,
  Search,
  Plus,
  ChevronRight,
} from "lucide-react";

export default function SidebarHeaderDropdown() {
  const workspaces = [
    { id: 1, name: "PTM-2025", status: "Free Forever", members: "5 members", color: "bg-red-500", initial: "P" },
    { id: 2, name: "Tú Nguyễn Văn's Works...", status: "Free Forever", color: "bg-emerald-500", initial: "T" },
    { id: 3, name: "Workspace 3", status: "Free Forever", color: "bg-blue-500", initial: "W" },
  ];

  return (
    <div className="absolute top-full left-[60px] w-56 bg-white border rounded-md shadow-lg mt-1 py-2 z-20">
      {/* Current Workspace */}
      <div className="px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 px-2 py-1 text-white rounded">
            <span className="font-semibold text-sm">P</span>
          </div>
          <div className="text-left">
            <div className="font-medium text-sm">PTM-2025</div>
            <div className="text-xs text-gray-500">Free Forever • 5 members</div>
          </div>
        </div>
      </div>

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
        <button className="w-full px-3 py-1 flex items-center gap-2 hover:bg-gray-50 text-gray-700">
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
        <div className="max-h-40 overflow-y-auto">
          {workspaces.map((workspace) => (
            <button key={workspace.id} className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-gray-50 text-sm">
              <div className={`${workspace.color} px-2 py-1 text-white rounded`}>
                <span className="font-semibold">{workspace.initial}</span>
              </div>
              <div className="text-left">
                <div className="font-medium truncate">{workspace.name}</div>
                <div className="text-xs text-gray-500">{workspace.status}</div>
              </div>
            </button>
          ))}
        </div>

        {/* New Workspace Button */}
        <button className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-50 mt-2 text-sm">
          <Plus className="w-4 h-4" />
          <span>New Workspace</span>
        </button>
      </div>
    </div>
  );
}
