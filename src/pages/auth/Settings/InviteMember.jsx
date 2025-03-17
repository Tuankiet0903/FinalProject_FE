import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const ManagePeople = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [members, setMembers] = useState([
    { id: 1, name: 'Tin Huynh', email: 'tinhuyh211@gmail.com', role: 'Owner', lastActive: 'Mar 10' },
    // Add more members as needed
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInvite = () => {
    if (newEmail) {
      // Simulate adding a new member (API call would be needed here)
      setMembers([...members, { id: members.length + 1, name: 'New User', email: newEmail, role: 'Member', lastActive: 'N/A' }]);
      setNewEmail('');
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold text-center mb-8">Manage People</h1>

      {/* Search Bar */}
      <div className="flex items-center mb-6 bg-gray-800 p-4 rounded-md">
        <input
          type="text"
          className="p-2 w-1/3 rounded-l-md border-none text-white bg-gray-800 focus:outline-none"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="p-2 bg-purple-600 text-white rounded-r-md">
          <FaSearch />
        </button>
      </div>

      {/* Invite Section */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded-md">
        <input
          type="email"
          className="p-2 w-1/3 rounded-l-md border-none text-white bg-gray-800 focus:outline-none"
          placeholder="Invite by email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={handleInvite} className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Invite
        </button>
      </div>

      {/* Member List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 p-4 text-sm font-semibold text-gray-700 border-b">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Last Active</span>
          <span>Settings</span>
        </div>

        <div>
          {filteredMembers.map((member) => (
            <div key={member.id} className="grid grid-cols-5 p-4 border-b hover:bg-gray-50">
              <span className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-400 text-white text-xs flex items-center justify-center">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="ml-2">{member.name}</span>
              </span>
              <span>{member.email}</span>
              <span>{member.role}</span>
              <span>{member.lastActive}</span>
              <span className="text-purple-600 cursor-pointer">•••</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePeople;
