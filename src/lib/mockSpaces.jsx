const mockSpaces = [
  {
    id: 1,
    name: "QA",
    icon: "📦",
    folders: [
      {
        id: 1,
        name: "Guest",
        icon: "📋",
        lists: [
          { listId: 1, name: "Sprint 1", icon: "📍" },
          { listId: 2, name: "Sprint 2", icon: "📍" },
        ],
      },
      {
        id: 2,
        name: "Dev",
        icon: "📋",
        lists: [
          { listId: 3, name: "Sprint 3", icon: "📍" },
          { listId: 4, name: "Sprint 4", icon: "📍" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "FE",
    icon: "📦",
    folders: [
      {
        id: 3,
        name: "Manager",
        icon: "📋",
        lists: [
          { listId: 5, name: "Sprint 5", icon: "📍" },
          { listId: 6, name: "Sprint 6", icon: "📍" },
        ],
      },
      {
        id: 4,
        name: "API",
        icon: "📋",
        lists: [
          { listId: 7, name: "Sprint 7", icon: "📍" },
          { listId: 8, name: "Sprint 8", icon: "📍" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "BE",
    icon: "📦",
    folders: [
      {
        id: 5,
        name: "Data",
        icon: "📋",
        lists: [
          { listId: 9, name: "Sprint 9", icon: "📍" },
          { listId: 10, name: "Sprint 10", icon: "📍" },
        ],
      },
      {
        id: 6,
        name: "Dev",
        icon: "📋",
        lists: [
          { listId: 11, name: "Sprint 11", icon: "📍" },
          { listId: 12, name: "Sprint 12", icon: "📍" },
        ],
      },
    ],
  },
];

export default mockSpaces;
