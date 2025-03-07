import { useState } from "react";
import { Avatar, Button, Dropdown, Menu } from "antd";
import { CheckOutlined, MoreOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export function NotificationItem({
  avatar,
  name,
  content,
  time,
  isRead = false,
  onMarkAsRead = () => {},
  onMarkAsUnread = () => {},
  onDelete = () => {},
  onReport = () => {},
}) {
  const [read, setRead] = useState(isRead);

  const handleMarkAsUnread = () => {
    setRead(false);
    onMarkAsUnread();
  };

  const handleMarkAsRead = () => {
    setRead(true);
    onMarkAsRead();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleMarkAsUnread} icon={<CheckOutlined />}>
        {read ? "Đánh dấu là chưa đọc" : "Đã đánh dấu là chưa đọc"}
      </Menu.Item>
      <Menu.Item key="2" onClick={onDelete} icon={<DeleteOutlined />}>
        Xóa thông báo này
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={onReport} icon={<ExclamationCircleOutlined />}>
        Báo cáo sự cố cho Đội ngũ phụ trách Thông báo
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className={`relative flex items-start gap-2 p-3 hover:bg-gray-50 rounded-md ${!read ? "bg-blue-50" : "bg-white"}`}
      onClick={handleMarkAsRead}
      style={{ cursor: "pointer" }}
    >
      {!read && <div className="absolute right-10 top-4 w-2 h-2 rounded-full bg-blue-500"></div>}
      <Avatar className="h-10 w-10 flex-shrink-0" src={avatar} alt={name} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-black">
          <span className="font-semibold">{name}</span> {content}
        </p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button icon={<MoreOutlined />} shape="circle" />
      </Dropdown>
    </div>
  );
}