import {
  Modal,
  message,
  Form,
  Space,
  Avatar,
  Typography,
  Select,
  Table,
  Input,
  InputNumber,
  Switch,
} from "antd";
import { InfoCircleOutlined, StarFilled, StarOutlined } from "@ant-design/icons";

export const showDeleteConfirm = (id, name, onDelete) => {
  Modal.confirm({
    title: `Are you sure you want to delete this ${name}?`,
    content: "This action cannot be undone.",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      onDelete(id);
    },
  });
};

export const showDeleteAllConfirm = (name, onDeleteAll) => {
  Modal.confirm({
    title: `Are you sure you want to delete all selected ${name}s?`,
    content: "This action cannot be undone.",
    okText: "Delete All",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      onDeleteAll();
    },
  });
};

export const showEditModal = (user, onUpdate) => {
  let form;

  Modal.confirm({
    title: "Edit User Status",
    content: (
      <>
        {/* Hiển thị thông tin user */}
        <Space direction="vertical" className="w-full">
          <Space>
            <Avatar size={50} src={user.avatar} />
            <div>
              <Typography.Text strong>{user.fullName}</Typography.Text>
              <br />
              <Typography.Text type="secondary">{user.email}</Typography.Text>
              <br />
              <Typography.Text type="secondary">
                {user.dateOfBirth}
              </Typography.Text>
            </div>
          </Space>

          {/* Form cập nhật trạng thái Block */}
          <Form
            layout="vertical"
            initialValues={{ isBlocked: user.isBlocked }}
            ref={(instance) => (form = instance)}
          >
            <Form.Item name="isBlocked" label="Blocked Status">
              <Select>
                <Select.Option value={true}>Blocked</Select.Option>
                <Select.Option value={false}>Unblocked</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Space>
      </>
    ),
    okText: "Save",
    cancelText: "Cancel",
    onOk() {
      form?.validateFields().then((values) => {
        const updatedUser = { ...user, isBlocked: values.isBlocked };

        // Gọi hàm cập nhật dataTable từ parent component
        onUpdate(updatedUser);

        message.success("User status updated successfully!");
      });
    },
  });
};

export const showWorkspaceDetailModal = (workspace) => {
  Modal.info({
    title: "Workspace Details",
    content: (
      <>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Avatar size={64} style={{ backgroundColor: "#87d068" }}>
            {workspace.name.charAt(0)}
          </Avatar>
          <div>
            <Typography.Title level={5}>{workspace.name}</Typography.Title>
            <Typography.Text type="secondary">
              Owner: {workspace.owner}
            </Typography.Text>
            <br />
            <Typography.Text type="secondary">
              Total member: {workspace.members}
            </Typography.Text>
          </div>
        </div>

        {/* Table danh sách user trong workspace */}
        <Table
          columns={[
            { title: "Full Name", dataIndex: "fullName", key: "fullName" },
            { title: "Email", dataIndex: "email", key: "email" },
            { title: "Role", dataIndex: "role", key: "role" },
          ]}
          dataSource={workspace.users}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </>
    ),
    width: 600,
    okText: "Close",
  });
};

export const showPremiumModal = (plan) => {
  console.log(plan);
  
  Modal.info({
    title: "Premium Plan Details",
    content: (
      <>
        <div style={{ marginBottom: "16px" }}>
          <Typography.Title level={5}>{plan.planName}</Typography.Title>
          <Typography.Text type="secondary">
            <strong>Price:</strong> ${plan.price}
          </Typography.Text>
          <br />
          <Typography.Text type="secondary">
            <strong>Duration:</strong> {plan.duration} days
          </Typography.Text>
          <br />
          <Typography.Text type="secondary"> 
            <strong>Popularity:</strong> {plan.isPopular ? <><StarFilled className="text-yellow-500" />
              Popular</> : <><StarOutlined className="text-gray-400" />
              Normal</>}
          </Typography.Text>
          <br />
          <Typography.Text type="secondary">
            <strong>Description:</strong> {plan.description}
          </Typography.Text>
        </div>
      </>
    ),
    width: 500,
    okText: "Close",
  });
};

export const showEditPlanModal = (plan, onUpdate) => {
  let form;

  Modal.confirm({
    title: "Edit Plan Information",
    content: (
      <Space direction="vertical" className="w-full">
        {/* Display Plan Details */}
        <div className="flex gap-2 items-center">
          <Typography.Text strong>Plan Name:</Typography.Text>
          <Typography.Text>{plan.planName}</Typography.Text>
        </div>

        {/* Form for editing plan details */}
        <Form
          layout="vertical"
          initialValues={{ description: plan.description, price: plan.price, isPopular: plan.isPopular }}
          ref={(instance) => (form = instance)}
        >
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Price is required" }]} // Ensures price is mandatory
          >
            <InputNumber
              min={0} // Prevents negative values
              step={1} // Allows only whole numbers
              style={{ width: "100%" }}
              parser={(value) => value.replace(/\D/g, "")} // Ensures only digits are entered
              placeholder="Enter plan price"
            />
          </Form.Item>

          {/* New "Is Popular" Field */}
          <Form.Item
            name="isPopular"
            label="Popularity Check"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter plan description" rows={3} />
          </Form.Item>

          {/* Highlighted Notice Section */}
          <div
            style={{
              backgroundColor: "#FFFBE6",
              border: "1px solid #FFD666",
              padding: "8px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <InfoCircleOutlined style={{ color: "#FAAD14" }} />
            <Typography.Text type="warning">
              Note: Separate descriptions with a comma (",")
            </Typography.Text>
          </div>
        </Form>
      </Space>
    ),
    okText: "Save",
    cancelText: "Cancel",
    onOk() {
      form?.validateFields().then((values) => {
        const updatedPlan = {
          ...plan,
          description: values.description,
          price: values.price,
          isPopular: values.isPopular,
        };

        // Call update function from parent component
        onUpdate(updatedPlan);

        message.success("Plan information updated successfully!");
      });
    },
  });
};

export const showCreatePlanModal = (onSave) => {
  let form;

  Modal.confirm({
    title: "Create Plan",
    content: (
      <Form
        ref={(instance) => (form = instance)}
        layout="vertical"
        initialValues={{
          planName: "",
          price: 0,
          duration: 0,
          description: "",
          isPopular: false, // Default value
        }}
      >
        <Form.Item
          name="planName"
          label="Plan Name"
          rules={[{ required: true, message: "Please enter plan name!" }]}
        >
          <Input placeholder="Enter plan name" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price ($)"
          rules={[{ required: true, message: "Please enter price!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration (Days)"
          rules={[{ required: true, message: "Please enter duration!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        {/* New "Is Popular" Field */}
        <Form.Item
          name="isPopular"
          label="Popularity Check"
          valuePropName="checked"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description!" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>

        {/* Highlighted Notice Section */}
        <div
          style={{
            backgroundColor: "#FFFBE6",
            border: "1px solid #FFD666",
            padding: "8px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <InfoCircleOutlined style={{ color: "#FAAD14" }} />
          <Typography.Text type="warning">
            Note: Separate descriptions with a comma (",")
          </Typography.Text>
        </div>
      </Form>
    ),
    okText: "Create",
    cancelText: "Cancel",

    onOk: async () => {
      try {
        const values = await form.validateFields();
        await onSave(values);
      } catch (error) {
        console.log(error.message);
        message.error("Please fill in all required fields!");
      }
    },
    onCancel() {},
  });
};
