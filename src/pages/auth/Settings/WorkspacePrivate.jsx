import React, { useState, useEffect } from 'react';
import { getAllWorkspaceByUserId } from "../../../api/workspace";

const WorkspacesPage = () => {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchWorkspaces = () => {
      // Gọi hàm getAllWorkspaceByUserId (giả sử bạn đã có sẵn hàm này)
      getAllWorkspaceByUserId()
        .then((data) => {
          setWorkspaces(data);
        })
        .catch((err) => {
          console.error('Failed to fetch workspaces', err);
        });
    };

    fetchWorkspaces();
  }, []); // Chỉ gọi một lần khi component mount

  // Hàm lấy chữ cái đầu tiên của workspace name
 

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Workspaces</h1>

      {/* Danh sách các workspace */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50"
          >
            {/* Hiển thị avatar theo chữ cái đầu, tạo ô tròn lớn */}
            <div
              className="flex items-center justify-center w-24 h-24 mb-2 rounded-full"
              style={{ backgroundColor: workspace.color || '#4CAF50' }}  // Màu nền mặc định là xanh lá nếu không có
            >
              <span className="text-white text-2xl">{(workspace.name)}</span> {/* Hiển thị chữ cái đầu */}
            </div>
            <div className="text-center text-sm">{workspace.name}</div>
          </div>
        ))}
        <button className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
          <span className="text-2xl">+</span>
        </button>
      </div>
    </div>
  );
};

export default WorkspacesPage;
