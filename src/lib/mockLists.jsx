const mockLists = [
  {
    listId: 1,
    name: "Sprint 1",
    description: "Tasks for Sprint 1",
    colorTag: "red",
    updateAt: "2023-02-05T12:00:00Z",
    createAt: "2023-01-01T09:00:00Z",
    createdBy: 101,  // User ID who created the list
    folderId: 1,  // Foreign key linking to the folder
  },
  {
    listId: 2,
    name: "Sprint 2",
    description: "Tasks for Sprint 2",
    colorTag: "blue",
    updateAt: "2023-02-07T14:00:00Z",
    createAt: "2023-01-10T10:00:00Z",
    createdBy: 102,
    folderId: 1,
  },
  {
    listId: 3,
    name: "Sprint 3",
    description: "Tasks for Sprint 3",
    colorTag: "green",
    updateAt: "2023-02-09T16:30:00Z",
    createAt: "2023-01-15T08:45:00Z",
    createdBy: 103,
    folderId: 2,
  },
  {
    listId: 4,
    name: "Sprint 4",
    description: "Tasks for Sprint 4",
    colorTag: "yellow",
    updateAt: "2023-02-10T11:00:00Z",
    createAt: "2023-01-20T12:30:00Z",
    createdBy: 104,
    folderId: 3,
  },
  {
    listId: 5,
    name: "Sprint 5",
    description: "Tasks for Sprint 5",
    colorTag: "purple",
    updateAt: "2023-02-12T09:00:00Z",
    createAt: "2023-01-25T14:15:00Z",
    createdBy: 105,
    folderId: 4,
  },
];

export default mockLists;
