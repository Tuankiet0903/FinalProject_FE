import { Search, MessageSquare, Clipboard, Monitor, Clock, Grid, ChevronDown, Plus, AlertCircle, RefreshCcw } from "lucide-react";
import { Dropdown } from "antd";
import UserDropdownMenu from "./UserDropdownMenu";
import NotificationModal from "../notifications/NotificationModal";
import logo from "../../assets/logo-clickup.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const iconClass = "w-5 h-5 text-white hover:text-gray-300 transition";
  const buttonClass = "p-2 bg-[#372C81] hover:bg-white/10 rounded-lg transition";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data cho notifications
  const mockNotifications = [
    {
      notificationId: 1,
      taskId: 101,
      workspaceId: 1,
      userId: 1,
      content: "Bạn được giao task 'Frontend Development'",
      createdAt: "2024-03-01T08:00:00.000Z",
      updatedAt: "2024-03-01T08:00:00.000Z"
    },
    {
      notificationId: 2,
      taskId: 102,
      workspaceId: 1,
      userId: 1,
      content: "Tú Nguyễn Văn đã bình luận trong task 'Backend Integration'",
      createdAt: "2024-03-01T09:30:00.000Z",
      updatedAt: "2024-03-01T09:30:00.000Z"
    },
    {
      notificationId: 3,
      taskId: null,
      workspaceId: 1,
      userId: 1,
      content: "Bạn đã được thêm vào workspace 'PTM-2025'",
      createdAt: "2024-03-01T10:15:00.000Z",
      updatedAt: "2024-03-01T10:15:00.000Z"
    },
    {
      notificationId: 4,
      taskId: 103,
      workspaceId: null,
      userId: 1,
      content: "Task 'UI Design' sẽ hết hạn vào ngày mai",
      createdAt: "2024-03-01T11:00:00.000Z",
      updatedAt: "2024-03-01T11:00:00.000Z"
    },
    {
      notificationId: 5,
      taskId: null,
      workspaceId: null,
      userId: 1,
      content: "Chào mừng bạn đến với hệ thống PTM-2025",
      createdAt: "2024-03-01T12:00:00.000Z",
      updatedAt: "2024-03-01T12:00:00.000Z"
    }
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        console.log("📡 Fetching user profile...");

        // ✅ Lấy token từ localStorage trước
        let token = localStorage.getItem("token");

        // ✅ Nếu không có token trong localStorage, thử lấy từ cookies
        if (!token) {
          console.log("🔍 Không tìm thấy token trong localStorage, thử lấy từ cookies...");
          const cookieResponse = await axios.get("http://localhost:5000/auth/google/success", {
            withCredentials: true, // ✅ Quan trọng: Gửi cookies khi gọi API
          });

          if (cookieResponse.data?.token) {
            token = cookieResponse.data.token;
            localStorage.setItem("token", token); // ✅ Lưu vào localStorage để dùng lại sau
            console.log("✅ Token lấy từ cookies:", token);
          } else {
            throw new Error("No token found in cookies.");
          }
        }

        // ✅ Gọi API lấy thông tin user
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
          withCredentials: true, // ✅ Gửi cookies kèm request
        });

        console.log("✅ API Response Data:", response.data);
        if (!response.data || !response.data.userId) {
          throw new Error("Invalid user data");
        }

        setUser(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch user profile", error.response?.data || error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // ✅ Lấy họ từ fullName (Chỉ lấy từ đầu tiên)
  const getFirstName = (fullName) => fullName?.split(" ")[0] || "Guest";

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#372C81] shadow-md w-full">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <button className={buttonClass}>
          <img src={logo} alt="Logo" className="w-7 h-7" />
        </button>
      </div>
      
      {/* Search Section */}
      <div className="flex-grow flex justify-center">
        <div className="relative w-2/3 ml-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-white/10 text-white placeholder-white/50 pl-12 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30" 
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-3">
        {/* AI Button */}
        <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 gap-3">
          <AlertCircle className={iconClass} />
          <span className="text-white text-sm">AI</span>
        </div>

        {/* Upgrade Button */}
        <button className="px-5 py-2 bg-[#FF29C0] hover:bg-[#E020A0] text-white rounded-lg text-sm transition">
          Upgrade
        </button>

        {/* New Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-[#372C81] text-white rounded-lg text-sm transition">
          <Plus className={iconClass} />
          New
        </button>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          {[MessageSquare, Clipboard, Monitor, Clock, Grid].map((Icon, i) => (
            <button key={i} className={buttonClass}>
              <Icon className={iconClass} />
            </button>
          ))}
          <NotificationModal notifications={mockNotifications} />
        </div>

        {/* Refresh Button */}
        <button className={buttonClass}>
          <RefreshCcw className={iconClass} />
        </button>
        <Dropdown overlay={<UserDropdownMenu user={user} />} trigger={["click"]} placement="bottomRight" arrow>
          <button className="flex items-center gap-2 p-1 bg-[#372C81] hover:bg-white/10 rounded-md transition ml-1">
            {loading ? (
              <span className="text-white text-sm font-semibold">Loading...</span>
            ) : (
              <>
                <img src={user?.avatar ? user.avatar : "/placeholder.svg"}
                  alt="User Avatar"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-md" />
                <span className="text-white text-sm font-semibold">{loading ? "Loading..." : getFirstName(user?.fullName)}</span>
                <ChevronDown className={iconClass} />
              </>
            )}

          </button>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
