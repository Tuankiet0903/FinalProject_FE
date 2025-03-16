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
import {
  createPlan,
  deleteMultiplePlans,
  deletePlanById,
  fetchPremiumPlansAPI,
  updatePlanById,
} from "../../../api/Admin";

const { Search } = Input;

export default function PremiumPlan() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchPremiumPlans = async () => {
      try {
        const response = await fetchPremiumPlansAPI();
        if (!response) throw new Error("Failed to fetch plans");
        const plans = response;
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
      const response = await deletePlanById(id);
      if (!response) throw new Error("Delete request failed");

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
    if (selectedRowKeys.length === 0) {
      message.warning("No plans selected for deletion.");
      return;
    }

    const newData = data.filter(
      (item) => !selectedRowKeys.includes(item.planId)
    );

    // Optimistically update UI
    setData(newData);
    setFilteredData(newData);
    setSelectedRowKeys([]);

    try {
      const response = await deleteMultiplePlans(selectedRowKeys);
      if (!response.success) {
        throw new Error(response.message || "Deletion failed");
      }
      message.success("Selected plans deleted successfully!");
    } catch (error) {
      message.error("Failed to delete selected plans!");
      console.error("Delete error:", error);
      // Rollback in case of failure
      setData(data);
      setFilteredData(data);
    }
  };

  const handleUpdate = async (updatedPlan) => {
    try {
      const responseData = await updatePlanById(updatedPlan);
  
      if (!responseData.success) {
        throw new Error(responseData.message || "Failed to update plan");
      }
  
      // Cập nhật dữ liệu trong state
      setFilteredData((prevData) =>
        prevData.map((plan) =>
          plan.planId === updatedPlan.planId ? { ...plan, ...updatedPlan } : plan
        )
      );
  
      message.success("Plan updated successfully!");
    } catch (error) {
      console.error("Error updating plan:", error);
      message.error(error || "An error occurred while updating the plan.");
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
      const responseData = await createPlan(planData);
  
      // Thêm plan mới vào state nếu tạo thành công
      setFilteredData((prevData) => [...prevData, responseData]);
  
      message.success("Plan created successfully!");
    } catch (error) {
      console.error("Error creating plan:", error);
      message.error(error || "An error occurred while creating the plan.");
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
          <StarFilled className="mr-1 text-purple-500" />
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
