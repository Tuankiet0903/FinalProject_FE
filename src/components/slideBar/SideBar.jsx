import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarNavigation from "./SidebarNavigation";
import SidebarSpaces from "./SidebarSpaces";
import { useWorkspaceStore } from "../../store/workspaceStore";

export default function Sidebar() {
  const setSelectedWorkspaceId = useWorkspaceStore((state) => state.setSelectedWorkspaceId);
  const selectedWorkspaceId = useWorkspaceStore((state) => state.selectedWorkspaceId);

  return (
    <div className="w-72 bg-white h-screen border-r text-black border-gray-200 fixed left-0 top-[72px] shadow-md flex flex-col">
      <SidebarHeader setSelectedWorkspaceId={setSelectedWorkspaceId} />
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <SidebarNavigation />
        <SidebarSpaces selectedWorkspaceId={selectedWorkspaceId} />
      </div>
      <div className="w-full bg-white border-t shadow-md py-2 mb-14">
        <SidebarFooter />
      </div>
    </div>
  );
}
