import React from "react";

const Card = ({ icon, title, description }) => {
  return (
    <div className="p-4 bg-white border rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-md">
      {/* Icon */}
      <div className="p-3 bg-gray-100 rounded-lg mb-4">
        <span className="text-4xl text-gray-500">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-gray-800">{title}</h3>

      {/* Optional Description */}
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
    </div>
  );
};

export default Card;
