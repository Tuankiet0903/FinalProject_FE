import { useState } from "react";
import { Table, Input, Button, Tag, Space, message } from "antd";
import { motion } from "framer-motion";
import { DeleteOutlined } from "@ant-design/icons";
import {
  showDeleteAllConfirm,
  showDeleteConfirm,
  showWorkspaceDetailModal,
} from "../../../components/admin/AdminModal";

const { Search } = Input;

// Sample data
const initialData = [
  {
    id: 1,
    name: "Workspace 1",
    type: "Personal",
    email: "john@example.com",
    owner: "Kietnehihi",
    members: 10,
    status: "Active",
    users: [
      { id: 1, fullName: "John Doe", email: "john@example.com", role: "Admin" },
      {
        id: 2,
        fullName: "Alice Smith",
        email: "alice@example.com",
        role: "Member",
      },
    ],
  },
  {
    id: 2,
    name: "Workspace 2",
    type: "Team",
    email: "jane@example.com",
    owner: "VanTu",
    members: 8,
    status: "Inactive",
    users: [
      { id: 3, fullName: "Jane Doe", email: "jane@example.com", role: "Owner" },
      {
        id: 4,
        fullName: "Bob Brown",
        email: "bob@example.com",
        role: "Editor",
      },
    ],
  },
];

export default function WorkspacesDataTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle delete 1 work space
  const handleDelete = (id) => {
    const newData = filteredData.filter((item) => item.id !== id);
    setFilteredData(newData);
    message.success("Deleted successfully!");
  };

  // Handle delete all work space
  const handleDeleteAll = () => {
    const newData = filteredData.filter(
      (item) => !selectedRowKeys.includes(item.id)
    );
    setFilteredData(newData);
    setSelectedRowKeys([]); // Xóa lựa chọn sau khi xóa dữ liệu
    message.success("All selected workspaces have been deleted!");
  };

  // Handle row selection
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Define table columns

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      width: "20%",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ["ascend", "descend"],
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ["ascend", "descend"],
      width: "20%",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      sorter: (a, b) => a.owner.localeCompare(b.owner),
      sortDirections: ["ascend", "descend"],
      width: "15%",
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      sorter: (a, b) => a.members - b.members,
      sortDirections: ["ascend", "descend"],
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status) => {
        const color =
          status === "Active"
            ? "success"
            : status === "Inactive"
            ? "error"
            : "warning";

        return (
          <Tag color={color} style={{ minWidth: "70px", textAlign: "center" }}>
            {status}
          </Tag>
        );
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            danger
            onClick={() => showDeleteConfirm(record.id, handleDelete)}
            className="border border-red-500 rounded-[6px] px-4 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center pt-4"
    >
      <div className="w-full max-w-[95rem] space-y-4 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">WorkSpace List</h2>
          <Search
            placeholder="Search..."
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
            className="max-w-sm"
          />
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 7,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            itemRender: (page, type, originalElement) => {
              if (type === "prev") return <span className="px-2">{"<"}</span>;
              if (type === "next") return <span className="px-2">{">"}</span>;
              return originalElement;
            },
          }}
          className="shadow-sm"
          style={{
            width: "100%",
          }}
          onChange={() => setSelectedRowKeys([])} // Reset selection on page change
          onRow={(record) => ({
            onClick: () => showWorkspaceDetailModal(record), // Open modal with workspace data
          })}
        />

        {selectedRowKeys.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 p-3 rounded-md mt-4 flex items-center justify-between"
          >
            <span className="text-sm font-medium">
              {selectedRowKeys.length}{" "}
              {selectedRowKeys.length === 1 ? "row" : "rows"} selected
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setSelectedRowKeys([])}
                className="px-3 py-1 border border-gray-500 text-gray-700 hover:bg-gray-200 transition rounded-[6px]"
              >
                Clear Selection
              </button>
              <button
                onClick={() => showDeleteAllConfirm(handleDeleteAll)}
                className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-[6px]"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
