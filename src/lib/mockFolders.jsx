const mockFolders = [
  {
    folderId: 1,
    name: "Thiết Kế UI/UX",
    description: "Nơi chứa các danh sách công việc thiết kế",
    createdAt: "2024-01-12T08:30:00Z",
    createdBy: 1, // Người tạo thư mục
    spaceId: 1, // Thuộc Space 1 (Phát Triển Sản Phẩm)
  },
  {
    folderId: 2,
    name: "Backend",
    description: "Các công việc liên quan đến API và Cơ sở dữ liệu",
    createdAt: "2024-01-13T10:15:00Z",
    createdBy: 2,
    spaceId: 1,
  },
  {
    folderId: 3,
    name: "Lập Kế Hoạch",
    description: "Các công việc liên quan đến kế hoạch dự án",
    createdAt: "2024-01-14T14:00:00Z",
    createdBy: 3,
    spaceId: 2, // Thuộc Space 2 (Quản Lý Dự Án)
  },
];

export default mockFolders;
