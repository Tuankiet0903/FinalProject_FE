import { UsersIcon, HelpCircleIcon } from "lucide-react";

export default function SidebarFooter() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <button className="flex bg-white items-center gap-1 px-2 py-1">
        <UsersIcon className="h-4 w-4" />
        <span>Invite</span>
      </button>
      <button className="flex bg-white items-center gap-1 px-2 py-1">
        <HelpCircleIcon className="h-4 w-4" />
        <span>Help</span>
      </button>
    </div>
  );
}
