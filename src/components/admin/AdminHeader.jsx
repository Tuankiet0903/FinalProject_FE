import { Avatar, Dropdown } from "antd";
import {
  CrownOutlined,
  HomeOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  PayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function AdminHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false); // State to handle dropdown visibility

  const adminDropDown = (
    <div className="bg-white rounded-xl shadow-lg p-2 w-44 border border-gray-200">
      <Link
        to="/admin/profile"
        className="flex items-center px-3 py-2 space-x-2 rounded-xl hover:bg-gray-200 transition"
      >
        <UserOutlined className="text-lg text-gray-600" />
        <span className="text-sm text-gray-700">Profile</span>
      </Link>
      <button
        onClick={() => console.log("Logging out...")}
        className="flex items-center w-full px-3 py-2 space-x-2 rounded-xl hover:bg-red-100 transition text-red-500 mt-1 bg-white"
      >
        <LogoutOutlined className="text-lg" />
        <span className="text-sm">Logout</span>
      </button>
    </div>
  );

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: <HomeOutlined /> },
    // { name: "Chart", href: "/admin/chart", icon: <BarChartOutlined /> },
    {
      name: "Workspace List",
      href: "/admin/workspaces",
      icon: <OrderedListOutlined />,
    },
    { name: "Users", href: "/admin/users", icon: <UserOutlined /> },
    { name: "Premium", href: "/admin/premium", icon: <CrownOutlined /> },
    { name: "Payment List", href: "/admin/payments", icon: <PayCircleOutlined/> },
  ];

  return (
    <header className="sticky top-0 left-0 w-screen bg-white shadow-md z-50">
      {/* Top section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="rounded bg-blue-500 p-1"></div>
              <span className="text-xl font-semibold">PTM</span>
            </Link>

            {/* Avatar Dropdown */}
            <Dropdown
              overlay={adminDropDown}
              trigger={["click"]}
              onOpenChange={setOpen}
              open={open}
            >
              <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition text-black">
                <Avatar
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ddQtbiYuOiGTgNdyDd7mMOlBuzS7dJ.png"
                  className="border-2 border-gray-300 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Jane Pearson</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 bg-white">
        <nav className="flex h-12 justify-center space-x-6">
          {navigation.map((item) => (
            <Link
              to={item.href}
              key={item.name}
              className={`flex items-center space-x-2 px-4 text-sm font-medium transition-colors hover:text-blue-500 
                ${
                  location.pathname === item.href
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
