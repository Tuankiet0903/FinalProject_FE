import { LayoutGrid, ClipboardList, List, LayoutDashboard, Calendar, Eye, Settings, Plus } from "lucide-react";
import PropTypes from "prop-types";

export default function ListHeader({ activeTab, setActiveTab }) {
   return (
      <nav className="sticky top-0 bg-white shadow-md border-b z-10">
         <div className="flex justify-between items-center px-4 py-2 overflow-x-auto whitespace-nowrap">
            {/* Menu chính */}
            <div className="flex items-center space-x-4 flex-wrap">
               <MenuLink icon={<LayoutGrid className="w-4 h-4" />} text="Overview" active={activeTab === "Overview"} onClick={() => setActiveTab("Overview")} />
               <MenuLink icon={<ClipboardList className="w-4 h-4" />} text="Board" active={activeTab === "Board"} onClick={() => setActiveTab("Board")} />
               <MenuLink icon={<List className="w-4 h-4" />} text="List" active={activeTab === "List"} onClick={() => setActiveTab("List")} />
               <MenuLink icon={<LayoutDashboard className="w-4 h-4" />} text="Dashboard" active={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} />
               <MenuLink icon={<Calendar className="w-4 h-4" />} text="Calendar" active={activeTab === "Calendar"} onClick={() => setActiveTab("Calendar")} />
               <button className="text-gray-600 hover:text-gray-900">
                  <span className="flex items-center space-x-1">
                     <Plus className="w-4 h-4" />
                     <span>View</span>
                  </span>
               </button>
            </div>

            {/* Nút điều chỉnh */}
            <div className="flex items-center space-x-4">
               <button className="text-gray-600 hover:text-gray-900">
                  <span className="flex items-center space-x-1">
                     <Eye className="w-4 h-4" />
                     <span>Hide</span>
                  </span>
               </button>
               <button className="text-gray-600 hover:text-gray-900">
                  <span className="flex items-center space-x-1">
                     <Settings className="w-4 h-4" />
                     <span>Customize</span>
                  </span>
               </button>
               <button className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Add card</span>
               </button>
            </div>
         </div>
      </nav>
   );
}

function MenuLink({ icon, text, active, onClick }) {
   return (
      <button onClick={onClick} className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all ${active ? "text-indigo-600 font-semibold border-b-2 border-indigo-600" : "text-gray-600 hover:text-gray-900"
         }`}>
         {icon}
         <span>{text}</span>
      </button>
   );
}

MenuLink.propTypes = {
   icon: PropTypes.node.isRequired,
   text: PropTypes.string.isRequired,
   active: PropTypes.bool,
   onClick: PropTypes.func.isRequired,
};

ListHeader.propTypes = {
   activeTab: PropTypes.string.isRequired,
   setActiveTab: PropTypes.func.isRequired,
};
