import { UsersIcon, HelpCircleIcon } from "lucide-react";

export default function SidebarFooter() {
  return (
    <div className="border-t p-2 flex items-center justify-between fixed bottom-0 left-0 w-72 bg-white">
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
