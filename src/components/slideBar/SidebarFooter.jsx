import { useState } from "react";
import { UsersIcon, HelpCircleIcon } from "lucide-react";
import InviteModal from "../../components/slideBar/InviteModal"; // Import modal

export default function SidebarFooter() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-2">
      {/* Nút Invite */}
      <button
        className="flex bg-white items-center gap-1 px-2 py-1"
        onClick={() => setIsInviteOpen(true)}
      >
        <UsersIcon className="h-4 w-4" />
        <span>Invite</span>
      </button>

      {/* Nút Help */}
      <button className="flex bg-white items-center gap-1 px-2 py-1">
        <HelpCircleIcon className="h-4 w-4" />
        <span>Help</span>
      </button>

      {/* Hiển thị modal khi isInviteOpen = true */}
      {isInviteOpen && <InviteModal onClose={() => setIsInviteOpen(false)} />}
    </div>
  );
}
