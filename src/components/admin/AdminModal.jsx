import {
  Modal,
  message,
  Form,
  Space,
  Avatar,
  Typography,
  Select,
  Table,
} from "antd";

export const showDeleteConfirm = (userId, onDelete) => {
  Modal.confirm({
    title: "Are you sure you want to delete this user?",
    content: "This action cannot be undone.",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      onDelete(userId);
    },
  });
};

export const showDeleteAllConfirm = (onDeleteAll) => {
  Modal.confirm({
    title: "Are you sure you want to delete all selected users?",
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
        <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar size={64} style={{ backgroundColor: "#87d068" }}>
            {workspace.name.charAt(0)}
          </Avatar>
          <div>
            <Typography.Title level={5}>{workspace.name}</Typography.Title>
            <Typography.Text type="secondary">Owner: {workspace.owner}</Typography.Text>
            <br />
            <Typography.Text type="secondary">Total member: {workspace.members}</Typography.Text>
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