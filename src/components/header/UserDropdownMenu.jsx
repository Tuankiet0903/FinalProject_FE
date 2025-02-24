import {
    User,
    Bell,
    Palette,
    Settings,
    Keyboard,
    Download,
    Users,
    HelpCircle,
    Trash2,
    LogOut,
    Volume2,
    Clock,
} from "lucide-react";
import { Avatar, Menu, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDropdownMenu = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("⚠️ No token found!");
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data)); // Lưu user vào localStorage
            } catch (error) {
                console.error("❌ Failed to fetch user profile", error);
                if (error.response && error.response.status === 401) {
                    handleLogout();
                }
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/auth/logout"); // Gửi yêu cầu logout
        } catch (error) {
            console.error("❌ Failed to logout", error);
        }

        // Xóa token và user khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        message.success("Logged out successfully!");
        navigate("/login"); // Chuyển về trang đăng nhập
    };

    return (
        <Menu className="w-80">
            <Menu.Item key="user">
                <div className="flex items-center gap-3 relative">
                    <div className="relative">
                        <Avatar size={40} src={user?.avatar || "/placeholder.svg"} />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">{user?.fullName || "Guest"}</span>
                        <span className="text-xs text-green-500">Online</span>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="status" icon={<Clock className="mr-2 h-4 w-4" />}>Set status</Menu.Item>
            <Menu.Item key="mute" icon={<Volume2 className="mr-2 h-4 w-4" />}>Mute notifications</Menu.Item>
            <Menu.Item key="profile" icon={<User className="mr-2 h-4 w-4" />}>Profile</Menu.Item>
            <Menu.Item key="themes" icon={<Palette className="mr-2 h-4 w-4" />}>Themes</Menu.Item>
            <Menu.Item key="settings" icon={<Settings className="mr-2 h-4 w-4" />}>Settings</Menu.Item>
            <Menu.Item key="notifications" icon={<Bell className="mr-2 h-4 w-4" />}>Notification settings</Menu.Item>
            <Menu.Item key="shortcuts" icon={<Keyboard className="mr-2 h-4 w-4" />}>Keyboard shortcuts</Menu.Item>
            <Menu.Item key="download" icon={<Download className="mr-2 h-4 w-4" />}>Download apps</Menu.Item>
            <Menu.Item key="referrals" icon={<Users className="mr-2 h-4 w-4" />}>Referrals</Menu.Item>
            <Menu.Item key="help" icon={<HelpCircle className="mr-2 h-4 w-4" />}>Help</Menu.Item>
            <Menu.Item key="trash" icon={<Trash2 className="mr-2 h-4 w-4" />}>Trash</Menu.Item>
            <Menu.Item key="logout" icon={<LogOut className="mr-2 h-4 w-4 text-red-600" />} onClick={handleLogout} className="text-red-600">
                Log out
            </Menu.Item>
        </Menu>
    );
};

export default UserDropdownMenu;
