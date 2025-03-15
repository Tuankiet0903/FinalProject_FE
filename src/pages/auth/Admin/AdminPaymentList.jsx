import { useEffect, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { motion } from "framer-motion";
import {
  DeleteOutlined,
  EditOutlined,
  DollarCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
  TagOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  showDeleteConfirm,
  showEditPlanModal,
  showCreatePlanModal,
} from "../../../components/admin/AdminModal";
const { Search } = Input;

export default function PremiumPlan() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    {
      title: (
        <>
          <TagOutlined className="mr-1 text-blue-500" /> Workspace Name
        </>
      ),
      dataIndex: "workspaceName",
      key: "workspaceName",
      width: "20%",
      sorter: (a, b) => a.workspaceName.localeCompare(b.workspaceName),
    },
    {
      title: (
        <>
          <UserOutlined className="mr-1 text-purple-500" /> Owner
        </>
      ),
      dataIndex: "owner",
      key: "owner",
      width: "20%",
      sorter: (a, b) => a.owner.localeCompare(b.owner),
    },
    {
      title: (
        <>
          <FileTextOutlined className="mr-1 text-orange-500" /> Plan Name
        </>
      ),
      dataIndex: "planName",
      key: "planName",
      width: "20%",
      sorter: (a, b) => a.planName.localeCompare(b.planName),
    },
    {
      title: (
        <>
          <DollarCircleOutlined className="mr-1 text-green-500" /> Price ($)
        </>
      ),
      dataIndex: "price",
      key: "price",
      width: "10%",
      sorter: (a, b) => parseInt(a.price) - parseInt(b.price),
      render: (price) => parseInt(price, 10),
    },
    {
      title: (
        <>
          <CalendarOutlined className="mr-1 text-yellow-500" /> Date
        </>
      ),
      dataIndex: "date",
      key: "date",
      width: "15%",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
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
            onClick={(event) => {
              event.stopPropagation();
              showEditPlanModal(record);
            }}
            className="ant-btn-edit"
          >
            <EditOutlined className="text-yellow-500" />
          </Button>
          <Button
            type="link"
            danger
            onClick={(event) => {
              event.stopPropagation();
              showDeleteConfirm(record.planId, "plan");
            }}
            className="ant-btn-delete"
          >
            <DeleteOutlined className="text-red-500" />
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Premium Plans</h2>
          <div className="flex items-center justify-between">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showCreatePlanModal()}
              className="bg-blue-500 hover:bg-blue-600 border-none text-white"
            >
              Add Plan
            </Button>
            <Search
              placeholder="Search by workspace name..."
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              className="max-w-sm"
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="planId"
          pagination={{ pageSize: 7 }}
        />
      </div>
    </motion.div>
  );
}
