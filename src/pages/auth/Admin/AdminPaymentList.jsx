import { useEffect, useState } from "react";
import { Table, Input, Button, Space, message } from "antd";
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
import axios from "axios";
import { API_ROOT } from "../../../utils/constants";
const { Search } = Input;

export default function PremiumPlan() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(data);


  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.fullName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchPremiumPlans = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/api/payment/getAllPayment`);
        if (!response || !response.data) throw new Error("Failed to fetch plans");
  
        // Ensure response.data.data is an array before mapping
        // const payments = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        const payments = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
  
        const res = payments.map((payment) => ({
          orderCode: payment.order_code,
          workspaceName: payment.workspace_name,
          owner : payment.fullName,
          planName: payment.planName,
          price: payment.price,
          date : payment.created_at
        }));
  
        console.log(res);
  
        setFilteredData(res);
      } catch (error) {
        message.error("Error fetching premium plans");
        console.error("Fetch error:", error);
      }
    };
  
    fetchPremiumPlans();
  }, []);

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
          <DollarCircleOutlined className="mr-1 text-green-500" /> Price (VNĐ)
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
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ["ascend", "descend"],
      render: (date) =>
        date ? new Date(date).toISOString().split("T")[0] : "N/A",
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
          <h2 className="text-2xl font-bold mb-2">Payment History</h2>
          <div className="flex items-end justify-end">
            <Search
              placeholder="Search by workspace name..."
              allowClear
              onChange={(e) => handleSearch(e.target.value)}
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
