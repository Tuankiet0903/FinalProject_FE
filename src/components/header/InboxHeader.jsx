import React from "react";

const InboxHeader = () => {
  return (
    <div className="bg-white py-3 shadow-md rounded-lg mx-auto max-w-[calc(100%-3rem)] flex justify-between items-center px-6 border">
      {/* Title */}
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-semibold text-gray-800">Inbox</h1>
      </div>
    </div>
  );
};

export default InboxHeader;
