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
import { Avatar, Menu, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDropdownMenu = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [loading, setLoading] = useState(!user);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found. Please login again.");
            }

            const response = await axios.get("http://localhost:5000/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,  // Gửi token trong header
                },
                withCredentials: true, // ✅ Bắt buộc để gửi cookies
            });

            if (!response.data || !response.data.userId) {
                throw new Error("Invalid user data");
            }

            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            console.error("❌ Failed to fetch user profile", error.response?.data || error.message);
            if (error.response?.status === 401) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/auth/logout", {
                withCredentials: true, // ✅ Gửi request logout kèm cookies
            });
            localStorage.removeItem("token");
        } catch (error) {
            console.error("❌ Failed to logout", error);
        }

        // Xóa user khỏi localStorage
        localStorage.removeItem("user");

        message.success("Logged out successfully!");
        navigate("/login"); // Chuyển về trang đăng nhập
    };

    const handleSetting = () => {
        navigate("/setting")
    }

    const handleSettingProfile = () => {
        navigate("/setting/profile")
    }

    const avatarUrl = user?.avatar && user.avatar !== "null" ? user.avatar : "/placeholder.svg";

    return (
        <Menu className="w-80">
            <Menu.Item key="user">
                <div className="flex items-center gap-3 relative">
                    <div className="relative">
                        {loading ? (
                            <Spin size="small" />
                        ) : (
                            <Avatar size={40} src={avatarUrl} />
                        )}
                        {!loading && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">
                            {loading ? "Loading..." : user?.fullName || "Guest"}
                        </span>
                        {!loading && <span className="text-xs text-green-500">Online</span>}
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="status" icon={<Clock className="mr-2 h-4 w-4" />}>Set status</Menu.Item>
            <Menu.Item key="mute" icon={<Volume2 className="mr-2 h-4 w-4" />}>Mute notifications</Menu.Item>
            <Menu.Item key="profile" icon={<User className="mr-2 h-4 w-4" />} onClick={handleSettingProfile} >Profile</Menu.Item>
            <Menu.Item key="themes" icon={<Palette className="mr-2 h-4 w-4" />}>Themes</Menu.Item>
            <Menu.Item key="settings" icon={<Settings className="mr-2 h-4 w-4" />} onClick={handleSetting}>Settings</Menu.Item>
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
