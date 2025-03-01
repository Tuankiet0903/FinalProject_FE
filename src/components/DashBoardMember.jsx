import React, { useState } from "react";
import { FiX, FiSearch } from "react-icons/fi"; // Import icon đóng và tìm kiếm

// Mock Data for members
const members = [
  {
    idManageMember: 1,
    workspaceId: 1,
    roleWorkSpace: "Owner",
    userId: 101,
    fullName: "Alice Smith",
    email: "alice@example.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    idManageMember: 2,
    workspaceId: 1,
    roleWorkSpace: "Leader",
    userId: 102,
    fullName: "Bob Johnson",
    email: "bob@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    idManageMember: 3,
    workspaceId: 1,
    roleWorkSpace: "Member",
    userId: 103,
    fullName: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    idManageMember: 4,
    workspaceId: 1,
    roleWorkSpace: "Member",
    userId: 106,
    fullName: "Emma Watson",
    email: "emma@example.com",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    idManageMember: 5,
    workspaceId: 1,
    roleWorkSpace: "Member",
    userId: 107,
    fullName: "Franklin Harris",
    email: "franklin@example.com",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    idManageMember: 6,
    workspaceId: 1,
    roleWorkSpace: "Member",
    userId: 108,
    fullName: "Grace Lee",
    email: "grace@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const DashboardMembers = () => {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(1); // Default workspaceId
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  // Filter members by selected workspace and search query
  const filteredMembers = members
    .filter((member) => member.workspaceId === selectedWorkspaceId)
    .filter(
      (member) =>
        member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.roleWorkSpace.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="relative bg-white shadow-md rounded-3xl mx-auto custom-scrollbar max-w-screen-xl p-4">
      <div className="flex justify-between items-center px-4 py-2">
        <h3 className="text-lg font-semibold text-gray-800">
          Members of Workspace {selectedWorkspaceId}
        </h3>
        <button className="bg-white text-black p-1 rounded-md hover:bg-gray-200 transition">
          <FiX size={18} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center p-2 mt-2">
        <FiSearch className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by name, email, or role"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-4/12 h-9 bg-white rounded-xl border border-gray-300"
        />
      </div>

      {/* Display members of the selected workspace */}
      <div className="overflow-y-auto max-h-[300px] mt-4"> {/* Thêm thanh cuộn tự động khi có nhiều hơn 5 người */}
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Avatar</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Full Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Role</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.idManageMember}>
                <td className="px-4 py-2 text-sm">
                  <img
                    src={member.avatar}
                    alt={member.fullName}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm">{member.fullName}</td>
                <td className="px-4 py-2 text-sm">{member.roleWorkSpace}</td>
                <td className="px-4 py-2 text-sm">{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMembers;
