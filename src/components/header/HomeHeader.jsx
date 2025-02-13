import React, { useState } from "react";

const InboxHeader = () => {
  const [selectedTab, setSelectedTab] = useState("important");

  return (
    <div className="bg-white py-3 shadow-md rounded-lg mx-auto max-w-[calc(100%-3rem)] flex justify-between items-center px-6 border">
      {/* Tabs */}
      <div className="flex space-x-6 text-sm font-medium">
        {["Inbox", "Important", "Clear"].map((tab) => (
          <button
            key={tab}
            className={`relative py-2 px-4 bg-white text-black transition-all ${
              selectedTab === tab
                ? "font-semibold border-b-2 border-black"
                : "hover:text-black"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === "Important" && (
              <span className="ml-1 bg-blue-500 text-white px-2 py-0.5 text-xs rounded-full">4</span>
            )}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex space-x-4 text-sm font-medium">
        <button className="bg-white text-black border border-gray-300 px-4 py-1 rounded-lg hover:bg-gray-100 transition">
          Clear all
        </button>
      </div>
    </div>
  );
};

export default InboxHeader;
