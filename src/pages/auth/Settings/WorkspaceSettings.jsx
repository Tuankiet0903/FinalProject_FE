import React from "react"

class WorkspaceSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isWhiteLabelEnabled: false,
      searchQuery: "",
      selectedUser: null,
      users: [
        {
          id: 1,
          name: "Hà Trọng Tấn",
          initials: "HT",
          bgColor: "bg-purple-500",
        },
        {
          id: 2,
          name: "Hoang Kiet",
          initials: "HK",
          bgColor: "bg-gray-900",
        },
        {
          id: 3,
          name: "Kiệt Tuấn",
          initials: "KT",
          bgColor: "bg-purple-500",
        },
        {
          id: 4,
          name: "Tin Huynh",
          initials: "TH",
          bgColor: "bg-purple-500",
        },
      ],
    }
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  toggleWhiteLabel = () => {
    this.setState((prevState) => ({
      isWhiteLabelEnabled: !prevState.isWhiteLabelEnabled,
    }))
  }

  handleUserSelect = (userId) => {
    this.setState({ selectedUser: userId })
  }

  handleSave = () => {
    console.log("Settings saved")
  }

  handleDeleteWorkspace = () => {
    if (window.confirm("Are you sure you want to delete this workspace? This action cannot be undone.")) {
      console.log("Workspace deleted")
    }
  }

  render() {
    const filteredUsers = this.state.users.filter((user) =>
      user.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
    )

    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-medium mb-8">Workspace Settings</h1>

        {/* Workspace Identity */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-medium text-xl">
            P
          </div>
          <span className="text-gray-600 text-sm">PTM-2025</span>
        </div>



        {/* Transfer Ownership Section */}
        <div className="mb-8">
          <h2 className="font-medium text-sm mb-4">Transfer ownership of Workspace</h2>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search or enter email..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border bg-white border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* User List */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => this.handleUserSelect(user.id)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 ${
                  this.state.selectedUser === user.id ? "bg-gray-50" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 ${user.bgColor} rounded-full flex items-center justify-center text-white text-sm`}
                >
                  {user.initials}
                </div>
                <span className="text-sm">{user.name}</span>
              </div>
            ))}
          </div>

          {/* Delete Workspace */}
          <button onClick={this.handleDeleteWorkspace} className="text-red-500 hover:text-red-600 text-sm font-medium">
            Delete Workspace
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={this.handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
          >
            Saved
          </button>
        </div>
      </div>
    )
  }
}

export default WorkspaceSettings

