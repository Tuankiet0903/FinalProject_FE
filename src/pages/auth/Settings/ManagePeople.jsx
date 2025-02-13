import React from "react";
import InviteSection from "./InviteSection"; // Tách riêng phần Invite
import SetRoleDropdown from "./SetRoleDropdown"; // Tách riêng phần Set Role
import SettingsDropdown from "./SettingsDropdown"; // Tách riêng phần Settings

class ManagePeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "full",
      searchText: "",
      inviteEmail: "",
      showRoleDropdown: "",
      showSettingsDropdown: "",
      selectedMemberType: "Member",
      members: [
        { id: 1, name: "Hoang Kiet", email: "htk0932003@gmail.com", role: "Member", lastActive: "Feb 8", avatar: "HK" },
        { id: 2, name: "Hà Trọng Tấn", email: "fryxtan@gmail.com", role: "Member", lastActive: "Feb 8", avatar: "HT" },
      ],
    };
  }

  roleTypes = [
    { label: "Member", description: "Access to public Spaces, Docs and Dashboards." },
    { label: "leader", description: "Must be invited to Spaces, Folders, Lists and tasks." },
    { label: "Guest", description: "Cannot be added to Spaces. Must be invited to Folders, Lists and tasks." },
    { label: "....", description: "Manage Spaces, People, Billing, and other Workspace settings." },
  ];

  settingsOptions = [
    { label: "Set as Admin", icon: "👑" },
    { label: "Convert to Guest", icon: "👥" },
    { label: "Copy member ID", icon: "📋" },
    { label: "Remove", icon: "❌" },
  ];

  setSearchText = (searchText) => this.setState({ searchText });

  setInviteEmail = (inviteEmail) => this.setState({ inviteEmail });

  handleInvite = (email, role) => {
    if (!email) return alert("Please enter an email.");
    
    const newMember = {
      id: this.state.members.length + 1,
      name: email.split("@")[0], // Lấy tên từ email
      email,
      role,
      lastActive: "Just now",
      avatar: email.charAt(0).toUpperCase(),
    };

    this.setState((prevState) => ({
      members: [...prevState.members, newMember],
      inviteEmail: "",
    }));
  };

  toggleRoleDropdown = (id) => {
    this.setState((prevState) => ({
      showRoleDropdown: prevState.showRoleDropdown === id ? "" : id,
    }));
  };

  toggleSettingsDropdown = (id) => {
    this.setState((prevState) => ({
      showSettingsDropdown: prevState.showSettingsDropdown === id ? "" : id,
    }));
  };

  render() {
    return (
      <div className="p-6 bg-white max-w-7xl mx-auto text-sm">
        <h1 className="text-lg font-medium">Manage people</h1>

        {/* Search & Invite Section */}
        <InviteSection
          searchText={this.state.searchText}
          inviteEmail={this.state.inviteEmail}
          setSearchText={this.setSearchText}
          setInviteEmail={this.setInviteEmail}
          roleTypes={this.roleTypes}
          onInvite={this.handleInvite}
        />

        {/* Members Table */}
        <div className="bg-white rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-xs font-medium text-gray-500">NAME</th>
                <th className="p-4 text-xs font-medium text-gray-500">EMAIL</th>
                <th className="p-4 text-xs font-medium text-gray-500">ROLE</th>
                <th className="p-4 text-xs font-medium text-gray-500">LAST ACTIVE</th>
                <th className="p-4 text-xs font-medium text-gray-500">SETTINGS</th>
              </tr>
            </thead>
            <tbody>
              {this.state.members
                .filter((member) => member.name.toLowerCase().includes(this.state.searchText.toLowerCase()) ||
                  member.email.toLowerCase().includes(this.state.searchText.toLowerCase()))
                .map((member) => (
                  <tr key={member.id} className="border-b last:border-b-0">
                    <td className="p-4">{member.name}</td>
                    <td className="p-4">{member.email}</td>
                    <td className="p-4">
                      <SetRoleDropdown
                        member={member}
                        roleTypes={this.roleTypes}
                        showRoleDropdown={this.state.showRoleDropdown}
                        toggleRoleDropdown={this.toggleRoleDropdown}
                      />
                    </td>
                    <td className="p-4">{member.lastActive}</td>
                    <td className="p-4">
                      <SettingsDropdown
                        member={member}
                        settingsOptions={this.settingsOptions}
                        showSettingsDropdown={this.state.showSettingsDropdown}
                        toggleSettingsDropdown={this.toggleSettingsDropdown}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ManagePeople;
