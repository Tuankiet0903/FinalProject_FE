import { useEffect, useState } from "react";
import { Table, Input, Button, Space, message } from "antd";
import { motion } from "framer-motion";
import {
  DeleteOutlined,
  EditOutlined,
  DollarCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  TagOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";

import {
  showDeleteConfirm,
  showEditPlanModal,
  showPremiumModal, // Fixed typo (was "showPremiunModal")
  showDeleteAllConfirm,
  showCreatePlanModal,
} from "../../../components/admin/AdminModal";
import config from "../../../config/Config";

const { Search } = Input;

export default function PremiumPlan() {
  const API_URL = config.API_URL;
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchPremiumPlans = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/getAllPremiumPlan`);
        if (!response.ok) throw new Error("Failed to fetch plans");
        const plans = await response.json();
        const sortedData = plans.sort((a, b) => a.planId - b.planId);
        setData(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        message.error("Error fetching premium plans");
        console.error("Fetch error:", error);
      }
    };

    fetchPremiumPlans();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/admin/plans/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete request failed");

      const newData = data.filter((item) => item.planId !== id);
      setData(newData);
      setFilteredData(newData);
      message.success("Plan deleted successfully!");
    } catch (error) {
      message.error("Failed to delete plan!");
      console.error("Delete error:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/plans/delete-multiple`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedRowKeys }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete plans");
      }

      const newData = data.filter(
        (item) => !selectedRowKeys.includes(item.planId)
      );
      setData(newData);
      setFilteredData(newData);
      setSelectedRowKeys([]);
      message.success("Selected plans deleted successfully!");
    } catch (error) {
      message.error("Failed to delete selected plans!");
      console.error("Delete error:", error);
    }
  };

  const handleUpdate = async (updatedPlan) => {
    try {

      console.log(updatedPlan);
      
      const response = await fetch(`${API_URL}/admin/plans/${updatedPlan.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedPlan.planId,
          description: updatedPlan.description,
          price: updatedPlan.price,
          isPopular: updatedPlan.isPopular,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      // Update the specific user in state, instead of removing them
      setFilteredData((prevData) =>
        prevData.map((plan) =>
          plan.planId === updatedPlan.planId
            ? { ...plan, description: updatedPlan.description, price: updatedPlan.price, isPopular: updatedPlan.isPopular }
            : plan
        )
      );
    } catch (error) {
      console.error("Error updating plan:", error);
      message.error("An error occurred while updating the plan.");
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.planName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleCreate = async (planData) => {
    try {
      const response = await fetch(`${API_URL}/admin/plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planData),
      });

      if (response.ok) {
        setFilteredData((prevData) => [...prevData, planData]);
        message.success("Plan created successfully!");
      } else {
        message.error("Failed to create plan. Please try again.");
      }
    } catch (error) {
      message.error(
        "An error occurred while creating the plan.",
        error.message
      );
    }
  };

  const columns = [
    {
      title: (
        <>
          <TagOutlined className="mr-1 text-blue-500" /> Plan Name
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
          <CalendarOutlined className="mr-1 text-orange-500" /> Duration (Days)
        </>
      ),
      dataIndex: "duration",
      key: "duration",
      width: "10%",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: (
        <>
          <FileTextOutlined className="mr-1 text-purple-500" /> Description
        </>
      ),
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: (
        <div className="">
          <StarFilled className="mr-1 text-purple-500"/>
          <span className="text-base font-semibold">Popularity</span>
          <span className="text-xs text-gray-500">(Featured Plan)</span>
        </div>
      ),
      dataIndex: "isPopular",
      key: "isPopular",
      width: "15%",
      align: "center",
      render: (isPopular) =>
        isPopular ? (
          <span className="text-yellow-500 font-semibold flex items-center gap-1">
            <StarFilled className="text-yellow-500" />
            Popular
          </span>
        ) : (
          <span className="text-gray-500 flex items-center gap-1">
            <StarOutlined className="text-gray-400" />
            Normal
          </span>
        ),
    },
    {
      title: (
        <>
          <InfoCircleOutlined className="mr-1 text-yellow-500" /> Action
        </>
      ),
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={(event) => {
              event.stopPropagation();
              showEditPlanModal(record, handleUpdate);
            }}
            className="ant-btn-edit group border border-yellow-500 rounded-[6px] px-4 transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:border-yellow-600"
          >
            <EditOutlined className="text-yellow-500 group-hover:text-white" />
          </Button>
          <Button
            type="link"
            danger
            onClick={(event) => {
              event.stopPropagation();
              showDeleteConfirm(record.planId, "plan", handleDelete);
            }}
            className="group border border-red-500 rounded-[6px] px-4 transition-all duration-300 hover:bg-red-500 hover:text-white hover:border-red-600"
          >
            <DeleteOutlined className="text-red-500 group-hover:text-white" />
          </Button>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center pt-4"
    >
      <div className="w-full max-w-[95rem] space-y-4 bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Premium Plans</h2>{" "}
          {/* Thêm khoảng cách dưới */}
          <div className="flex items-center justify-between">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showCreatePlanModal(handleCreate)} // Gọi modal thêm kế hoạch mới
              className="bg-blue-500 hover:bg-blue-600 border-none text-white flex items-center gap-2"
            >
              Add Plan
            </Button>
            <Search
              placeholder="Search by plan name..."
              allowClear
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
              className="max-w-sm"
            />
          </div>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          rowKey="planId"
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
          onChange={() => setSelectedRowKeys([])}
          className="shadow-sm"
          onRow={(record) => ({
            onClick: () => showPremiumModal(record),
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
              {selectedRowKeys.length === 1 ? "plan" : "plans"} selected
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setSelectedRowKeys([])}
                className="px-3 py-1 border border-gray-500 text-gray-700 hover:bg-gray-200 transition rounded-[6px]"
              >
                Clear Selection
              </button>
              <button
                onClick={() => showDeleteAllConfirm("plan", handleDeleteAll)}
                className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-[6px]"
              >
                Delete Selected Plans
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
