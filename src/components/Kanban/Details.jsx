// src/components/Kanban/Details.jsx
import React from "react";

const Details = ({ space, folder, list }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-black mb-4">📌 Chi Tiết Danh Sách</h1>
      <h2 className="text-lg font-bold">🌌 Không gian: {space.name}</h2>
      <p className="text-gray-600">{space.description}</p>
      <h3 className="text-md font-semibold mt-3">📂 Thư mục: {folder.name}</h3>
      <p className="text-gray-600">{folder.description}</p>
      <p className="text-lg text-gray-700 mt-3">📌 Danh sách: {list.name}</p>
      <p className="text-gray-500">{list.description}</p>
      <p className="text-gray-500 text-sm mt-2">🆔 List ID: {list.listId}</p>
      <p className="text-gray-500 text-sm">🗂 Folder ID: {folder.folderId}</p>
      <p className="text-gray-500 text-sm">📦 Space ID: {space.spaceId}</p>
    </div>
  );
};

export default Details;
