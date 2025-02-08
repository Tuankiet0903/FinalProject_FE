import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarNavigation from "./SidebarNavigation";
import SidebarSpaces from "./SidebarSpaces";

export default function Sidebar() {
  return (
    <div className="w-72 bg-white h-screen border-r text-black border-gray-200 fixed left-0 top-[72px] shadow-md">
      <SidebarHeader />
      <div className="flex flex-col h-[calc(100vh-72px)] overflow-y-auto custom-scrollbar">
        <SidebarNavigation />
        <SidebarSpaces />
      </div>
      <SidebarFooter />
    </div>
  );
}
