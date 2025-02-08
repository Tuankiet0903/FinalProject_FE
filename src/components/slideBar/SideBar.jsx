import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarNavigation from "./SidebarNavigation";
import SidebarSpaces from "./SidebarSpaces";

export default function Sidebar() {
  return (
    <div className="w-72 bg-white h-screen border-r text-black border-gray-200 fixed left-0 top-[72px] shadow-md flex flex-col">
      {/* Header cố định trên cùng */}
      <SidebarHeader />

      {/* Nội dung sidebar có thể cuộn, không bị che bởi footer */}
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <SidebarNavigation />
        <SidebarSpaces />
      </div>

      {/* Footer cố định dưới cùng */}
      <div className="w-full bg-white border-t shadow-md py-2 mb-14">
        <SidebarFooter />
      
    
      </div>
    </div>
  );
}
