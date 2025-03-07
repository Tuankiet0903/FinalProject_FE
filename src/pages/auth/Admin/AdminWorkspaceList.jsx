import { useEffect, useState } from "react";
import { Table, Input, Button, Tag, Space, message } from "antd";
import { motion } from "framer-motion";
import {
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  FolderOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  showDeleteAllConfirm,
  showDeleteConfirm,
  showWorkspaceDetailModal,
} from "../../../components/admin/AdminModal";
import config from "../../../config/Config";

const { Search } = Input;

export default function WorkspacesDataTable() {
  const API_URL = config.API_URL;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    fetch(`${API_URL}/admin/getAllWorkspace`)
      .then((response) => response.json())
      .then((fetchedData) => {
        const data = fetchedData.map((workspace) => ({
          id: workspace.workspaceId,
          name: workspace.name,
          type: workspace.type,
          email: workspace.User?.email || "N/A",
          owner: workspace.User?.fullName || "N/A",
          members: workspace.ManageMemberWorkSpaces?.length || 0,
          // status: workspace.status || "Inactive",
          users:
            workspace.ManageMemberWorkSpaces?.map((member) => ({
              id: member.userId,
              fullName: member.User?.fullName || "Unknown",
              email: member.User?.email || "N/A",
              role: member.roleWorkSpace,
            })) || [],
        }));

        const sortedData = data.sort((a, b) => a.id - b.id);

        setData(sortedData);
        setFilteredData(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle delete 1 work space
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/admin/workspace/${id}`, {
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
      message.warning("No workspaces selected for deletion.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/admin/workspace/delete-multiple`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedRowKeys }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete workspaces");
      }

      const newData = filteredData.filter(
        (item) => !selectedRowKeys.includes(item.id)
      );
      setFilteredData(newData);
      setSelectedRowKeys([]); // Xóa lựa chọn sau khi xóa dữ liệu
      message.success("All selected workspaces have been deleted!");
    } catch (error) {
      message.error("Failed to delete selected workspaces!");
      console.error("Delete error:", error);
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
          <AppstoreOutlined className="mr-1 text-blue-500" /> Name
        </>
      ),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      width: "20%",
    },
    {
      title: (
        <>
          <FolderOutlined className="mr-1 text-purple-500" /> Type
        </>
      ),
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ["ascend", "descend"],
      width: "10%",
      render: (text) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: (
        <>
          <MailOutlined className="mr-1 text-green-500" /> Email
        </>
      ),
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ["ascend", "descend"],
      width: "20%",
    },
    {
      title: (
        <>
          <UserOutlined className="mr-1 text-yellow-500" /> Owner
        </>
      ),
      dataIndex: "owner",
      key: "owner",
      sorter: (a, b) => a.owner.localeCompare(b.owner),
      sortDirections: ["ascend", "descend"],
      width: "15%",
    },
    {
      title: (
        <>
          <TeamOutlined className="mr-1 text-indigo-500" /> Members
        </>
      ),
      dataIndex: "members",
      key: "members",
      sorter: (a, b) => a.members - b.members,
      sortDirections: ["ascend", "descend"],
      width: "10%",
    },
    {
      title: (
        <>
          <CalendarOutlined className="mr-1 text-orange-500" /> Create Date
        </>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ["ascend", "descend"],
      render: (date) =>
        date ? new Date(date).toISOString().split("T")[0] : "N/A",
      width: "15%",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   width: "10%",
    //   render: (status) => {
    //     const color =
    //       status === "Active"
    //         ? "success"
    //         : status === "Inactive"
    //         ? "error"
    //         : "warning";

    //     return (
    //       <Tag color={color} style={{ minWidth: "70px", textAlign: "center" }}>
    //         {status}
    //       </Tag>
    //     );
    //   },
    //   sorter: (a, b) => a.status.localeCompare(b.status),
    //   sortDirections: ["ascend", "descend"],
    // },
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
            danger
            onClick={(event) => {
              event.stopPropagation();
              showDeleteConfirm(record.id, "workspace", handleDelete);
            }}
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
                onClick={() =>
                  showDeleteAllConfirm("workspace", handleDeleteAll)
                }
                className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-[6px]"
              >
                Delete All Workspace
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
