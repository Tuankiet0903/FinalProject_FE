import React from "react";

const SettingsDropdown = ({ member, settingsOptions, showSettingsDropdown, toggleSettingsDropdown }) => {
  return (
    <div className="relative">
      <button className="p-1.5 hover:bg-gray-100 rounded" onClick={() => toggleSettingsDropdown(member.id)}>
        ⚙️
      </button>
      {showSettingsDropdown === member.id && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10">
          {settingsOptions.map((option) => (
            <div key={option.label} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer text-sm">
              <span>{option.icon}</span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
