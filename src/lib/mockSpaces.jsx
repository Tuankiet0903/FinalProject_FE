const mockSpaces = [
  {
    spaceId: 1,
    name: "Phát Triển Sản Phẩm",
    description: "Không gian làm việc nhóm phát triển sản phẩm",
    favorite: false,
    createBy: 1, // ID người tạo
    createAt: "2024-01-10T08:00:00Z",
    updateAt: "2024-02-12T10:30:00Z",
    workSpaceId: 1, // Thuộc workspace 1
  },
  {
    spaceId: 2,
    name: "Quản Lý Dự Án",
    description: "Không gian dành cho quản lý dự án",
    favorite: true,
    createBy: 2,
    createAt: "2024-01-15T09:30:00Z",
    updateAt: "2024-02-14T12:45:00Z",
    workSpaceId: 2,
  },
];

export default mockSpaces;
