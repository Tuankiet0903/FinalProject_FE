import { Search, MessageSquare, Clipboard, Monitor, Clock, Grid, Languages, ChevronDown, Plus, AlertCircle, RefreshCcw } from "lucide-react";
import { Dropdown } from "antd";
import UserDropdownMenu from "./UserDropdownMenu";
import logo from "../../assets/logo-clickup.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const iconClass = "w-5 h-5 text-white hover:text-gray-300 transition";
  const buttonClass = "p-2 bg-[#372C81] hover:bg-white/10 rounded-lg transition";
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#372C81] shadow-md w-full">
      <div className="flex items-center gap-3">
        <button className={buttonClass}>
          <img src={logo} alt="Logo" className="w-7 h-7" />
        </button>
      </div>
      <div className="flex-grow flex justify-center">
        <div className="relative w-2/3 ml-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
          <input type="text" placeholder="Search..." className="w-full bg-white/10 text-white placeholder-white/50 pl-12 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30" />
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 gap-3">
          <AlertCircle className={iconClass} />
          <span className="text-white text-sm">AI</span>
        </div>
        <button className="px-5 py-2 bg-[#FF29C0] hover:bg-[#E020A0] text-white rounded-lg text-sm transition">Upgrade</button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#372C81] text-white rounded-lg text-sm transition">
          <Plus className={iconClass} />
          New
        </button>
        <div className="flex items-center gap-3">
          {[MessageSquare, Clipboard, Monitor, Clock, Grid, Languages].map((Icon, i) => (
            <button key={i} className={buttonClass}>
              <Icon className={iconClass} />
            </button>
          ))}
        </div>
        <button className={buttonClass}>
          <RefreshCcw className={iconClass} />
        </button>
        <Dropdown overlay={<UserDropdownMenu user={user} />} trigger={["click"]} placement="bottomRight" arrow>
          <button className="flex items-center gap-2 p-1 bg-[#372C81] hover:bg-white/10 rounded-md transition ml-1">
            <img src={user?.avatar ? user.avatar : "/placeholder.svg"} 
                 alt="User Avatar" 
                 className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-md" />
            <span className="text-white text-sm font-semibold">{user?.fullName || "Guest"}</span>
            <ChevronDown className={iconClass} />
          </button>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
