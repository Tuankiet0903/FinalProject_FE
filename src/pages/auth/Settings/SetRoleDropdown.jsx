import React from "react";

const SetRoleDropdown = ({ member, roleTypes, showRoleDropdown, toggleRoleDropdown }) => {
  return (
    <div className="relative">
      <button className="text-sm text-gray-600 hover:text-gray-900" onClick={() => toggleRoleDropdown(member.id)}>
        {member.role} ▼
      </button>
      {showRoleDropdown === member.id && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-md shadow-lg z-10">
          {roleTypes.map((role) => (
            <div key={role.label} className="p-3 hover:bg-gray-50 cursor-pointer">
              <div className="font-medium text-sm">{role.label}</div>
              <div className="text-xs text-gray-500">{role.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SetRoleDropdown;
