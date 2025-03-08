import { useEffect, useState } from "react";
import { Table, Input, Button, Tag, Space, message } from "antd";
import { motion } from "framer-motion";
import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  StopOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  showDeleteAllConfirm,
  showDeleteConfirm,
  showEditModal,
} from "../../../components/admin/AdminModal";
import config from "../../../config/Config";

const { Search } = Input;

export default function UsersDataTable() {
  const API_URL = config.API_URL;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    fetch(`${API_URL}/admin/getAllUser`)
      .then((response) => response.json())
      .then((fetchedData) => {
        const data = fetchedData.map((user) => ({
          userId: user.userId, // Required by Ant Design table
          avatar: user.avatar || "https://ui-avatars.com/api/?name=Avatar", // Default if null
          fullName: user.fullName,
          email: user.email,
          dateOfBirth: user.dateOfBirth ? user.dateOfBirth : "N/A",
          active: user.active,
          isBlocked: user.isBlocked,
          createdAt: user.createdAt,
        }));

        const sortedData = data.sort((a, b) => a.userId - b.userId);

        setData(sortedData);
        setFilteredData(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.fullName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/admin/users/${id}`, {
        method: "DELETE",
      });

      const newData = filteredData.filter((item) => item.id !== id);
      setFilteredData(newData);
      message.success("Deleted successfully!");
    } catch (error) {
      message.error("Failed to delete workspace!");
      console.error("Delete error:", error);
    }
  };

  // Handle delete all work space
  const handleDeleteAll = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("No users selected for deletion.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admin/users/delete-multiple`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedRowKeys }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete users");
      }

      const newData = filteredData.filter(
        (item) => !selectedRowKeys.includes(item.userId)
      );
      setFilteredData(newData);
      setSelectedRowKeys([]);
      message.success("All selected users have been deleted!");
    } catch (error) {
      message.error("Failed to delete selected users!");
      console.error("Delete error:", error);
    }
  };

  //Handle update selected users
  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(
        `${API_URL}/admin/users/update-block-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: updatedUser.userId,
            blockStatus: updatedUser.isBlocked,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      // Update the specific user in state, instead of removing them
      setFilteredData((prevData) =>
        prevData.map((user) =>
          user.userId === updatedUser.userId
            ? { ...user, isBlocked: updatedUser.isBlocked } // Update only block status
            : user
        )
      );
    } catch (error) {
      message.error("Failed to update user block status!");
      console.error("Update error:", error);
    }
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
      title: (
        <>
          <UserOutlined className="mr-1 text-blue-500" /> User
        </>
      ),
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      render: (text, record) => (
        <div className="flex items-center space-x-2">
          <img src={record.avatar} alt={text} className="w-8 h-8 rounded-full" />
          <span>{text}</span>
        </div>
      ),
    },  
    {
      title: (
        <>
          <MailOutlined className="mr-1 text-green-500" /> Email
        </>
      ),
      dataIndex: "email",
      key: "email",
      width: "20%",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: (
        <>
          <CalendarOutlined className="mr-1 text-orange-500" /> Date of Birth
        </>
      ),
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: "15%",
      sorter: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth),
    },
    {
      title: (
        <>
          <CheckCircleOutlined className="mr-1 text-indigo-500" /> Status
        </>
      ),
      dataIndex: "active",
      key: "active",
      width: "15%",
      sorter: (a, b) => a.active - b.active,
      render: (active) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: (
        <>
          <StopOutlined className="mr-1 text-red-500" /> Blocked
        </>
      ),
      dataIndex: "isBlocked",
      key: "isBlocked",
      width: "15%",
      sorter: (a, b) => a.isBlocked - b.isBlocked,
      render: (isBlocked) => (
        <Tag color={isBlocked ? "red" : "green"}>
          {isBlocked ? "Blocked" : "Unblocked"}
        </Tag>
      ),
    },
    {
      title: (
        <>
          <InfoCircleOutlined className="mr-1 text-yellow-500" /> Action
        </>
      ),
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
            onClick={() =>
              showDeleteConfirm(record.userId, "user", handleDelete)
            }
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
          onChange={() => setSelectedRowKeys([])}
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
                onClick={() => showDeleteAllConfirm("user", handleDeleteAll)}
                className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-[6px]"
              >
                Delete All Users
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
