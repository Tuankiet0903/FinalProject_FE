import { useState } from "react";
import { XIcon, ChevronDownIcon, CheckIcon } from "lucide-react";

const roles = [
  { key: "member", label: "Member", description: "Can access all public items in your Workspace." },
  { key: "limited", label: "Limited Member", description: "Can only access items shared with them." },
  { key: "admin", label: "Admin", description: "Can manage Spaces, People, Billing and other Workspace settings.", disabled: true },
];

export default function InviteModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">

      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        {/* Nút đóng modal */}
        <button className="absolute top-2 right-2" onClick={onClose}>
          <XIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </button>

        {/* Tiêu đề */}
        <h2 className="text-lg font-semibold mb-2">Invite people</h2>
        <p className="text-sm text-gray-500 mb-4">
          New members will gain access to public Spaces, Docs and Dashboards.
        </p>

        {/* Input email */}
        <label className="text-sm font-medium">Invite by email</label>
        <input
          type="text"
          placeholder="Email, comma or space separated"
          className="w-full bg-white text-black border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Chọn role */}
        <div className="relative mt-3">
          <button
            className="w-full flex justify-between items-center border px-3 py-2 rounded-lg focus:outline-none"
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
          >
            {selectedRole.label}
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-1">
              {roles.map((role) => (
                <button
                  key={role.key}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center ${
                    role.disabled ? "text-gray-400 cursor-not-allowed" : ""
                  }`}
                  disabled={role.disabled}
                  onClick={() => {
                    setSelectedRole(role);
                    setIsRoleDropdownOpen(false);
                  }}
                >
                  <div>
                    <span className="font-medium">{role.label}</span>
                    <p className="text-xs text-gray-500">{role.description}</p>
                  </div>
                  {selectedRole.key === role.key && <CheckIcon className="h-4 w-4 text-blue-500" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nút Cancel và Send invite */}
        <div className="flex justify-end mt-4 gap-4">
          <button className="text-gray-500 px-4 py-2 border rounded-lg hover:bg-gray-100" onClick={onClose}>Cancel</button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">Send invite</button>
        </div>
      </div>
    </div>
  );
}
