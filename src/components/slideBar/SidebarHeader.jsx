import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SidebarHeaderDropdown from "./SidebarHeaderDropdown";

export default function SidebarHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-2 flex items-center gap-2 border-b bg-white sticky top-0 z-10 relative">
      {/* Workspace Info */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-red-500 px-3 py-2 text-white rounded">
          <span className="font-semibold">P</span>
        </div>
        <span className="font-medium">PTM-2025</span>
        <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-200" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && <SidebarHeaderDropdown />}
    </div>
  );
}
