const mockLists = [
  {
    listId: 1,
    name: "Sprint 1",
    description: "Công việc trong Sprint 1",
    colorTag: "red",
    updateAt: "2024-02-01T12:00:00Z",
    folderId: 1, // Thuộc Folder Thiết Kế UI/UX
  },
  {
    listId: 2,
    name: "Sprint 2",
    description: "Công việc trong Sprint 2",
    colorTag: "blue",
    updateAt: "2024-02-05T10:45:00Z",
    folderId: 1,
  },
  {
    listId: 3,
    name: "API Authentication",
    description: "Xây dựng xác thực API",
    colorTag: "green",
    updateAt: "2024-02-07T14:30:00Z",
    folderId: 2, // Thuộc Folder Backend
  },
  {
    listId: 4,
    name: "Database Optimization",
    description: "Cải thiện hiệu suất Database",
    colorTag: "yellow",
    updateAt: "2024-02-08T15:00:00Z",
    folderId: 2,
  },
  {
    listId: 5,
    name: "Roadmap Q1",
    description: "Kế hoạch dự án trong Quý 1",
    colorTag: "purple",
    updateAt: "2024-02-10T09:00:00Z",
    folderId: 3, // Thuộc Folder Lập Kế Hoạch
  },
  {
    listId: 6,
    name: "Budget Planning",
    description: "Lập kế hoạch ngân sách",
    colorTag: "orange",
    updateAt: "2024-02-11T11:15:00Z",
    folderId: 3,
  },
];

export default mockLists;
