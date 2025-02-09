const mockFolders = [
  {
    id: 1,
    spaceId: 1,
    name: "Guest",
    icon: "📋",
    lists: [1, 2, 3], // References listId from mockLists
  },
  {
    id: 2,
    spaceId: 1,
    name: "Dev",
    icon: "📋",
    lists: [4, 5], // References listId from mockLists
  },
  {
    id: 3,
    spaceId: 2,
    name: "Manager",
    icon: "📋",
    lists: [6, 7, 8], // References listId from mockLists
  },
  {
    id: 4,
    spaceId: 2,
    name: "API",
    icon: "📋",
    lists: [9, 10, 11], // References listId from mockLists
  },
  {
    id: 5,
    spaceId: 3,
    name: "Data",
    icon: "📋",
    lists: [12, 13, 14], // References listId from mockLists
  },
  {
    id: 6,
    spaceId: 3,
    name: "Dev",
    icon: "📋",
    lists: [15, 16, 17], // References listId from mockLists
  },
];

export default mockFolders;
