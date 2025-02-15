const mockWorkspaces = [
  {
    workSpaceId: 1,
    name: "Workspace Dev Team",
    description: "Không gian làm việc cho đội phát triển",
    type: "team",
    favorite: true,
    createBy: 1,
    createAt: "2024-01-10T08:00:00Z",
    updateAt: "2024-02-12T10:30:00Z",
  },
  {
    workSpaceId: 2,
    name: "Workspace Marketing",
    description: "Không gian cho đội Marketing",
    type: "team",
    favorite: false,
    createBy: 2,
    createAt: "2024-01-15T09:30:00Z",
    updateAt: "2024-02-14T12:45:00Z",
  },
  {
    workSpaceId: 3,
    name: "Workspace HR",
    description: "Không gian dành cho nhân sự",
    type: "personal",
    favorite: false,
    createBy: 3,
    createAt: "2024-01-18T10:00:00Z",
    updateAt: "2024-02-16T14:20:00Z",
  },
];

export default mockWorkspaces;
