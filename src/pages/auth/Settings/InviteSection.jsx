import React, { useState } from "react";

const InviteSection = ({ searchText, setSearchText, inviteEmail, setInviteEmail, roleTypes, onInvite }) => {
  const [selectedRole, setSelectedRole] = useState("Member");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      {/* Ô tìm kiếm */}
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full bg-white pl-4 pr-3 py-1.5 border rounded-md text-sm"
        />
      </div>

      {/* Ô nhập email để mời */}
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Invite by email (multiple emails allowed)"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="min-w-[300px] px-3 py-1.5 border rounded-md text-sm bg-white"
        />

        {/* Dropdown chọn vai trò */}
        <div className="relative">
          <button
            className="px-3 py-1.5 border rounded-md text-sm bg-white hover:bg-gray-100"
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
          >
            {selectedRole} ▼
          </button>
          {showRoleDropdown && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10">
              {roleTypes.map((role) => (
                <div
                  key={role.label}
                  className="p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedRole(role.label);
                    setShowRoleDropdown(false);
                  }}
                >
                  <div className="font-medium text-sm">{role.label}</div>
                  <div className="text-xs text-gray-500">{role.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nút Invite */}
        <button
          className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700"
          onClick={() => onInvite(inviteEmail, selectedRole)}
        >
          Invite
        </button>
      </div>
    </div>
  );
};

export default InviteSection;
