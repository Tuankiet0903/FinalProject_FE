import { useState } from "react";
import { Table, Input, Button, Tag, Space, message } from "antd";
import { motion } from "framer-motion";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  showDeleteAllConfirm,
  showDeleteConfirm,
  showEditModal,
} from "../../../components/admin/AdminModal";

const { Search } = Input;

// Sample data
const initialData = Array.from({ length: 10 }, (_, i) => ({
  userId: i + 1,
  fullName: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  avatar: `https://i.pravatar.cc/40?img=${i + 1}`,
  isBlocked: i % 2 === 0,
  active: i % 2 !== 0,
  dateOfBirth: `199${i}-05-20`,
  createdAt: `2024-01-0${i + 1}`,
}));

export default function UsersDataTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter((item) =>
      item.fullName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle delete user
  const handleDelete = (userId) => {
    const newData = filteredData.filter((item) => item.userId !== userId);
    setFilteredData(newData);
    message.success("Deleted successfully!");
  };

  // Handle delete all selected users
  const handleDeleteAll = () => {
    const newData = filteredData.filter(
      (item) => !selectedRowKeys.includes(item.userId)
    );
    setFilteredData(newData);
    setSelectedRowKeys([]);
    message.success("All selected users have been deleted!");
  };

  //Handle update selected users
  const handleUpdateUser = (updatedUser) => {
    setFilteredData((prevData) =>
      prevData.map((user) =>
        user.userId === updatedUser.userId ? updatedUser : user
      )
    );
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
      title: "User",
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <img
            src={record.avatar}
            alt={text}
            className="w-8 h-8 rounded-full"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      width: "15%",
      render: (active) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Blocked",
      dataIndex: "isBlocked",
      key: "isBlocked",
      width: "15%",
      render: (isBlocked) => (
        <Tag color={isBlocked ? "red" : "green"}>
          {isBlocked ? "Blocked" : "Unblocked"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => showEditModal(record, handleUpdateUser)}
            className="ant-btn-edit group border border-yellow-500 rounded-[6px] px-4 transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:border-yellow-600"
          >
            <EditOutlined className="text-yellow-500 group-hover:text-white" />
          </Button>
          <Button
            type="link"
            danger
            onClick={() => showDeleteConfirm(record.userId, handleDelete)}
            className="group border border-red-500 rounded-[6px] px-4 transition-all duration-300 hover:bg-red-500 hover:text-white hover:border-red-600"
          >
            <DeleteOutlined className="text-red-500 group-hover:text-white" />
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
          <h2 className="text-2xl font-bold">Users List</h2>
          <Search
            placeholder="Search by username..."
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
          rowKey="userId"
          pagination={{
            pageSize: 7,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          className="shadow-sm"
          style={{ width: "100%" }}
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
