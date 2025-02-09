import { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLock, FaLink } from "react-icons/fa";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    name: "Tin Huynh",
    email: "tinhuynh211@gmail.com",
    phone: "0945199743",
    dob: "2003-11-02",
    gender: "male",
    country: "Vietnam",
    level: "N5",
    address: "Đà Nẵng - Việt Nam",
  });

  return (
    <div className="h-screen flex flex-col p-6">
      {/* Header Section */}
      <div className="bg-gray-900 text-white p-6 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full border-2 border-white" />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">Thông tin tài khoản</h2>
            <p className="text-gray-200">Bạn có thể chỉnh sửa thông tin cá nhân tại đây</p>
          </div>
        </div>
        <img src="/profile-banner.png" alt="Profile Banner" className="h-24" />
      </div>
      
      {/* Navigation Tabs Inside the Box */}
      <div className="bg-gray-900 text-white rounded-lg mt-4 p-6 flex-grow">
        <div className="flex space-x-8 text-white border-b border-gray-900 pb-2">
          {[
            { id: "profile", label: "Thông tin cá nhân" },
            { id: "password", label: "Thay đổi mật khẩu" },
            { id: "linked", label: "Liên kết tài khoản" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-2 text-lg font-medium transition-all duration-300 hover:text-gray-300 ${
                activeTab === tab.id
                  ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-400"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[
              "Tên học viên",
              "Email",
              "Ngày sinh",
              "Số điện thoại",
              "Giới tính",
              "Quốc gia",
              "Cấp độ",
              "Địa chỉ cụ thể",
            ].map((label, index) => (
              <div key={index}>
                <label className="block text-white mb-1">{label}</label>
                <input type="text" className="bg-gray-800 border-gray-700 w-full p-2 rounded" />
              </div>
            ))}
          </div>
        )}

        {activeTab === "password" && (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {["Mật khẩu cũ", "Mật khẩu mới", "Nhập lại mật khẩu mới"].map((label, index) => (
              <div key={index}>
                <label className="block text-white mb-1">{label}</label>
                <div className="relative">
                  <input type="password" className="bg-gray-800 border-gray-700 w-full p-2 rounded pr-10" placeholder="Nhập mật khẩu tại đây" />
                  <FaLock className="absolute top-3 right-3 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "linked" && (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {["Google", "Facebook", "GitHub"].map((service, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                <span className="text-white">{service}</span>
                <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded text-white">Kết nối</button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white">Lưu thông tin</button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white">Yêu cầu xóa tài khoản</button>
        </div>
      </div>
    </div>
  );
}